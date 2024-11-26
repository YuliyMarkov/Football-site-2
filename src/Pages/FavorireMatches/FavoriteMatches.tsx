// FavoriteMatches.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import {
  Container,
  Navbar,
  NavItem,
  IconPlaceholder,
  ContentArea,
  MatchList,
  Card,
  TeamInfo,
  TeamLogo,
  TeamName,
  Score,
  ToggleButton,
  LogoPlaceholder,
} from "./FavoriteMatches.style";

function FavoriteMatches() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Получение избранных матчей из обоих slice
  const matches = useSelector((state: RootState) => state.matches.matches);
  const matchesFavorites = useSelector((state: RootState) => state.matches.favorites);
  const championsLeagueMatches = useSelector((state: RootState) => state.championsLeague.matches);
  const championsLeagueFavorites = useSelector((state: RootState) => state.championsLeague.favorites);

  // Объединение избранных матчей
  const favoriteMatches = [
    ...matches.filter((match) => matchesFavorites.includes(match.id)),
    ...championsLeagueMatches.filter((match) => championsLeagueFavorites.includes(match.id)),
  ];

  return (
    <Container>
      <ToggleButton onClick={() => setIsNavbarOpen((prev) => !prev)}>
        {isNavbarOpen ? "Close" : "Menu"}
      </ToggleButton>

      <Navbar isOpen={isNavbarOpen}>
        <NavItem to="/main">
          <IconPlaceholder>
            <img src="./public/img/Logo.png" alt="Main Page" />
          </IconPlaceholder>
          Main Page
        </NavItem>
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
      </Navbar>

      <ContentArea>
        <LogoPlaceholder>
          <img src="/Favorite.png" alt="Logo" width="450" height="auto" />
        </LogoPlaceholder>
        <h1>Favorite Matches</h1>
        {favoriteMatches.length === 0 ? (
          <p>No favorite matches added yet.</p>
        ) : (
          <MatchList>
            {favoriteMatches.map((match) => (
              <Card key={match.id}>
                <TeamInfo>
                  <TeamLogo src={match.homeTeam.crest} alt={match.homeTeam.name} width="40" />
                  <TeamName>{match.homeTeam.name}</TeamName>
                  <Score>
                    {match.score.fullTime.home !== null
                      ? match.score.fullTime.home
                      : "-"}{" "}
                    :{" "}
                    {match.score.fullTime.away !== null
                      ? match.score.fullTime.away
                      : "-"}
                  </Score>
                  <TeamName>{match.awayTeam.name}</TeamName>
                  <TeamLogo src={match.awayTeam.crest} alt={match.awayTeam.name} width="40" />
                </TeamInfo>
              </Card>
            ))}
          </MatchList>
        )}
      </ContentArea>
    </Container>
  );
}

export default FavoriteMatches;  // Этот экспорт нужен, чтобы ошибка была устранена.
