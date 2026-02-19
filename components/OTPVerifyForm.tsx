"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { verifyOTP, resendOTP } from "@/lib/actions/otp.actions";

const OTPVerifyForm = ({ email, userId }: { email: string; userId: string }) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    setIsVerifying(true);
    setError(null);

    try {
      await verifyOTP(otp, userId);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      await resendOTP(userId);
      setResendSuccess(true);
      setOtp("");
      setTimeout(() => setResendSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please sign in again.");
    } finally {
      setIsResending(false);
    }
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(b.length) + c)
    : "your email";

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Cosmico logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Cosmico</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            Verify your identity
          </h1>
          <p className="text-16 font-normal text-gray-600">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-gray-900">{maskedEmail}</span>
          </p>
        </div>
      </header>

      {/* OTP input */}
      <div className="flex flex-col gap-6 mt-2">
        <div className="flex flex-col gap-2">
          <label className="form-label">
            Verification code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setOtp(val);
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="000000"
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 16,
              textAlign: "center",
              padding: "14px 20px",
              border: error ? "1.5px solid #ef4444" : "1.5px solid #e2e8f0",
              borderRadius: 10,
              outline: "none",
              background: "#f8fafc",
              color: "#111827",
              width: "100%",
            }}
          />
          {error && (
            <p className="text-12 text-red-500">{error}</p>
          )}
        </div>

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className="form-btn"
        >
          {isVerifying ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>

        {/* Resend */}
        <div className="flex flex-col items-center gap-2">
          {resendSuccess ? (
            <p className="text-14 text-green-600 font-medium">
              New code sent to your email.
            </p>
          ) : (
            <p className="text-14 text-gray-500">
              Didn't receive it?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-[#FC5C3A] font-semibold hover:underline disabled:opacity-50 inline-flex items-center gap-1"
              >
                {isResending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <RotateCcw size={12} />
                )}
                Resend code
              </button>
            </p>
          )}
          <p className="text-12 text-gray-400">Code expires in 10 minutes</p>
          <p className="text-12 text-gray-400">
            Wrong email?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:underline font-medium">
              Go back and correct it
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OTPVerifyForm;
