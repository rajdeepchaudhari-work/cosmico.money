'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendPasswordRecovery } from '@/lib/actions/user.actions';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});

const ForgotPassword = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }: z.infer<typeof schema>) => {
    setStatus('idle');
    try {
      await sendPasswordRecovery(email);
      setStatus('success');
    } catch (error: any) {
      const combined = `${error?.message ?? ''} ${error?.type ?? ''}`.toLowerCase();
      if (combined.includes('not found') || combined.includes('user_not_found')) {
        setErrorMsg('No account found with that email address.');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
      setStatus('error');
    }
  };

  return (
    <section className="flex-center size-full max-sm:px-6">
      <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
          <Link href="/landing" className="cursor-pointer flex items-center gap-1">
            <Image src="/icons/logo.svg" width={34} height={34} alt="Cosmico logo" />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Cosmico</h1>
          </Link>
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              Forgot password?
            </h1>
            <p className="text-16 font-normal text-gray-600">
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>
        </header>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <p className="text-16 font-semibold text-gray-900">Check your inbox</p>
            <p className="text-14 text-gray-600">
              We&apos;ve sent a password reset link to{' '}
              <span className="font-medium">{form.getValues('email')}</span>.
              It may take a minute to arrive.
            </p>
            <Link href="/sign-in" className="form-link text-14">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Email</FormLabel>
                    <div className="flex w-full flex-col">
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="input-class"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              {status === 'error' && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              )}

              <Button type="submit" disabled={form.formState.isSubmitting} className="form-btn">
                {form.formState.isSubmitting ? (
                  <><Loader2 size={20} className="animate-spin" />&nbsp;Sending...</>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          </Form>
        )}

        <footer className="flex justify-center gap-1">
          <p className="text-14 font-normal text-gray-600">Remember your password?</p>
          <Link href="/sign-in" className="form-link">Sign in</Link>
        </footer>
      </section>
    </section>
  );
};

export default ForgotPassword;
