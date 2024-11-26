// PremierLeague.styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column; /* Строки вместо колонок на мобильных */
    padding: 20px; /* Отступы для мобильных */
  }
`;

export const Navbar = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
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
    width: 200px; /* Уменьшаем ширину для мобильных */
    left: ${({ isOpen }) => (isOpen ? '0' : '-200px')}; /* Закрываем меню на мобильных устройствах */
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

  &:hover {
    background-color: #1e5a2b;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Уменьшаем размер шрифта на мобильных */
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
  align-items: center;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    align-items: stretch; /* На мобильных выравниваем по ширине */
    padding: 10px; /* Меньше отступов */
  }
`;

export const MatchList = styled.div`
  width: 600px;
  margin-left: 100px;

  @media (max-width: 768px) {
    width: 100%; /* На мобильных устройствах будет занимать всю ширину */
    margin-left: 0; /* Убираем отступ слева */
  }
`;

export const Card = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 330px; /* Уменьшаем максимальную ширину на мобильных */
    margin: 20px auto; /* Центрируем с отступами */
    padding: 10px; /* Уменьшаем padding на мобильных */
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
    font-size: 16px; /* Уменьшаем размер шрифта на мобильных */
    margin-bottom: 10px; /* Добавляем отступ между командами */
  }
`;

export const Score = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;

  @media (max-width: 768px) {
    font-size: 18px; /* Уменьшаем размер шрифта на мобильных */
  }
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
    top: 10px; /* Меньше отступ сверху */
    left: 10px; /* Меньше отступ слева */
    padding: 8px 12px; /* Меньше padding */
  }
`;

export const LeagueListWrapper = styled.div`
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-top: 20px; /* Меньше отступ сверху на мобильных */
  }
`;

export const LogoPlaceholder = styled.div`
  width: 450px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #666;
  margin-left: 90px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%; /* Логотип будет занимать всю ширину на мобильных */
    margin-left: 0; /* Убираем отступ слева */
    text-align: center; /* Текст по центру */
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
