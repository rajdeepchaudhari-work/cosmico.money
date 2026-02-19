"use server";

import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/appwrite";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://cosmico.money";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashOTP(otp: string): string {
  return crypto
    .createHmac("sha256", process.env.OTP_SECRET!)
    .update(otp)
    .digest("hex");
}

const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        ${content}
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f1f5f9;background:#fafafa;">
            <p style="margin:0;color:#9ca3af;font-size:11px;text-align:center;line-height:1.6;">
              © ${new Date().getFullYear()} Cosmico Bank · <a href="${APP_URL}/privacy" style="color:#9ca3af;text-decoration:none;">Privacy Policy</a> · <a href="${APP_URL}/terms" style="color:#9ca3af;text-decoration:none;">Terms &amp; Conditions</a>
              <br>Cosmico Ltd, England &amp; Wales
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

function otpEmailHtml(firstName: string, otp: string): string {
  return emailWrapper(`
    <tr>
      <td style="background:linear-gradient(135deg,#FC5C3A 0%,#ff7958 100%);padding:32px 40px;">
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Cosmico Bank</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Secure verification</p>
      </td>
    </tr>
    <tr>
      <td style="padding:40px;">
        <p style="margin:0 0 8px;color:#374151;font-size:15px;">Hi ${firstName},</p>
        <p style="margin:0 0 32px;color:#6b7280;font-size:14px;line-height:1.6;">
          Use the code below to verify your identity. It expires in <strong>10 minutes</strong>.
        </p>
        <div style="background:#f8fafc;border:2px dashed #e5e7eb;border-radius:12px;padding:28px;text-align:center;margin-bottom:32px;">
          <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Verification code</p>
          <p style="margin:0;color:#111827;font-size:42px;font-weight:800;letter-spacing:12px;">${otp}</p>
        </div>
        <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
          If you didn't request this, you can safely ignore this email. Never share this code with anyone.
        </p>
      </td>
    </tr>`);
}

function welcomeEmailHtml(firstName: string): string {
  return emailWrapper(`
    <tr>
      <td style="background:linear-gradient(135deg,#FC5C3A 0%,#ff7958 100%);padding:40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.75);font-size:13px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;">Welcome to</p>
              <h1 style="margin:0;color:#fff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">Cosmico Bank</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Your account is verified and ready ✓</p>
            </td>
            <td align="right" style="font-size:48px;line-height:1;">🏦</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:40px 40px 28px;">
        <p style="margin:0 0 6px;color:#111827;font-size:17px;font-weight:600;">Hi ${firstName}, welcome aboard!</p>
        <p style="margin:0 0 28px;color:#6b7280;font-size:14px;line-height:1.7;">
          Your identity has been verified and your Cosmico Bank account is fully active. Here's everything you can do right now:
        </p>

        <!-- Feature rows -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td style="padding:12px 16px;background:#fff7f5;border-radius:10px;border-left:3px solid #FC5C3A;margin-bottom:10px;">
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">💳 &nbsp;Connect your bank accounts</p>
              <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Link existing accounts securely via Plaid — view balances and transactions in one place.</p>
            </td>
          </tr>
          <tr><td style="height:8px;"></td></tr>
          <tr>
            <td style="padding:12px 16px;background:#f0fdf4;border-radius:10px;border-left:3px solid #22c55e;">
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">📊 &nbsp;Track your spending</p>
              <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Real-time transaction history with smart categorisation across all your accounts.</p>
            </td>
          </tr>
          <tr><td style="height:8px;"></td></tr>
          <tr>
            <td style="padding:12px 16px;background:#eff6ff;border-radius:10px;border-left:3px solid #3b82f6;">
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">💸 &nbsp;Send money instantly</p>
              <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Transfer funds to other Cosmico users quickly and securely.</p>
            </td>
          </tr>
          <tr><td style="height:8px;"></td></tr>
          <tr>
            <td style="padding:12px 16px;background:#fefce8;border-radius:10px;border-left:3px solid #eab308;">
              <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">🏆 &nbsp;Earn rewards</p>
              <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Complete spending challenges to unlock exclusive rewards and badges.</p>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td align="center">
              <a href="${APP_URL}" style="display:inline-block;background:linear-gradient(135deg,#FC5C3A 0%,#ff7958 100%);color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:10px;letter-spacing:0.2px;">
                Go to your dashboard →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;border-top:1px solid #f1f5f9;padding-top:20px;">
          🔒 &nbsp;Your account is protected with two-factor authentication on every sign-in.<br>
          Questions? Reply to this email or visit <a href="${APP_URL}" style="color:#FC5C3A;text-decoration:none;">cosmico.money</a>
        </p>
      </td>
    </tr>`);
}

