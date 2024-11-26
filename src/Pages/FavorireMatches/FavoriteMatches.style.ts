import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
  position: relative;
  flex-direction: row; /* Горизонтальное расположение по умолчанию */
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column; /* На мобильных устройствах выравнивание по очереди */
    padding: 20px;
  }
`;

export const Navbar = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background-color: #007bff;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 200px;
    left: ${({ isOpen }) => (isOpen ? "0" : "-200px")};
  }
`;

export const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  text-decoration: none;
  color: white;

  &:first-child {
    margin-top: 50px;
  }

  &:hover {
    background-color: #1e5a2b;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const IconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  margin-right: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #007bff;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; /* Центрируем контент */
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    align-items: stretch;
    padding: 10px;
  }
`;

export const MatchList = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

export const Card = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const TeamName = styled.span`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

export const Score = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  margin: 10px 0;
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #0760f0;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #022c70;
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    padding: 8px 12px;
  }
`;

export const LogoPlaceholder = styled.div`
  width: 100%;
  max-width: 450px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;
