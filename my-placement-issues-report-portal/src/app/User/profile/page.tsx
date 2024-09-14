"use client";
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Head from 'next/head';
import { FaUser, FaEnvelope, FaUniversity, FaPhone, FaGenderless, FaBirthdayCake, FaUserGraduate } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import img from '@/app/Srmseal.png';
import StyledHorizontalSidebar from '@/components/HorizontalSidebar';
import Sidebar from '@/components/Sidebar';
import { useMediaQuery } from 'react-responsive';

interface UserData {
  registrationNumber: string;
  name: string;
  facultyName: string;
  semester: string;
  emailId: string;
  department: string;
  UG_OR_PG: string;
  mobile_number: number;
  Gender: string;
  DOB: string;
  Specialization: string;
  SRMIST_Mail_ID: string;
  alternate_number: number;
  Section: string;
  placementIssue?: string;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/User/login');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('https://auth-portal-2com.onrender.com/trpc/getUserDetails', {
        params: {
          input: JSON.stringify({
            registrationNumber: localStorage.getItem('registrationNumber') || '',
          }),
        },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data.result?.data) {
        setUserData(response.data.result.data);
      } else {
        setError('Failed to load user data. Please try again later.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load user data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const userDetails = useMemo(
    () => userData && [
      { icon: FaUser, label: 'Name', value: userData.name },
      { icon: FaEnvelope, label: 'Email', value: userData.emailId },
      { icon: FaUniversity, label: 'Department', value: userData.department },
      { icon: FaUserGraduate, label: 'Faculty Advisor Name', value: userData.facultyName },
      { icon: FaUserGraduate, label: 'Semester', value: userData.semester },
      { icon: FaUserGraduate, label: 'UG/PG', value: userData.UG_OR_PG },
      { icon: FaPhone, label: 'Mobile Number', value: userData.mobile_number },
      { icon: FaGenderless, label: 'Gender', value: userData.Gender },
      { icon: FaBirthdayCake, label: 'DOB', value: userData.DOB },
      { icon: FaUserGraduate, label: 'Specialization', value: userData.Specialization },
      { icon: FaEnvelope, label: 'SRMIST Mail ID', value: userData.SRMIST_Mail_ID },
      { icon: FaPhone, label: 'Alternate Mobile Number', value: userData.alternate_number },
    ],
    [userData]
  );

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Head>
        <title>Placement Issue Portal</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.0.0/mdb.min.css" rel="stylesheet" />
      </Head>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-white-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" className="flex items-center">
              <Image src={img} className="mr-2 h-6 sm:h-9" alt="SRM Logo" width={40} height={90} />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-blue-700">
                SRM UNIVERSITY
              </span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-64 bg-gray-100 flex flex-col">
          {isLargeScreen ? <Sidebar /> : <StyledHorizontalSidebar />}
        </div>

        <div className="flex-1 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-3">
          <div className="text-center p-5 bg-white rounded-lg shadow-lg max-w-6xl w-full lg:mb-64">
            <h1 className="text-3xl font-bold text-indigo-600 mb-5">Profile</h1>
            {userDetails ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 bg-gray-50 p-6 rounded-lg shadow-inner">
                {userDetails.map(({ icon: Icon, label, value }, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-md shadow">
                    <Icon className="text-indigo-500 mr-3" />
                    <div className="text-left">
                      <div className="font-medium text-gray-600">{label}</div>
                      <div className="text-gray-800">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
