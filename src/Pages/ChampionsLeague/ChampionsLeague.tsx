import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChampionsLeagueMatches, toggleFavorite } from "../../Features/ChampionsLeagueSlice";
import { RootState } from "../../Store/Store";
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
} from "./ChampionsLeague.style";

function ChampionsLeague() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();

  const matches = useSelector((state: RootState) => state.championsLeague.matches);
  const favorites = useSelector((state: RootState) => state.championsLeague.favorites);
  const status = useSelector((state: RootState) => state.championsLeague.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchChampionsLeagueMatches());
    }
  }, [dispatch, status]);

  const handleToggleFavorite = (matchId: string) => {
    dispatch(toggleFavorite(matchId));
  };

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
          <img src="/UEFA_Champions_League.png" alt="Champions League" width="350" height="auto" />
        </LogoPlaceholder>
        {status === "loading" && (
          <LoadingContainer>
            <LoadingGif src="/Ball.gif" alt="Loading..." />
          </LoadingContainer>
        )}
        {status === "failed" && <p>Error loading matches. Please try again later.</p>}
        {matches.length > 0 && (
          <MatchList>
            {matches.map((match) => (
              <Card key={match.id}>
                <LeagueName>{match.competition.name}</LeagueName>
                <MatchDetails>
                  <TeamName>
                    <TeamLogo src={match.homeTeam.crest} alt={match.homeTeam.name} />
                    {match.homeTeam.name}
                  </TeamName>
                  <Score>
                    {match.score.fullTime.home !== null ? match.score.fullTime.home : "-"} :{" "}
                    {match.score.fullTime.away !== null ? match.score.fullTime.away : "-"}
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
        )}
      </ContentArea>
    </Container>
  );
}

export default ChampionsLeague;
