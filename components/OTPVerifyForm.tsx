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
    <section className="auth-form auth-dark">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/landing" className="cursor-pointer flex items-center gap-2">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Cosmico logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-white">Cosmico</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-white">
            Verify your identity
          </h1>
          <p className="text-16 font-normal" style={{ color: 'rgba(255,255,255,0.5)' }}>
            We sent a 6-digit code to{" "}
            <span className="font-medium text-white">{maskedEmail}</span>
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 mt-2">
        <div className="flex flex-col gap-2">
          <label style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: 500 }}>
            Verification code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, ""));
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
              border: error ? "1.5px solid #f87171" : "1.5px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              outline: "none",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              width: "100%",
            }}
          />
          {error && <p style={{ color: '#f87171', fontSize: 12 }}>{error}</p>}
        </div>

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className="form-btn"
        >
          {isVerifying ? (
            <><Loader2 size={20} className="animate-spin" /> &nbsp; Verifying...</>
          ) : (
            "Verify"
          )}
        </Button>

        <div className="flex flex-col items-center gap-2">
          {resendSuccess ? (
            <p className="text-14 font-medium" style={{ color: '#34d399' }}>
              New code sent to your email.
            </p>
          ) : (
            <p className="text-14" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Didn&apos;t receive it?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="font-semibold hover:underline disabled:opacity-50 inline-flex items-center gap-1"
                style={{ color: '#FC5C3A' }}
              >
                {isResending ? <Loader2 size={12} className="animate-spin" /> : <RotateCcw size={12} />}
                Resend code
              </button>
            </p>
          )}
          <p className="text-12" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Code expires in 10 minutes
          </p>
          <p className="text-12" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Wrong email?{" "}
            <Link href="/sign-in" className="font-medium hover:underline" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Go back and correct it
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OTPVerifyForm;
