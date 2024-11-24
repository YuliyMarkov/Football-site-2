// src/pages/LoginPage/LoginPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

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
  background-color: #007bff;
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
  color: #007bff;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function LoginPage({ onLoginError, errorMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      navigate('/main');
    } else {
      onLoginError('Invalid login credentials');  
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Login</Button>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}  {/* Показ ошибки */}

        {/* Гиперссылка для перехода на страницу регистрации */}
        <LinkText to="/register">Don't have an account yet? Register!</LinkText>
      </Form>
    </Container>
  );
}

export default LoginPage;
