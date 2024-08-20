"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { SiTicktick } from "react-icons/si";

import { JobProps as Job } from "@/app/Props/JobProps";
import { dateFormate } from "@/app/Props/dateFormate";

const JobDetailClient = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    async function fetchJob() {
      try {
        console.log(`Fetching job data for ID: ${id}`);
        const response = await fetch(
          ` https://akil-backend.onrender.com/opportunities/${id}`
        );
        const { data } = await response.json();
        if (response.ok) {
          console.log("Fetched job data:", data);
          setJob(data);
        } else {
          console.error("Failed to fetch job data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    }
    console.log(id);
    if (id) {
      fetchJob();
    } else {
      console.error("No ID found in the URL");
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 md:px-10 py-6 bg-white shadow-lg rounded-lg my-8 w-full h-full ">
      <h1 className="text-3xl font-bold mb-6 text-[#25324B]">{job.title}</h1>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-3/4 pr-6">
          <p className="text-gray-600 mb-6">{job.description}</p>
          <h2 className="text-2xl font-bold mb-4 text-[#25324B]">
            Responsibilities
          </h2>
          <ul className="space-y-3">
            {job.responsibilities?.split("\n").map((responsibility, index) => (
              <li key={index} className="flex gap-3 items-start">
                <img src="/tick.svg" alt="tick" className="w-10 h-10" />
                <p className="text-start text-gray-600">{responsibility}</p>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#25324B]">
            Ideal Candidate
          </h2>
          <div className="mb-6 text-gray-600">
            <p>{job.idealCandidate}</p>
          </div>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#25324B] inline-flex gap-3 items-center">
            <img src="/location.svg" alt="location" className="w-10 h-10" />
            When & Where
          </h2>
          <p className="mb-4 text-gray-600">{job.whenAndWhere}</p>
        </div>
        <div className="md:w-1/4 pl-6 px-3 py-3 border-l border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-[#25324B]">About</h2>
          <p className="flex items-center gap-3 text-gray-600">
            <img src="/post.svg" alt="post date" className="w-10 h-10" />
            Posted On: {dateFormate(job.datePosted)}
          </p>
          <p className="flex items-center gap-3 text-gray-600">
            <img
              src="/deadline.png"
              alt="deadline date"
              className="w-10 h-10"
            />
            Deadline: {dateFormate(job.deadline)}
          </p>
          <p className="flex items-center gap-3 text-gray-600">
            <img src="/location.svg" alt="location" className="w-10 h-10" />
            Location:{" "}
            {Array.isArray(job.location)
              ? job.location.join(", ")
              : "Not provided"}
          </p>
          <p className="flex items-center gap-3 text-gray-600">
            <img src="/start.svg" alt="start date" className="w-10 h-10" />
            Start Date: {dateFormate(job.startDate)}
          </p>
          <p className="flex items-center gap-3 text-gray-600">
            <img src="/end.svg" alt="end date" className="w-10 h-10" />
            End Date: {dateFormate(job.endDate)}
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#25324B]">
            Categories
          </h2>
          {Array.isArray(job.categories) && job.categories.length > 0 ? (
            job.categories.map((category, index) => (
              <p
                key={index}
                className="mb-2 text-[#FFC663] bg-[#FDF3EB] py-1 px-3 rounded-full text-center"
              >
                {category}
              </p>
            ))
          ) : (
            <p>No categories provided</p>
          )}
          <h2 className="text-2xl font-bold mt-8 mb-4 text-[#25324B]">
            Required Skills
          </h2>
          {Array.isArray(job.requiredSkills) &&
          job.requiredSkills.length > 0 ? (
            job.requiredSkills.map((skill, index) => (
              <p
                key={index}
                className="mb-2 text-[#2D298E] bg-[#F8F8Fd] py-1 px-3 rounded-full text-center"
              >
                {skill}
              </p>
            ))
          ) : (
            <p>No skills required</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailClient;
