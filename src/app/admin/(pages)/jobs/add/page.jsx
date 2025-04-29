"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JobFormFields } from "@/components/job/JobFormFields";
import { SkillsInput } from "@/components/ui/SkillsInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    employmentType: "",
    locationType: "remote",
    location: "",
    salary: "",
    skillsRequired: [],
    deadline: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSkillsChange = (e) => {
    const skills = Array.isArray(e.target.value) ? e.target.value : [];
    setFormData(prev => ({ ...prev, skillsRequired: skills }));
    if (errors.skillsRequired) {
      setErrors(prev => ({ ...prev, skillsRequired: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (formData.description.length < 10) newErrors.description = "Description must be at least 20 characters";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.employmentType) newErrors.employmentType = "Employment type is required";
    if (!formData.locationType) newErrors.locationType = "Work arrangement is required";
    if (formData.locationType !== "remote" && !formData.location.trim()) {
      newErrors.location = "Location is required for on-site/hybrid roles";
    }
    if (formData.skillsRequired.length === 0) newErrors.skillsRequired = "At least one skill is required";
    
    const salaryRegex = /^(\$?\d{1,3}(,\d{3})*(\.\d{2})?|\d+)(\s*-\s*(\$?\d{1,3}(,\d{3})*(\.\d{2})?|\d+))?$/;
    if (!formData.salary.trim()) {
      newErrors.salary = "Salary information is required";
    } else if (!salaryRegex.test(formData.salary)) {
      newErrors.salary = "Invalid format. Use: $75,000 or $75,000 - $95,000";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    } else if (new Date(formData.deadline) < new Date()) {
      newErrors.deadline = "Deadline must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
  
    try {
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          deadline: new Date(formData.deadline).toISOString()
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add job posting");
      }
  
      toast.success("Job posting created successfully!");
      router.push("/admin/jobs");
      router.refresh(); // Refresh the page to show new data
    } catch (error) {
      console.error("Submission error:");
      toast.error(error.message || "An error occurred while creating the job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create New Job Posting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <JobFormFields 
              formData={formData} 
              handleChange={handleChange} 
              loading={loading}
              errors={errors}
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Required Skills*
                {errors.skillsRequired && (
                  <span className="ml-2 text-sm text-red-500">
                    {errors.skillsRequired}
                  </span>
                )}
              </label>
              <SkillsInput
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleSkillsChange}
                placeholder="Enter required skills (e.g. JavaScript, React)"
              />
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/jobs")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Create Job"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}