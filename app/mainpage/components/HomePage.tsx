"use client";
import React, { useEffect, useState } from "react";
import JobCard from "./Card";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: "inPerson" | "remote";
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: string;
  status: "open" | "closed";
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string | null;
  perksAndBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  averageRating: number;
  totalReviews: number;
}

export default function HomePage() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/signin");
  }
  console.log("session", session);
  const [jobData, setJobData] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://akil-backend.onrender.com/opportunities/search"
        );
        const { data } = await response.json();
        if (!response.ok) {
          console.log("yes"); // why yes ??
        }
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
      console.log(jobData); // why print data
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen px-20 py-10 bg-white">
      <div className="relative top-[50px] left-[450px]  w-[900px] h-[700px]">
        <div className="mb-6">
          <div className="flex justify-center items-center gap-5 my-4 w-full">
            <div>
              <h1 className="text-3xl font-bold">Opportunities</h1>
              <p className="text-gray-600">Showing {jobData.length} results</p>
            </div>
            <div className="flex items-center ml-auto">
              <span className="mr-2">Sort by:</span>
              <select className="border rounded p-1 font-bold">
                <option>Most Relevant</option>
                <option>Latest</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start">
          {jobData.map((job) => (
            <ul key={job.id}>
              <Link href={`/mainpage/jobDetail/${job.id}`} legacyBehavior>
                <li>
                  <a className="my-5">
                    <JobCard
                      id={parseInt(job.id)}
                      title={job.title}
                      location={job.location.join(", ")}
                      description={job.description}
                      imageUrl={job.logoUrl}
                      company={job.orgName}
                    />
                  </a>
                </li>
              </Link>
            </ul>
          ))}
        </div>
      </div>
    </main>
  );
}
