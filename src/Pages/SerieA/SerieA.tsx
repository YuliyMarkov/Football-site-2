import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSerieAMatches } from "../../Features/SerieASlice"; // Импорт функции загрузки матчей
import styled from "styled-components";
import { Link } from "react-router-dom";

// Стили
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f3f3f3;
  position: relative;
`;

const Navbar = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100%;
  background-color: #007BFF;
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
  text-decoration: none; /* Убирает подчеркивание */
  color: white; /* Белый цвет текста */

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
  margin-left: 100px;
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
  display: flex;
  align-items: center;
  justify-content: center;
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

const LeagueListWrapper = styled.div`
  margin-top: 50px;
`;

const LogoPlaceholder = styled.div`
  width: 450px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #666;
  margin-left: 90px;
  margin-bottom: 20px;
`;

const LoadingGif = styled.img`
  width: 100px;
  height: 100px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

interface MatchWithEmblems {
  id: number;
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  score: { fullTime: { home: number | null; away: number | null } };
}

function SerieA() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();

  const { matches, status, error } = useSelector((state: any) => state.serieA);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSerieAMatches());
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
          <NavItem to="/bundesliga">
            <IconPlaceholder>
              <img src="./public/img/Bundesliga.png" alt="Bundesliga" />
            </IconPlaceholder>
            Bundesliga
          </NavItem>
          <NavItem to="/laliga">
            <IconPlaceholder>
              <img src="./public/img/LaLiga.png" alt="La Liga" />
            </IconPlaceholder>
            La Liga
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
          <img src="./Serie_A.png" alt="Serie A" width="350" height="auto" />
        </LogoPlaceholder>

        <MatchList>
          {status === "loading" && (
            <LoadingContainer>
              <LoadingGif src="/Ball.gif" alt="Loading..." />
            </LoadingContainer>
          )}
          {status === "failed" && <div>Error: {error}</div>}
          {status === "succeeded" &&
            matches.map((match: MatchWithEmblems) => (
              <Card key={match.id}>
                <TeamName>
                  <img
                    src={match.homeTeam.crest}
                    alt={match.homeTeam.name}
                    width="30"
                    height="30"
                    style={{ marginRight: "10px" }}
                  />
                  {match.homeTeam.name}
                </TeamName>
                <Score>
                  {match.score.fullTime.home !== null &&
                  match.score.fullTime.away !== null
                    ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                    : "Not Available"}
                </Score>
                <TeamName>
                  {match.awayTeam.name}
                  <img
                    src={match.awayTeam.crest}
                    alt={match.awayTeam.name}
                    width="30"
                    height="30"
                    style={{ marginLeft: "10px" }}
                  />
                </TeamName>
              </Card>
            ))}
        </MatchList>
      </ContentArea>
    </Container>
  );
}

export default SerieA;