"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import * as XLSX from "xlsx";

interface PlacementIssue {
  issueId: string;
  registrationNumber: string;
  name: string;
  issue: string;
  status: string;
  comments: string[] | undefined;
  companyName:string
}

const IssueDetails = () => {
  const [issue, setIssue] = useState<PlacementIssue | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { issueId } = useParams(); // Access the dynamic issueId from the URL

  useEffect(() => {
    const fetchIssue = async () => {
      const token = localStorage.getItem("adminToken");
      if (token && issueId) {
        try {
          const response = await axios.get(
            `http://localhost:4000/trpc/readPlacementIssues`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const foundIssue = response.data.result.data.find(
            (iss: PlacementIssue) => iss.issueId === issueId
          );
          if (foundIssue) {
            setIssue(foundIssue);
            setStatus(foundIssue.status);
            setComment(""); // Clear the comment field
          }
        } catch (error) {
          console.error("Error fetching issue:", error);
        }
      } else {
        router.push("/admin/login");
      }
    };
    fetchIssue();
  }, [issueId, router]);

  const handleCommentUpdate = async () => {
    const token = localStorage.getItem("adminToken");
    if (token && issue) {
      try {
        await axios.post(
          "http://localhost:4000/trpc/commentOnIssue",
          {
            registrationNumber: issue.registrationNumber,
            issueId: issue.issueId,
            comments: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setIssue({
          ...issue,
          comments: issue.comments ? [...issue.comments, comment] : [comment],
        });
        setComment(""); // Clear the comment field
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  const handleStatusUpdate = async () => {
    const token = localStorage.getItem("adminToken");
    if (token && issue) {
      try {
        await axios.post(
          "http://localhost:4000/trpc/statusChange",
          {
            registrationNumber: issue.registrationNumber,
            issueId: issue.issueId,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIssue({ ...issue, status });
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const exportToExcel = () => {
    if (issue) {
      const data = [
        ["Registration Number", "Status", "Issue", "Comments"],
        [
          issue.registrationNumber,
          issue.status,
          issue.issue,
          issue.comments?.join(", ") || "No comments",
        ],
      ];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Placement Issue");
      XLSX.writeFile(workbook, `${issue.registrationNumber}_issue_details.xlsx`);
    }
  };

  if (!issue) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Issue Details</h1>
        <div className="mb-6">
          <p className="text-lg text-gray-700 mb-1">
            <span className="font-semibold">Registration Number: </span>
            {issue.registrationNumber}
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <span className="font-semibold">Name: </span>
            {issue.name}
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <span className="font-semibold">Issue: </span>
            {issue.issue}
          </p>
          <p className="text-lg text-gray-700 mb-1">
            <span className="font-semibold">companyName: </span>
            {issue.companyName}
          </p>
          <p
            className={`text-lg font-semibold ${
              issue.status === "resolved"
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            Status: {issue.status}
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">Update Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleStatusUpdate}
            className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Update Status
          </button>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">Add Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleCommentUpdate}
            className="mt-4 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            Add Comment
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={exportToExcel}
            className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-900 focus:ring-2 focus:ring-gray-500"
          >
            Export to Excel
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {issue.comments?.length ? (
            issue.comments.map((comm, i) => (
              <li key={i} className="text-sm text-gray-700 border-b pb-2">{comm}</li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default IssueDetails;
