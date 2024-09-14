"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface PlacementIssue {
  issueId: string;
  registrationNumber: string;
  name: string;
  issue: string;
  status: string;
  companyName: string;
  comments: string[] | undefined;
}

const IssueDetails = () => {
  const [issues, setIssues] = useState<PlacementIssue[]>([]); // Array to store multiple issues
  const router = useRouter();

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem("userToken");
      const registrationNumber = localStorage.getItem("registrationNumber");
      if (token && registrationNumber) {
        try {
          const response = await axios.get(
            `http://localhost:4000/trpc/readOwnPlacementIssues`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userIssues = response.data.result.data.filter(
            (iss: PlacementIssue) => iss.registrationNumber === registrationNumber
          );
          if (userIssues.length) {
            setIssues(userIssues); // Set all issues to state
          }
        } catch (error) {
          console.error("Error fetching issues:", error);
        }
      } else {
        router.push("/");
      }
    };
    fetchIssues();
  }, [router]);

  if (!issues.length) return <p>Loading....</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Your Placement Issues</h1>

        {issues.map((issue) => (
          <div key={issue.issueId} className="mb-6">
            <p className="text-lg text-gray-700 mb-1">
              <span className="font-semibold">Issue: </span>
              {issue.issue}
            </p>
            <p className="text-lg text-gray-700 mb-1">
              <span className="font-semibold">Company: </span>
              {issue.companyName}
            </p>
            <p
              className={`text-lg font-semibold ${
                issue.status === "resolved" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              Status: {issue.status}
            </p>

            <ul className="mt-4 space-y-2">
              {issue.comments?.length ? (
                issue.comments.map((comm, i) => (
                  <li key={i} className="text-sm text-gray-700 border-b pb-2">{comm}</li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet</p>
              )}
            </ul>
            <hr className="my-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueDetails;
