import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import srm from '@/app/SRM Logo.png';
import iss from '@/app/6269373692391833002.jpg';
import kk from '@/app/Remove-bg.ai_1725971857908-transformed.png';
import hs from '@/app/verified_17002169.png';

const CustomSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); 

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <StyledSidebar>
      <Menu>
        {/* Logo Section */}
        <StyledLogo>
          <Image src={srm} height={28} width={30} alt="SRM Logo" />
          <h1><b>SRM UNIVERSITY</b></h1>
        </StyledLogo>

        {/* User Section */}
        <StyledSectionTitle>USER</StyledSectionTitle>
        <StyledMenuItem
          icon={<Image src={kk} alt="Profile Icon" width={32} height={29} />}
          isActive={pathname === '/User/profile'}
          onClick={() => handleNavigation('/User/profile')}
        >
          Profile
        </StyledMenuItem>
        <StyledMenuItem
          icon={<Image src={iss} alt="Issue Icon" width={24} height={21} />}
          isActive={pathname === '/User/post-issue'}
          onClick={() => handleNavigation('/User/post-issue')}
        >
          Post Issue
        </StyledMenuItem>
        <StyledMenuItem
          icon={<Image src={hs} alt="Status" width={26} height={24} />}
          isActive={pathname === '/User/status'}
          onClick={() => handleNavigation('/User/status')}
        >
          Status
        </StyledMenuItem>
      </Menu>

      {/* Footer Section */}
      <StyledFooter>
        <div>Welcome!</div>
        <div>{typeof window !== 'undefined' ? localStorage.getItem('registrationNumber') : 'Guest'}</div>
      </StyledFooter>
    </StyledSidebar>
  );
};

export default CustomSidebar;

const StyledSidebar = styled(Sidebar)`
  background-color: #fff;
  color: #333;
  height: 100vh;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;

  /* Responsive layout change */
  @media (max-width: 640px) {
    flex-direction: row;
    height: auto; /* Allow the height to adjust based on content */
    width: 100%;
  }

  @media (min-width: 641px) {
    flex-direction: column;
    width: 250px; /* Sidebar width on larger screens */
  }
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    margin-right: 10px;
  }
  h1 {
    font-size: 18px;
    color: #007bff;
  }

  /* Responsive font size */
  @media (max-width: 640px) {
    h1 {
      font-size: 16px;
    }
  }
`;

const StyledSectionTitle = styled.div`
  margin: 20px 0 10px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: bold;
  color: #777;
  text-transform: uppercase;

  /* Responsive padding and font size */
  @media (max-width: 640px) {
    font-size: 12px;
    padding: 0 15px;
  }
`;

const StyledMenuItem = styled(MenuItem)<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? '#007bff' : 'white')}; /* Highlight active item */
  color: ${(props) => (props.isActive ? '#fff' : '#333')}; /* Adjust text color based on active state */
  cursor: pointer; /* Prevent cursor growing white when clicked */
  user-select: none; /* Disable text selection */
  
  &:hover {
    background-color: #007bff;
    color: black;
  }

  /* No text highlighting on click */
  &:focus {
    outline: none;
  }
`;

const StyledFooter = styled.div`
  margin-top: 419px;
  padding: 20px;
  text-align: center;
  background-color: #007bff; /* Set the background color to blue */
  color: white; /* White text for better contrast */
  
  div {
    font-size: 14px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Adjust font size and padding for smaller screens */
  @media (max-width: 640px) {
    padding: 10px;
    div {
      font-size: 12px;
    }
  }
`;
