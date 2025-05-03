"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/account");
        const data = await res.json();
        if (res.ok) {
          setEmail(data.email);
          setRole(data.role);
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch (err) {
        toast.error("Error fetching account details");
      }
    };

    fetchAdmin();
  }, []);


  return (
    <div className='min-h-screen bg-base-200 py-5 px-4'>
      <div className='max-w-2xl mx-auto bg-base-100 rounded-2xl shadow-lg p-8 space-y-8'>
        <h2 className='text-3xl font-bold text-center text-primary'>Admin Account</h2>

        <div className='space-y-4'>
          <div>
            <Label className='text-base-content'>Email</Label>
            <Input value={email} disabled className='mt-1 input input-bordered w-full text-gray-900 dark:text-white' />
          </div>

          <div>
            <Label className='text-base-content'>Role</Label>
            <Input value={role} disabled className='mt-1 input input-bordered w-full text-gray-900 dark:text-white' />
          </div>
        </div>
      </div>
    </div>
  );
}
