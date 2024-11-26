// RegistrationPage.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Form,
  Input,
  Button,
  ErrorMessage,
  LinkText
} from './RegistrationPage.style';

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
