"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import img from '@/app/Srmseal.png';
import Link from 'next/link';
import Head from 'next/head';
import { format } from 'date-fns';

interface PlacementIssue {
  _id: string;
  issueId: string;
  registrationNumber: string;
  name: string;
  issue: string;
  status: string;
  comments: string[] | undefined;
  createdAt: string;
  companyName:string; // Add this field to capture the issue creation date

}

const AdminDashboard = () => {
  const [issues, setIssues] = useState<PlacementIssue[]>([]);
  const router = useRouter();

const formatDateCustom = (dateString: string) => {
  const timestamp = Date.parse(dateString);
  if (isNaN(timestamp)) {
    console.error(`Invalid date string: ${dateString}`);
    return 'Invalid Date';
  }
  return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
};

  const testReadPlacementIssues = async (token: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/trpc/readPlacementIssues`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const issues = response.data?.result?.data;
        if (Array.isArray(issues)) {
          if (issues.length === 0) {
            console.log('No placement issues found.');
          } else {
            setIssues(issues);
            console.log('Retrieved Placement Issues:', issues);
          }
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } else {
        console.error('Unexpected response:', response.data);
      }
    } catch (error) {
      console.error('Error retrieving placement issues:', error);
    }
  };

  useEffect(() => {
    const fetchIssues = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        await testReadPlacementIssues(token);
      } else {
        router.push('/admin/login');
      }
    };
    fetchIssues();
  }, [router]);

 

 

 
  return (
    <>
      <Head>
        <title>Placement Issue Portal</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.0.0/mdb.min.css" rel="stylesheet" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <header>
          <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-white-800 shadow">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <Link href="/" className="flex items-center">
                <Image
                  src={img}
                  className="mr-2 h-8 sm:h-10"
                  alt="SRM Logo"
                  width={40}
                  height={40}
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-blue-700">
                  SRM UNIVERSITY
                </span>
              </Link>
            </div>
          </nav>
        </header>
  
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 mt-20">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {issues.map((issue) => (
                <div key={issue._id} className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{issue.name}</p>
                    <p className="text-sm text-gray-600">{issue.registrationNumber}</p>
                    <p className="text-sm text-gray-600">{issue.issue}</p>                    
                    <p className="text-sm text-gray-600">{issue.companyName}</p>
                    <div className="mt-6">
    <Link href={`/admin/issue/${issue.issueId}`}>
      <p className="text-blue-500 hover:underline">View Details</p>
    </Link>  </div>
           </div>
                  <p className={`text-sm font-bold ${issue.status === 'resolved' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {issue.status}
                  </p>
                </div>
                   
  <p>
    Posted on: {issue.createdAt ? formatDateCustom(issue.createdAt) : 'Date not available'}
  </p>
</div>
                  
  
  
                
              ))}
            </div>
            
          </div>
        </main>
      </div>
    </>
  );
  
};

export default AdminDashboard;
