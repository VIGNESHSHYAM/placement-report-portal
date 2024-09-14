// pages/admin/login.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '../../../lib/apiService';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import img from '@/app/Srmseal.png';
import logo from '@/app/images.png';

const AdminLogin = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginAdmin({ registrationNumber, password });
      if (data.result) {
        localStorage.setItem('adminToken', data.result.data.token);
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Admin login failed:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Placement Issue Portal</title>
      </Head>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" className="flex items-center">
              <Image
                src={img}
                className="mr-2 h-6 sm:h-9"
                alt="SRM Logo"
                width={40}
                height={90}
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-700">
                SRM UNIVERSITY
              </span>
            </Link>
          </div>
        </nav>
      </header>
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center p-8">
              <Image src={logo} width={185} height={185} alt="logo" />
              <h4 className="mt-4 mb-6 text-2xl font-bold text-center text-indigo-600">
                PLACEMENT ISSUE PORTAL
              </h4>
              <form className="w-full" onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    type="text"
                    id="registrationNumber"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-black"
                    placeholder="Admin Registration Number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    id="password"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-black"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    className="w-full p-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200 flex justify-center items-center"
                    type="submit"
                    disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 16a4 4 0 100-8 4 4 0 000 8z"
                            ></path>
                          </svg>
                          Logging in...
                        </>
                      ) : (
                        "Log in"
                      )}
                    </button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center bg-gradient-to-r from-indigo-700 to-indigo-500 text-white p-8 rounded-r-lg">
              <div>
                <h4 className="mb-4 text-2xl font-bold">What is Placement Issue Portal?</h4>
                <p className="text-lg">
                  Placement Issue Portal provides a seamless platform for students to raise concerns and issues
                  related to college placements. Connect with faculty and ensure your voice is heard effectively,
                  making the placement process smoother and more transparent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
