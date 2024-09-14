import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import iss from '@/app/6269373692391833002.jpg';
import kk from '@/app/Remove-bg.ai_1725971857908-transformed.png';
import hs from '@/app/verified_17002169.png';

const HorizontalSidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <SidebarContainer>
     
      <MenuContainer>
        <MenuItem
          isActive={pathname === '/User/profile'}
          onClick={() => handleNavigation('/User/profile')}
        >
          <Image src={kk} alt="Profile Icon" width={32} height={32} />
          <ItemText>Profile</ItemText>
        </MenuItem>
        <MenuItem
          isActive={pathname === '/User/post-issue'}
          onClick={() => handleNavigation('/User/post-issue')}
        >
          <Image src={iss} alt="Issue Icon" width={32} height={32} />
          <ItemText>Post Issue</ItemText>
        </MenuItem>
        <MenuItem
          isActive={pathname === '/User/status'}
          onClick={() => handleNavigation('/User/status')}
        >
          <Image src={hs} alt="Status" width={32} height={32} />
          <ItemText>Status</ItemText>
        </MenuItem>
      </MenuContainer>

      <Footer>
        <FooterText>Welcome!</FooterText>
        <FooterText>{typeof window !== 'undefined' ? localStorage.getItem('registrationNumber') : 'Guest'}</FooterText>
      </Footer>
    </SidebarContainer>
  );
};

export default HorizontalSidebar;

const SidebarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: column;
    width: 250px;
    height: 100vh;
    border-right: 1px solid #e0e0e0;
    border-bottom: none;
  }
`;



const MenuContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (min-width: 1024px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
`;

const MenuItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#007bff' : 'transparent')};
  color: ${(props) => (props.isActive ? '#fff' : '#333')};
  border-radius: 5px;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
    width: 100%;
  }
`;

const ItemText = styled.span`
  margin-left: 10px;
  font-size: 14px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;

  @media (min-width: 1024px) {
    margin-top: auto;
    width: 100%;
  }
`;

const FooterText = styled.div`
  font-size: 10px;
`;
