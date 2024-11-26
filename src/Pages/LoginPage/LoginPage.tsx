// LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
  LinkText,
} from './LoginPage.style';

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
