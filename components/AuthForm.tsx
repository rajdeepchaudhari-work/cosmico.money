'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomInput from './CustomInput';
import AddressAutocomplete from './AddressAutocomplete';
import { authFormSchema, COUNTRY_CONFIG } from '@/lib/utils';
import { Loader2, AlertCircle, X, CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { verifyOTP, resendOTP } from '@/lib/actions/otp.actions';
import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetSuccess = type === 'sign-in' && searchParams.get('reset') === 'success';
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Inline OTP step (sign-up only)
  const [otpStep, setOtpStep] = useState(false);
  const [pendingUserId, setPendingUserId] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);

  const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: 'onBlur',
      defaultValues: {
        email: "",
        password: '',
        country: 'UK',
      },
    })

    const selectedCountry = form.watch('country') || 'UK';
    const countryConfig = COUNTRY_CONFIG[selectedCountry] || COUNTRY_CONFIG.US;

    // Auto-fill demo ID number when country changes (sandbox only)
    const DEMO_IDS: Record<string, string> = {
      US: '1234',
      CA: '123-456-789',
      UK: 'QQ 12 34 56 C',
    };
    useEffect(() => {
      if (type === 'sign-up') {
        form.setValue('ssn', DEMO_IDS[selectedCountry] ?? '');
      }
    }, [selectedCountry, type]);

    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true);
      setAuthError(null);

      try {
        if(type === 'sign-up') {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            country: data.country!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password
          }

          const newUser = await signUp({
            ...userData,
            ...(pendingUserId ? { previousPendingUserId: pendingUserId } : {}),
          } as any);
          if (newUser?.requiresOTP) {
            setPendingUserId(newUser.userId);
            setPendingEmail(data.email);
            setOtp('');
            setOtpError(null);
            setOtpStep(true);
          } else {
            setUser(newUser);
          }
        }

        if(type === 'sign-in') {
          const response = await signIn({
            email: data.email,
            password: data.password,
          })

          if (response?.requiresOTP) {
            router.push(`/verify-otp?uid=${btoa(response.userId)}`);
          } else if (response) {
            router.push('/');
          }
        }
      } catch (error: any) {
        // Appwrite puts the code in error.type e.g. "user_invalid_credentials"
        const combined = `${error?.message ?? ''} ${error?.type ?? ''}`.toLowerCase();

        if (type === 'sign-in') {
          if (combined.includes('invalid') || combined.includes('credentials') || combined.includes('password')) {
            setAuthError('Incorrect email or password. Please try again.');
          } else {
            setAuthError('Sign in failed. Please check your details and try again.');
          }
        } else {
          if (combined.includes('already exists') || combined.includes('conflict')) {
            setAuthError('An account with this email already exists. Try signing in instead.');
          } else {
            setAuthError('Sign up failed. Please check your details and try again.');
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

  const handleOtpVerify = async () => {
    if (otp.length !== 6) return;
    setIsVerifying(true);
    setOtpError(null);
    try {
      await verifyOTP(otp, pendingUserId);
      router.push('/');
    } catch (err: any) {
      setOtpError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpResend = async () => {
    setIsResending(true);
    setOtpError(null);
    setResendSuccess(false);
    try {
      await resendOTP(pendingUserId);
      setResendSuccess(true);
      setOtp('');
      setTimeout(() => setResendSuccess(false), 4000);
    } catch (err: any) {
      setOtpError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Masked email for display
  const maskedEmail = pendingEmail
    ? pendingEmail.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(b.length) + c)
    : 'your email';

  return (
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
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
              {user
                ? 'Link Account'
                : otpStep
                  ? 'Verify your email'
                  : type === 'sign-in'
                    ? 'Sign In'
                    : 'Sign Up'
              }
            </h1>
            <p className="text-16 font-normal text-gray-600">
              {user
                ? 'Link your account to get started'
                : otpStep
                  ? <>We sent a 6-digit code to <span className="font-medium text-gray-900">{maskedEmail}</span></>
                  : 'Please enter your details'
              }
            </p>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : otpStep ? (
        /* ── Inline OTP step (sign-up only) ── */
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="form-label">Verification code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setOtpError(null); }}
              onKeyDown={(e) => e.key === 'Enter' && handleOtpVerify()}
              placeholder="000000"
              style={{
                fontSize: 28, fontWeight: 700, letterSpacing: 16, textAlign: 'center',
                padding: '14px 20px',
                border: otpError ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0',
                borderRadius: 10, outline: 'none', background: '#f8fafc',
                color: '#111827', width: '100%',
              }}
            />
            {otpError && <p className="text-12 text-red-500">{otpError}</p>}
          </div>

          <Button onClick={handleOtpVerify} disabled={otp.length !== 6 || isVerifying} className="form-btn">
            {isVerifying ? <><Loader2 size={20} className="animate-spin" /> &nbsp; Verifying...</> : 'Verify'}
          </Button>

          <div className="flex flex-col items-center gap-2">
            {resendSuccess ? (
              <p className="text-14 text-green-600 font-medium">New code sent to your email.</p>
            ) : (
              <p className="text-14 text-gray-500">
                Didn&apos;t receive it?{' '}
                <button
                  type="button"
                  onClick={handleOtpResend}
                  disabled={isResending}
                  className="text-[#FC5C3A] font-semibold hover:underline disabled:opacity-50 inline-flex items-center gap-1"
                >
                  {isResending ? <Loader2 size={12} className="animate-spin" /> : <RotateCcw size={12} />}
                  Resend code
                </button>
              </p>
            )}
            <p className="text-12 text-gray-400">Code expires in 10 minutes</p>
            <button
              type="button"
              onClick={() => { setOtpStep(false); setOtp(''); setOtpError(null); }}
              className="mt-1 inline-flex items-center gap-1.5 text-14 text-blue-600 hover:underline font-medium"
            >
              <ArrowLeft size={14} />
              Wrong email? Go back to correct it
            </button>
          </div>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="input-class">
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white">
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="form-message mt-2" />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='e.g. John' />
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='e.g. Smith' />
                  </div>
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="form-label">Address</FormLabel>
                        <FormControl>
                          <AddressAutocomplete
                            value={field.value || ''}
                            onChange={field.onChange}
                            onSelect={({ address1, city, state, postalCode }) => {
                              form.setValue('address1', address1, { shouldValidate: true });
                              form.setValue('city', city, { shouldValidate: true });
                              form.setValue('state', state, { shouldValidate: true });
                              form.setValue('postalCode', postalCode, { shouldValidate: true });
                            }}
                            countryCode={selectedCountry === 'UK' ? 'gb' : selectedCountry.toLowerCase()}
                            placeholder={countryConfig.addressPlaceholder}
                          />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                      </FormItem>
                    )}
                  />
                  <CustomInput control={form.control} name='city' label="City" placeholder={countryConfig.cityPlaceholder} />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label={countryConfig.stateLabel} placeholder={countryConfig.statePlaceholder} />
                    <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder={countryConfig.postalPlaceholder} />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='' type="date" />
                    <CustomInput control={form.control} name='ssn' label={countryConfig.idLabel} placeholder={countryConfig.idPlaceholder} disabled />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

              <div className="flex flex-col gap-1">
                <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />
                {type === 'sign-in' && (
                  <Link href="/forgot-password" className="text-12 text-right text-blue-600 hover:underline mt-1 self-end">
                    Forgot password?
                  </Link>
                )}
              </div>

              {type === 'sign-up' && (
                <CustomInput control={form.control} name='confirmPassword' label="Confirm Password" placeholder='Re-enter your password' />
              )}

              {type === 'sign-up' && (
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            id="agreeToTerms"
                            checked={field.value || false}
                            onChange={field.onChange}
                            className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-blue-600 cursor-pointer shrink-0"
                          />
                        </FormControl>
                        <FormLabel htmlFor="agreeToTerms" className="text-14 text-gray-600 leading-snug font-normal cursor-pointer">
                          I have read and agree to the{' '}
                          <Link href="/terms" target="_blank" className="text-blue-600 hover:underline font-medium">
                            Terms &amp; Conditions
                          </Link>
                          {' '}and the{' '}
                          <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline font-medium">
                            Privacy Policy
                          </Link>
                        </FormLabel>
                      </div>
                      <FormMessage className="form-message mt-1" />
                    </FormItem>
                  )}
                />
              )}

              {resetSuccess && (
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <p className="text-sm text-green-700">Password updated successfully. Please sign in.</p>
                </div>
              )}

              {authError && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <p className="flex-1 text-sm text-red-700">{authError}</p>
                  <button
                    type="button"
                    onClick={() => setAuthError(null)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' 
                    ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm