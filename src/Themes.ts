import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Navbar = styled.nav<{ isOpen: boolean }>`
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.navbarBackground};
  color: white;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  padding-top: 20px;
`;

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  &:hover {
    background-color: ${({ theme }) => theme.navbarHover};
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background-color: ${({ theme }) => theme.navbarBackground};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

export const ContentArea = styled.div`
  margin-left: 250px;
  padding: 20px;
  flex: 1;
`;

export const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export const Score = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

export const LogoPlaceholder = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;


export const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    navbarBackground: '#f0f0f0',
    navbarHover: '#e0e0e0',
    cardBackground: '#f9f9f9',
  };
  
  export const darkTheme = {
    background: '#121212',
    text: '#ffffff',
    navbarBackground: '#1e1e1e',
    navbarHover: '#333333',
    cardBackground: '#1f1f1f',
  };
  