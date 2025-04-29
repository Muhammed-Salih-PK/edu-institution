// app/admin/jobs/page.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaBook , FaArchive, FaEye, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { JobCards } from "@/components/job-card";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [expiredJobs, setExpiredJobs] = useState([]);
  const [archivedJobs, setArchivedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        
        const data = await response.json();
        
        // Categorize jobs by status
        const now = new Date();
        const active = data.filter(job => 
          job.status === "active" && 
          (new Date(job.deadline) >= now || job.isActive)
        );
        const expired = data.filter(job => 
          job.status === "expired" || 
          (new Date(job.deadline) < now && !job.isActive)
        );
        const archived = data.filter(job => job.status === "archived");
        
        setJobs(active);
        setExpiredJobs(expired);
        setArchivedJobs(archived);
      } catch (error) {
        console.error("Fetch error:");
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    try {
      const response = await fetch(`/api/admin/jobs`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error("Failed to delete job");

      // Remove from all states
      setJobs(prev => prev.filter(job => job._id !== id));
      setExpiredJobs(prev => prev.filter(job => job._id !== id));
      setArchivedJobs(prev => prev.filter(job => job._id !== id));
      
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Delete error:");
      toast.error(error.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: newStatus,
          isActive: newStatus === "active"
        })
      });

      if (!response.ok) throw new Error(`Failed to update job status`);

      const updatedJob = await response.json();

      // Update the appropriate state
      if (newStatus === "active") {
        setExpiredJobs(prev => prev.filter(job => job._id !== id));
        setArchivedJobs(prev => prev.filter(job => job._id !== id));
        setJobs(prev => [...prev, updatedJob]);
      } else if (newStatus === "archived") {
        setJobs(prev => prev.filter(job => job._id !== id));
        setExpiredJobs(prev => prev.filter(job => job._id !== id));
        setArchivedJobs(prev => [...prev, updatedJob]);
      } else if (newStatus === "expired") {
        setJobs(prev => prev.filter(job => job._id !== id));
        setArchivedJobs(prev => prev.filter(job => job._id !== id));
        setExpiredJobs(prev => [...prev, updatedJob]);
      }

      toast.success(`Job ${newStatus} successfully`);
    } catch (error) {
      console.error("Status change error:",);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-grow py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8">Manage Jobs</h2>

        <div className="flex justify-end mb-6">
          <Link href="/admin/jobs/add">
            <Button className="flex items-center gap-2">
              <FaPlus /> Add Job
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({jobs.length})</TabsTrigger>
            <TabsTrigger value="expired">Expired ({expiredJobs.length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({archivedJobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <JobList 
              jobs={jobs} 
              loading={loading} 
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              type="active"
            />
          </TabsContent>

          <TabsContent value="expired">
            <JobList 
              jobs={expiredJobs} 
              loading={loading} 
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              type="expired"
            />
          </TabsContent>

          <TabsContent value="archived">
            <JobList 
              jobs={archivedJobs} 
              loading={loading} 
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              type="archived"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function JobList({ jobs, loading, onDelete, onStatusChange, type }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 xl:grid-cols-2 5xl:grid-cols-4">
      {loading ? (
        Array(4).fill(null).map((_, i) => (
          <Skeleton key={i} className="h-52 w-full rounded-lg" />
        ))
      ) : jobs.length === 0 ? (
        <div className="col-span-full text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FaBook className="text-gray-600 text-3xl" />
          </div>
          <h3 className="text-2xl font-medium text-gray-800 mb-2">
            No {type} jobs available
          </h3>
        </div>
      ) : (
        jobs.map((job) => (
          <JobCards
            key={job._id}
            job={job}
            onDelete={() => onDelete(job._id)}
            onStatusChange={(newStatus) => onStatusChange(job._id, newStatus)}
            formatDate={formatDate}
          />
        ))
      )}
    </div>
  );
}