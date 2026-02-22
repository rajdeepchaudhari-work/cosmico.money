'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resetPassword } from '@/lib/actions/user.actions';
import { useState } from 'react';

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirm: z.string(),
}).refine(d => d.password === d.confirm, {
  message: 'Passwords do not match',
  path: ['confirm'],
});

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') ?? '';
  const secret = searchParams.get('secret') ?? '';
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { password: '', confirm: '' },
  });

  const onSubmit = async ({ password }: z.infer<typeof schema>) => {
    setAuthError(null);
    if (!userId || !secret) {
      setAuthError('Invalid or expired reset link. Please request a new one.');
      return;
    }
    try {
      await resetPassword(userId, secret, password);
      router.push('/sign-in?reset=success');
    } catch (error: any) {
      const combined = `${error?.message ?? ''} ${error?.type ?? ''}`.toLowerCase();
      if (combined.includes('expired') || combined.includes('invalid')) {
        setAuthError('This reset link has expired. Please request a new one.');
      } else {
        setAuthError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section className="auth-form auth-dark">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/landing" className="cursor-pointer flex items-center gap-2">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Cosmico logo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-white">Cosmico</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-white">
            Set new password
          </h1>
          <p className="text-16 font-normal" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Choose a strong password for your account.
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div className="form-item">
                <FormLabel className="form-label">New Password</FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input type="password" placeholder="At least 8 characters" className="input-class" {...field} />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
                </div>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <div className="form-item">
                <FormLabel className="form-label">Confirm Password</FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input type="password" placeholder="Repeat your password" className="input-class" {...field} />
                  </FormControl>
                  <FormMessage className="form-message mt-2" />
                </div>
              </div>
            )}
          />

          {authError && (
            <div className="flex items-start gap-3 rounded-lg px-4 py-3"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#f87171' }} />
              <p className="flex-1 text-sm" style={{ color: '#f87171' }}>{authError}</p>
            </div>
          )}

          <Button type="submit" disabled={form.formState.isSubmitting} className="form-btn">
            {form.formState.isSubmitting ? (
              <><Loader2 size={20} className="animate-spin" />&nbsp;Updating...</>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Remember your password?
        </p>
        <Link href="/sign-in" className="form-link">Sign in</Link>
      </footer>
    </section>
  );
};

export default ResetPassword;
