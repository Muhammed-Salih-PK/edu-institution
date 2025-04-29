"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { ApplicationCards } from "@/components/application-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const APPLICATIONS_PER_PAGE = 4;

export default function ViewApplications() {
  const [groupedApplications, setGroupedApplications] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/admin/applications");
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to fetch applications");
        }

        const applications = Array.isArray(json.data) ? json.data : [];

        const grouped = applications.reduce((acc, app) => {
          const jobTitle = app.jobId?.title || "Unknown Job";
          acc[jobTitle] = acc[jobTitle] || [];
          acc[jobTitle].push(app);
          return acc;
        }, {});

        setGroupedApplications(grouped);
        setSelectedJob(Object.keys(grouped)[0] || null);

        // Set default page 1 for each job
        const initialPageState = {};
        Object.keys(grouped).forEach((job) => (initialPageState[job] = 1));
        setCurrentPage(initialPageState);
      } catch (err) {
        console.error("❌ Fetch Error:");
        toast.error("Failed to load applications");
        setGroupedApplications({});
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const [downloading, setDownloading] = useState(false);

const downloadAllResumes = async () => {
  setDownloading(true);
  try {
    const res = await fetch("/api/admin/applicationsDownload");
    if (!res.ok) throw new Error("Download failed");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `applications-${new Date().toISOString().split("T")[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success("Downloaded successfully!");
  } catch (err) {
    toast.error("Failed to download Excel");
  } finally {
    setDownloading(false);
  }
};


  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-black/80 dark:text-white/80">
          Job Applications
        </h2>

        {loading ? (
          <LoadingSkeleton />
        ) : Object.keys(groupedApplications).length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No applications available.</p>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {Object.keys(groupedApplications).map((job) => (
                <Button
                  key={job}
                  onClick={() => setSelectedJob(job)}
                  className={`px-4 py-2 rounded-lg border border-black ${
                    selectedJob === job
                      ? " text-white dark:text-gray-700 dark:bg-white"
                      : "bg-white text-black hover:text-white hover:bg-gray-800 dark:bg-accent  "
                  } transition`}
                >
                  {job}
                </Button>
              ))}
            </div>

            {/* Tab Content */}
            {selectedJob && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{selectedJob}</h3>
                  <Button
                    onClick={ downloadAllResumes}
                    className="px-4 py-2 rounded "
                  >
                    Download All Details
                  </Button>
                </div>

                <ul className="grid sm:grid-cols-2 gap-6">
                  {groupedApplications[selectedJob]
                    .slice(
                      (currentPage[selectedJob] - 1) * APPLICATIONS_PER_PAGE,
                      currentPage[selectedJob] * APPLICATIONS_PER_PAGE
                    )
                    .map((app) => (
                      <ApplicationCards
                        key={app._id}
                        AppId={app._id}
                        AppName={app.name}
                        AppEmail={app.email}
                        AppPhone={app.phone}
                        AppResume={app.resumePublicId}
                        AppjobId={app.jobId}
                      />
                    ))}
                </ul>

                {/* Pagination */}
                {groupedApplications[selectedJob].length > APPLICATIONS_PER_PAGE && (
                  <Pagination className="mt-6 justify-center">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => ({
                              ...prev,
                              [selectedJob]: Math.max((prev[selectedJob] || 1) - 1, 1),
                            }))
                          }
                          className={`${
                            currentPage[selectedJob] === 1
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        />
                      </PaginationItem>

                      <PaginationItem>
                        <span className="px-4 py-2 text-gray-400">
                          Page {currentPage[selectedJob]} of{" "}
                          {Math.ceil(
                            groupedApplications[selectedJob].length / APPLICATIONS_PER_PAGE
                          )}
                        </span>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) => ({
                              ...prev,
                              [selectedJob]: Math.min(
                                (prev[selectedJob] || 1) + 1,
                                Math.ceil(
                                  groupedApplications[selectedJob].length / APPLICATIONS_PER_PAGE
                                )
                              ),
                            }))
                          }
                          className={`${
                            currentPage[selectedJob] >=
                            Math.ceil(
                              groupedApplications[selectedJob].length / APPLICATIONS_PER_PAGE
                            )
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * 🔹 Loading Skeleton
 */
const LoadingSkeleton = () => (
  <>
    <Skeleton className="h-20 mb-5 rounded-lg" />
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {Array.from({ length: APPLICATIONS_PER_PAGE }).map((_, i) => (
        <Skeleton key={i} className="h-52 w-full rounded-lg" />
      ))}
    </div>
  </>
);
