"use server";

import crypto from "crypto";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/appwrite";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashOTP(otp: string): string {
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET!)
    .update(otp)
    .digest("hex");
}

function otpEmailHtml(firstName: string, otp: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Inter',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#FC5C3A 0%,#ff7958 100%);padding:32px 40px;">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Cosmico Bank</h1>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Secure verification</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;color:#374151;font-size:15px;">Hi ${firstName},</p>
            <p style="margin:0 0 32px;color:#6b7280;font-size:14px;line-height:1.6;">
              Use the code below to verify your identity. It expires in <strong>10 minutes</strong>.
            </p>
            <!-- OTP box -->
            <div style="background:#f8fafc;border:2px dashed #e5e7eb;border-radius:12px;padding:28px;text-align:center;margin-bottom:32px;">
              <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Verification code</p>
              <p style="margin:0;color:#111827;font-size:42px;font-weight:800;letter-spacing:12px;">${otp}</p>
            </div>
            <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
              If you didn't request this, you can safely ignore this email. Never share this code with anyone.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f1f5f9;">
            <p style="margin:0;color:#d1d5db;font-size:11px;text-align:center;">© ${new Date().getFullYear()} Cosmico Bank. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Store OTP state server-side in Appwrite user prefs (avoids cookie issues)
export const sendOTPAndStorePending = async ({
  userId,
  email,
  firstName,
  sessionSecret,
}: {
  userId: string;
  email: string;
  firstName: string;
  sessionSecret: string;
}) => {
  const otp = generateOTP();
  const otpHash = hashOTP(otp);
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  const { user } = await createAdminClient();
  await user.updatePrefs(userId, { otpHash, expires, sessionSecret, email, firstName });

  await resend.emails.send({
    from: "Cosmico Bank <onboarding@resend.dev>",
    to: email,
    subject: `${otp} is your Cosmico Bank verification code`,
    html: otpEmailHtml(firstName, otp),
  });
};

// Verify OTP — reads state from Appwrite prefs, not cookies
export const verifyOTP = async (otp: string, userId: string): Promise<{ success: boolean }> => {
  const { user } = await createAdminClient();
  const prefs = await user.getPrefs(userId);

  if (!prefs.otpHash || !prefs.expires) {
    throw new Error("No pending authentication. Please sign in again.");
  }

  if (Date.now() > (prefs.expires as number)) {
    await user.updatePrefs(userId, {});
    throw new Error("Verification code expired. Please sign in again.");
  }

  if (hashOTP(otp) !== prefs.otpHash) {
    throw new Error("Incorrect verification code. Please try again.");
  }

  const sessionSecret = prefs.sessionSecret as string;

  // Clear pending OTP state from prefs
  await user.updatePrefs(userId, {});

  // Set the real authenticated session cookie
  const isProduction = process.env.NODE_ENV === "production";
  cookies().set("appwrite-session", sessionSecret, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
  });

  return { success: true };
};

// Resend OTP — reads existing session info from prefs, generates a new code
export const resendOTP = async (userId: string): Promise<void> => {
  const { user } = await createAdminClient();
  const prefs = await user.getPrefs(userId);

  if (!prefs.sessionSecret) {
    throw new Error("No pending authentication. Please sign in again.");
  }

  const { sessionSecret, email, firstName } = prefs as {
    sessionSecret: string;
    email: string;
    firstName: string;
  };

  await sendOTPAndStorePending({ userId, email, firstName, sessionSecret });
};
