// src/app/(auth)/signup/page.tsx
'use client';

import AuthForm from '@/components/auth/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { AuthFormValues } from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function SignupPage() {
  const handleSignup = async (values: AuthFormValues) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl shadow-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Create Account</CardTitle>
          <CardDescription>Join PromptForge and start generating amazing AI images.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" onSubmit={handleSignup} />
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
