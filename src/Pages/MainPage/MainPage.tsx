import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches, toggleFavorite } from "../../Features/MatchesSlice";
import { RootState } from "../../Store/Store";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../Themes"; // импортируем темы
import {
  Container,
  Navbar,
  NavItem,
  IconPlaceholder,
  ContentArea,
  MatchList,
  Card,
  LeagueName,
  MatchDetails,
  TeamName,
  Score,
  TeamLogo,
  ToggleButton,
  LogoPlaceholder,
  LoadingGif,
  LoadingContainer,
  ThemeToggleButton, // импортируем кнопку для переключения темы
} from "./MainPage.style";

function MainPage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false); // состояние для темной темы

  const dispatch = useDispatch();
  const matches = useSelector((state: RootState) => state.matches.matches);
  const matchStatus = useSelector((state: RootState) => state.matches.status);
  const favorites = useSelector((state: RootState) => state.matches.favorites);

  useEffect(() => {
    if (matchStatus === "idle") {
      dispatch(fetchMatches());
    }
  }, [dispatch, matchStatus]);

  const handleToggleFavorite = (matchId: number) => {
    dispatch(toggleFavorite(matchId));
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev); // переключаем тему
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <ToggleButton onClick={() => setIsNavbarOpen((prev) => !prev)}>
          {isNavbarOpen ? "Close" : "Menu"}
        </ToggleButton>

        {/* Кнопка переключения темы */}
        <ThemeToggleButton onClick={toggleTheme}>
          {isDarkTheme ? "🌞" : "🌙"}
        </ThemeToggleButton>

        <Navbar isOpen={isNavbarOpen}>
          <NavItem to="/champsleague">
            <IconPlaceholder>
              <img src="./public/img/Champions_League.png" alt="Champions League" />
            </IconPlaceholder>
            Champions League
          </NavItem>
          <NavItem to="/europaleague">
            <IconPlaceholder>
              <img src="./public/img/Europa-League.png" alt="Europa League" />
            </IconPlaceholder>
            Europa League
          </NavItem>
          <NavItem to="/premierleague">
            <IconPlaceholder>
              <img src="./public/img/Premier_League.png" alt="Premier League" />
            </IconPlaceholder>
            Premier League
          </NavItem>
          <NavItem to="/seriea">
            <IconPlaceholder>
              <img src="./public/img/Serie_A.png" alt="Serie A" />
            </IconPlaceholder>
            Serie A
          </NavItem>
          <NavItem to="/bundesliga">
            <IconPlaceholder>
              <img src="./public/img/Bundesliga.png" alt="Bundesliga" />
            </IconPlaceholder>
            Bundesliga
          </NavItem>
          <NavItem to="/laliga">
            <IconPlaceholder>
              <img src="./public/img/LaLiga.png" alt="LaLiga" />
            </IconPlaceholder>
            LaLiga
          </NavItem>
          <NavItem to="/favorite">
            <IconPlaceholder>
              <img src="./public/img/favorites.png" alt="Favorite" />
            </IconPlaceholder>
            Favorite Matches
          </NavItem>
        </Navbar>

        <ContentArea>
          <LogoPlaceholder>
            <img src="/Logo.png" alt="Logo" width="350" height="174" />
          </LogoPlaceholder>
          <MatchList>
            {matchStatus === "loading" && (
              <LoadingContainer>
                <LoadingGif src="/Ball.gif" alt="Loading..." />
              </LoadingContainer>
            )}
            {matchStatus === "failed" && <p>Error loading matches. Please try again later.</p>}
            {matches.length > 0 &&
              matches.map((match) => (
                <Card key={match.id}>
                  <LeagueName>{match.competition.name}</LeagueName>
                  <MatchDetails>
                    <TeamName>
                      <TeamLogo src={match.homeTeam.crest} alt={match.homeTeam.name} />
                      {match.homeTeam.name}
                    </TeamName>
                    <Score>
                      {match.score.fullTime.home !== null
                        ? match.score.fullTime.home
                        : "-"}{" "}
                      :{" "}
                      {match.score.fullTime.away !== null
                        ? match.score.fullTime.away
                        : "-"}
                    </Score>
                    <TeamName>
                      {match.awayTeam.name}
                      <TeamLogo src={match.awayTeam.crest} alt={match.awayTeam.name} />
                    </TeamName>
                  </MatchDetails>
                  <button
                    onClick={() => handleToggleFavorite(match.id)}
                    style={{
                      background: favorites.includes(match.id) ? "gold" : "gray",
                    }}
                  >
                    ★
                  </button>
                </Card>
              ))}
          </MatchList>
        </ContentArea>
      </Container>
    </ThemeProvider>
  );
}

export default MainPage;
