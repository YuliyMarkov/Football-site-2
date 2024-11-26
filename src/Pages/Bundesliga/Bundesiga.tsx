import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBundesligaMatches } from "../../Features/BundesLigaSlice";
import {
  Container,
  Navbar,
  NavItem,
  IconPlaceholder,
  ContentArea,
  MatchList,
  Card,
  TeamName,
  Score,
  ToggleButton,
  LeagueListWrapper,
  LogoPlaceholder,
  LoadingGif,
  LoadingContainer,
} from "./Bundesliga.style";

function Bundesliga() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const { matches, status, error } = useSelector((state) => state.bundesliga);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBundesligaMatches());
    }
  }, [dispatch, status]);

  return (
    <Container>
      <ToggleButton onClick={() => setIsNavbarOpen((prev) => !prev)}>
        {isNavbarOpen ? "Close" : "Menu"}
      </ToggleButton>

      <Navbar isOpen={isNavbarOpen}>
        <LeagueListWrapper>
          <NavItem to="/main">
            <IconPlaceholder>
              <img src="./public/img/Logo.png" alt="Main Page" />
            </IconPlaceholder>
            Main Page
          </NavItem>
          <NavItem to="/champsleague">
            <IconPlaceholder>
              <img
                src="./public/img/Champions_League.png"
                alt="Champions League"
              />
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
        </LeagueListWrapper>
      </Navbar>

      <ContentArea>
        <LogoPlaceholder>
          <img src="./bundesliga.png" alt="Logo" width="350" height="auto" />
        </LogoPlaceholder>
        {status === "loading" && (
          <LoadingContainer>
            <LoadingGif src="/Ball.gif" alt="Loading..." />
          </LoadingContainer>
        )}
        {status === "failed" && <div>Error: {error}</div>}
        <MatchList>
          {matches.map((match, index) => (
            <Card key={index}>
              <img
                src={match.homeTeam?.crest || "./default-logo.png"}
                alt={`${match.homeTeam?.name} Logo`}
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
              />
              <TeamName>{match.homeTeam?.name || "Unknown Team"}</TeamName>
              <Score>
                {match.score?.fullTime?.home !== null &&
                match.score?.fullTime?.away !== null
                  ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                  : "TBD"}
              </Score>
              <TeamName>{match.awayTeam?.name || "Unknown Team"}</TeamName>
              <img
                src={match.awayTeam?.crest || "./default-logo.png"}
                alt={`${match.awayTeam?.name} Logo`}
                style={{ width: "40px", height: "40px", marginLeft: "10px" }}
              />
            </Card>
          ))}
        </MatchList>
      </ContentArea>
    </Container>
  );
}

export default Bundesliga;
