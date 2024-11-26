// LoginPage.styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;

  @media (max-width: 768px) {
    padding: 20px; /* Добавлены отступы для мобильных устройств */
  }
`;

export const Form = styled.form`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%; /* Форму делаем на всю ширину */
    max-width: 400px; /* Ограничиваем максимальную ширину */
    padding: 20px; /* Меньше отступов */
  }
`;

export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 14px; /* Уменьшаем размер шрифта на мобильных */
  }
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    font-size: 14px; /* Уменьшаем размер шрифта на мобильных */
    padding: 10px; /* Меньше отступы */
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px; /* Уменьшаем размер шрифта на мобильных */
  }
`;

export const LinkText = styled(Link)`
  color: #007bff;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 12px; /* Уменьшаем размер шрифта на мобильных */
  }
`;