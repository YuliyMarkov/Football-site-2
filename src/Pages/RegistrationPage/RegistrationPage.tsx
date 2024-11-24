// src/pages/RegistrationPage/RegistrationPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

// Определение стилей через styled-components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f3f3;
`;

const Form = styled.form`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const LinkText = styled(Link)`
  color: #007BFF;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function RegistrationPage({ onRegister, errorMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Проверяем, существует ли уже такой email в LocalStorage
    const existingEmail = localStorage.getItem('email');
    if (existingEmail && existingEmail === email) {
      setError('This email is already taken');
      return;
    }

    // Если email не занят, сохраняем данные в localStorage
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('username', username);

    // Вызов функции из Props при успешной регистрации
    onRegister();  // Функция будет выполняться после успешной регистрации

    // Перенаправление на главную страницу
    navigate('/main');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Register</Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}  {/* Отображаем сообщение об ошибке */}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}  {/* Отображаем ошибку от Props */}

        {/* Гиперссылка на страницу входа */}
        <LinkText to="/login">Already registered? Log In!</LinkText>
      </Form>
    </Container>
  );
}

export default RegistrationPage;
