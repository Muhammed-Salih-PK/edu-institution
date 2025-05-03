"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const JobFormFields = ({ formData, handleChange, loading }) => {
  // Department options
  const departments = [
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "operations", label: "Operations" },
    { value: "hr", label: "Human Resources" },
    { value: "product", label: "Product Management" },
  ];

  // Employment type options
  const employmentTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];

  // Location type options
  const locationTypes = [
    { value: "remote", label: "Fully Remote" },
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
  ];

  return (
    <div className='space-y-4'>
      {/* Job Title */}
      <div className='space-y-2'>
        <Label htmlFor='title'>Job Title*</Label>
        <Input
          id='title'
          name='title'
          placeholder='Senior Software Engineer'
          value={formData.title}
          onChange={handleChange}
          disabled={loading}
          required
        />
      </div>

      {/* Job Description */}
      <div className='space-y-2'>
        <Label htmlFor='description'>Description*</Label>
        <Textarea
          id='description'
          name='description'
          placeholder='Describe the role, responsibilities, and requirements...'
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
          required
          minLength={10}
          className='min-h-[120px]'
        />
      </div>

      {/* Department and Employment Type */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label>Department*</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => handleChange({ target: { name: "department", value } })}
            disabled={loading}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder='Select department' />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept.value} value={dept.value}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>Employment Type*</Label>
          <Select
            value={formData.employmentType}
            onValueChange={(value) => handleChange({ target: { name: "employmentType", value } })}
            disabled={loading}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              {employmentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location Type and Physical Location */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label>Work Arrangement*</Label>
          <Select
            value={formData.locationType}
            onValueChange={(value) => handleChange({ target: { name: "locationType", value } })}
            disabled={loading}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder='Select work arrangement' />
            </SelectTrigger>
            <SelectContent>
              {locationTypes.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='location'>{formData.locationType === "remote" ? "Company Location" : "Office Location*"}</Label>
          <Input
            id='location'
            name='location'
            placeholder={formData.locationType === "remote" ? "e.g. Based in San Francisco" : "e.g. New York Office"}
            value={formData.location}
            onChange={handleChange}
            disabled={loading}
            required={formData.locationType !== "remote"}
          />
        </div>
      </div>

      {/* Salary and Deadline */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='salary'>Salary Range*</Label>
          <Input
            id='salary'
            name='salary'
            placeholder='$75,000 - $95,000 or Competitive'
            value={formData.salary}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='deadline'>Application Deadline*</Label>
          <Input
            id='deadline'
            type='date'
            name='deadline'
            value={formData.deadline}
            onChange={handleChange}
            disabled={loading}
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default JobFormFields;
