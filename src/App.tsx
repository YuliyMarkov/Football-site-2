import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MainPage from "./Pages/MainPage/MainPage";
import RegistrationPage from "./Pages/RegistrationPage/RegistrationPage";
import ChampionsLeague from "./Pages/ChampionsLeague/ChampionsLeague";
import Bundesliga from "./Pages/Bundesliga/Bundesiga";
import EuropaLeague from "./Pages/EuropaLeague/EuropaLeague";
import SerieA from "./Pages/SerieA/SerieA";
import PremierLeague from "./Pages/PremierLeague/PremierLeague";
import LaLiga from "./Pages/LaLiga/LaLiga";
import FavoriteMatches from "./Pages/FavorireMatches/FavoriteMatches";
import store from "./Store/Store";

function App() {
  const [loginError, setLoginError] = useState<string>("");
  const [registrationError, setRegistrationError] = useState<string>("");

  const handleLoginError = (message: string) => {
    setLoginError(message);
  };

  const handleRegisterError = (message: string) => {
    setRegistrationError(message);
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                onLoginError={handleLoginError}
                errorMessage={loginError}
              />
            }
          />
          <Route
            path="/register"
            element={
              <RegistrationPage
                onRegister={handleRegisterError}
                errorMessage={registrationError}
              />
            }
          />
          <Route path="/main" element={<MainPage />} />
          <Route path="/champsleague" element={<ChampionsLeague />} />
          <Route path="/bundesliga" element={<Bundesliga />} />
          <Route path="/europaleague" element={<EuropaLeague />} />
          <Route path="/seriea" element={<SerieA />} />
          <Route path="/premierleague" element={<PremierLeague />} />
          <Route path="/laliga" element={<LaLiga />} />
          <Route path="/favorite" element={<FavoriteMatches />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
