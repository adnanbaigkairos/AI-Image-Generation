// src/app/(auth)/login/page.tsx
'use client';

import AuthForm from '@/components/auth/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { AuthFormValues } from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  const handleLogin = async (values: AuthFormValues) => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
          <CardDescription>Log in to unleash your creativity with PromptForge.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" onSubmit={handleLogin} />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