function signInAlertEmailHtml(firstName: string, details: {
  ip: string;
  device: string;
  browser: string;
  os: string;
  time: string;
}): string {
  return emailWrapper(`
    <tr>
      <td style="background:linear-gradient(135deg,#1e293b 0%,#334155 100%);padding:32px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">Cosmico Bank</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Security alert</p>
            </td>
            <td align="right" style="font-size:36px;line-height:1;">🔐</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:36px 40px 28px;">
        <p style="margin:0 0 6px;color:#111827;font-size:16px;font-weight:600;">New sign-in to your account</p>
        <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.7;">
          Hi ${firstName}, we detected a new sign-in to your Cosmico Bank account. Here are the details:
        </p>

        <!-- Details table -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;overflow:hidden;margin-bottom:24px;">
          <tr>
            <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:90px;">Time</td>
                  <td style="font-size:14px;color:#111827;font-weight:500;">${details.time}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:90px;">Device</td>
                  <td style="font-size:14px;color:#111827;font-weight:500;">${details.device}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 20px;border-bottom:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:90px;">Browser</td>
                  <td style="font-size:14px;color:#111827;font-weight:500;">${details.browser} on ${details.os}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:90px;">IP Address</td>
                  <td style="font-size:14px;color:#111827;font-weight:500;font-family:monospace;">${details.ip}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Warning box -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px 20px;">
              <p style="margin:0 0 6px;font-size:14px;color:#991b1b;font-weight:700;">⚠️ &nbsp;Wasn't you?</p>
              <p style="margin:0;font-size:13px;color:#b91c1c;line-height:1.6;">
                If you did not sign in, your account may be compromised. Contact us immediately at
                <a href="mailto:urgent@cosmico.money" style="color:#dc2626;font-weight:700;text-decoration:none;">urgent@cosmico.money</a>
                and change your password right away.
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
          If this was you, no action is needed. These alerts are sent for every successful sign-in to keep your account safe.
        </p>
      </td>
    </tr>`);
}

function parseUserAgent(ua: string): { device: string; browser: string; os: string } {
  let device = "Desktop";
  if (/iPhone/i.test(ua)) device = "iPhone";
  else if (/iPad/i.test(ua)) device = "iPad";
  else if (/Android.*Mobile/i.test(ua)) device = "Android Phone";
  else if (/Android/i.test(ua)) device = "Android Tablet";

  let browser = "Unknown Browser";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\//i.test(ua)) browser = "Opera";
  else if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua)) browser = "Safari";

  let os = "Unknown OS";
  if (/Windows NT 10/i.test(ua)) os = "Windows 11/10";
  else if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/iPhone OS/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Linux/i.test(ua)) os = "Linux";

  return { device, browser, os };
}

// Store OTP state server-side in Appwrite user prefs (avoids cookie issues)
export const sendOTPAndStorePending = async ({
  userId,
  email,
  firstName,
  sessionSecret,
  isSignUp = false,
}: {
  userId: string;
  email: string;
  firstName: string;
  sessionSecret: string;
  isSignUp?: boolean;
}): Promise<void> => {
  const otp = generateOTP();
  const otpHash = hashOTP(otp);
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  const { user } = await createAdminClient();
  await user.updatePrefs(userId, { otpHash, expires, sessionSecret, email, firstName, isSignUp });

  await resend.emails.send({
    from: "Cosmico Bank <noreply@cosmico.money>",
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
  const email = prefs.email as string;
  const firstName = prefs.firstName as string;
  const isSignUp = prefs.isSignUp as boolean;

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

  // Send post-verification email (fire-and-forget, don't block the response)
  const reqHeaders = headers();
  const ua = reqHeaders.get("user-agent") || "";
  const forwarded = reqHeaders.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : (reqHeaders.get("x-real-ip") || "Unknown");
  const { device, browser, os } = parseUserAgent(ua);
  const time = new Date().toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "UTC",
  }) + " UTC";

  if (isSignUp) {
    resend.emails.send({
      from: "Cosmico Bank <noreply@cosmico.money>",
      to: email,
      subject: `Welcome to Cosmico Bank, ${firstName}! 🎉`,
      html: welcomeEmailHtml(firstName),
    }).catch(() => {});
  } else {
    resend.emails.send({
      from: "Cosmico Bank <security@cosmico.money>",
      to: email,
      subject: "New sign-in to your Cosmico Bank account",
      html: signInAlertEmailHtml(firstName, { ip, device, browser, os, time }),
    }).catch(() => {});
  }

  return { success: true };
};

// Resend OTP — reads existing session info from prefs, generates a new code
export const resendOTP = async (userId: string): Promise<void> => {
  const { user } = await createAdminClient();
  const prefs = await user.getPrefs(userId);

  if (!prefs.sessionSecret) {
    throw new Error("No pending authentication. Please sign in again.");
  }

  const { sessionSecret, email, firstName, isSignUp } = prefs as {
    sessionSecret: string;
    email: string;
    firstName: string;
    isSignUp: boolean;
  };

  await sendOTPAndStorePending({ userId, email, firstName, sessionSecret, isSignUp });
};
