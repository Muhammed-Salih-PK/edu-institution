'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { LoginForm } from '@/components/login-form';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          result.error === 'CredentialsSignin' 
            ? 'Invalid email or password' 
            : result.error
        );
      }

      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Admin Login</h2>
        <LoginForm
          formData={formData}
          handleChange={handleChange} 
          handlesubmit={handleSubmit}
        />
      </div>
    </div>
  );
}