"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 
import StyledHorizontalSidebar from '@/components/HorizontalSidebar';
import Sidebar from '@/components/Sidebar';

const PostIssue = () => {
  const [issue, setIssue] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isMobile, setIsMobile] = useState(false); // State to check window size
  const router = useRouter();

  // Function to detect window width
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024); // Set to true for window width less than 1024px (responsive design)
  };

  useEffect(() => {
    // Initial window width check
    handleResize();
    // Add event listener to update on window resize
    window.addEventListener('resize', handleResize);
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testPostPlacementIssue = async (token: string) => {
    try {
      const issueData = {
        issue, // Using state value for issue
        companyName, // Using state value for company name
      };

      const response = await axios.post(
        'http://localhost:4000/trpc/postPlacementIssue',
        issueData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Placement issue posted successfully:', response.data);
      router.push('/User/profile'); 
    } catch (error) {
      console.error('Error posting placement issue:');
      alert('Failed to post the issue. Please try again.');
    }
  };

  const handlePostIssue = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/');
      return;
    }

    if (!issue || !companyName) {
      alert('Please provide both the issue and company name.');
      return;
    }

    await testPostPlacementIssue(token);
  };

  return (
    <div className="flex">
      {/* Render the correct sidebar based on window size */}
      {isMobile ? (
        <StyledHorizontalSidebar />
      ) : (
        <Sidebar />
      )}

      {/* Main content for posting the issue */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Post a Placement Issue
          </h1>

          <input
            type="text"
            className="w-full mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
            placeholder="Describe your issue here"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
          />

          <button
            onClick={handlePostIssue}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Submit Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostIssue;
