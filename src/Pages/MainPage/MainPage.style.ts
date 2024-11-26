import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.containerBackground}; /* Цвет фона зависит от темы */
  position: relative;
  flex-direction: row;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

export const Navbar = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.navbarBackground}; /* Цвет фона зависит от темы */
  color: ${({ theme }) => theme.navbarTextColor}; /* Цвет текста зависит от темы */
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 200px;
    left: ${({ isOpen }) => (isOpen ? '0' : '-200px')};
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
  color: ${({ theme }) => theme.navItemColor}; /* Цвет текста зависит от темы */

  &:first-child {
    margin-top: 50px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.navItemHoverBackground}; /* Цвет фона при наведении зависит от темы */
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  margin-left: 0;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.cardBackground}; /* Цвет фона карточки зависит от темы */
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 330px;
    margin: 20px auto;
    padding: 10px;
  }
`;

export const TeamName = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const Score = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.scoreColor}; /* Цвет счета зависит от темы */

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: ${({ theme }) => theme.toggleButtonBackground}; /* Цвет кнопки зависит от темы */
  color: ${({ theme }) => theme.toggleButtonTextColor}; /* Цвет текста кнопки зависит от темы */
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: ${({ theme }) => theme.toggleButtonHoverBackground}; /* Цвет при наведении зависит от темы */
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    padding: 8px 12px;
  }
`;

export const LeagueListWrapper = styled.div`
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-top: 20px;
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
  color: ${({ theme }) => theme.logoColor}; /* Цвет логотипа зависит от темы */
  margin-bottom: 20px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const LoadingGif = styled.img`
  width: 100px;
  height: 100px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const IconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.iconPlaceholderBackground};
  margin-right: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.iconPlaceholderColor};
`;

export const LeagueName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.leagueNameColor};
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  display: block;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const MatchDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.matchDetailsBackground};
  border-radius: 8px;
  margin-top: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TeamLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

export const ThemeToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.buttonBackground};  /* Цвет фона кнопки зависит от темы */
  color: ${({ theme }) => theme.buttonColor};  /* Цвет текста кнопки зависит от темы */
  border: none;
  border-radius: 50%;
  padding: 8px 12px;  /* Уменьшаем размеры кнопки */
  cursor: pointer;
  font-size: 14px;
  z-index: 1000;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHoverBackground};  /* Цвет фона при наведении */
  }
`;