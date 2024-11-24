import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fetchEuropaLeagueMatches } from "../../Features/EuropaLeagueSlice";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
  position: relative;
`;

const Navbar = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  width: 250px;
  height: 100%;
  background-color: #007bff;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
  text-decoration: none;
  color: white;

  &:first-child {
    margin-top: 50px;
  }

  &:hover {
    background-color: #1e5a2b;
  }
`;

const IconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  margin-right: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #007bff;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
`;

const MatchList = styled.div`
  width: 600px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TeamName = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const Score = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #0760f0;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: #022c70;
  }
`;

const LogoPlaceholder = styled.div`
  width: 450px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #666;
  margin: 0 auto 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingGif = styled.img`
  width: 100px;
  height: 100px;
`;

function EuropaLeague() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const { matches, status, error } = useSelector((state) => state.europaLeague);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEuropaLeagueMatches());
    }
  }, [dispatch, status]);

  return (
    <Container>
      <ToggleButton onClick={() => setIsNavbarOpen((prev) => !prev)}>
        {isNavbarOpen ? "Close" : "Menu"}
      </ToggleButton>

      <Navbar isOpen={isNavbarOpen}>
        <NavItem to="/main">
          <IconPlaceholder>
            <img src="/img/Logo.png" alt="Main Page" />
          </IconPlaceholder>
          Main Page
        </NavItem>
        <NavItem to="/champsleague">
          <IconPlaceholder>
            <img src="/img/Champions_League.png" alt="Champions League" />
          </IconPlaceholder>
          Champions League
        </NavItem>
        <NavItem to="/europaleague">
          <IconPlaceholder>
            <img src="/img/Europa-League.png" alt="Europa League" />
          </IconPlaceholder>
          Europa League
        </NavItem>
        <NavItem to="/premierleague">
          <IconPlaceholder>
            <img src="/img/Premier_League.png" alt="Premier League" />
          </IconPlaceholder>
          Premier League
        </NavItem>
        <NavItem to="/seriea">
          <IconPlaceholder>
            <img src="/img/Serie_A.png" alt="Serie A" />
          </IconPlaceholder>
          Serie A
        </NavItem>
        <NavItem to="/bundesliga">
          <IconPlaceholder>
            <img src="/img/Bundesliga.png" alt="Bundesliga" />
          </IconPlaceholder>
          Bundesliga
        </NavItem>
        <NavItem to="/laliga">
          <IconPlaceholder>
            <img src="/img/LaLiga.png" alt="LaLiga" />
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
          <img src="/Europa_League.png" alt="Europa League Logo" width="350" />
        </LogoPlaceholder>

        <MatchList>
          {status === "loading" && (
            <LoadingContainer>
              <LoadingGif src="/Ball.gif" alt="Loading..." />
            </LoadingContainer>
          )}
          {status === "failed" && <div>Error: {error}</div>}
          {status === "succeeded" && matches && matches.length > 0 &&
            matches.map((match) => (
              <Card key={match.id}>
                <TeamName>{match.homeTeam.name}</TeamName>
                <Score>
                  {match.score.fullTime.home ?? "-"} : {match.score.fullTime.away ?? "-"}
                </Score>
                <TeamName>{match.awayTeam.name}</TeamName>
              </Card>
            ))}
        </MatchList>
      </ContentArea>
    </Container>
  );
}

export default EuropaLeague;
