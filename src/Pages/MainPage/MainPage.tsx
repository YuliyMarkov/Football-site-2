import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Features/MatchesSlice';
import { RootState } from '../../Store/Store';

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
  margin-left: 100px;
`;

const Card = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeagueName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
  text-align: center;
`;

const MatchDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
  text-align: center;
  flex: 1;
`;

const TeamLogo = styled.img`
  width: 30px;
  height: 30px;
  padding: 10px;
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
  align-items: center;
  height: 100%;
`;

function MainPage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const dispatch = useDispatch();
  const matches = useSelector((state: RootState) => state.matches.matches);
  const matchStatus = useSelector((state: RootState) => state.matches.status);

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [dispatch, matchStatus]);

  return (
    <Container>
      <ToggleButton onClick={() => setIsNavbarOpen((prev) => !prev)}>
        {isNavbarOpen ? 'Close' : 'Menu'}
      </ToggleButton>

      <Navbar isOpen={isNavbarOpen}>
        <NavItem to="/champsleague">
          <IconPlaceholder><img src="./public/img/Champions_League.png" alt="Champions League" /></IconPlaceholder>
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
          {matchStatus === 'loading' && (
            <LoadingContainer>
              <LoadingGif src="/Ball.gif" alt="Loading..." />
            </LoadingContainer>
          )}
          {matchStatus === 'failed' && <p>Error loading matches. Please try again later.</p>}
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
                    {match.score.fullTime.home ?? '-'} : {match.score.fullTime.away ?? '-'}
                  </Score>
                  <TeamName>
                    {match.awayTeam.name}
                    <TeamLogo src={match.awayTeam.crest} alt={match.awayTeam.name} />
                  </TeamName>
                </MatchDetails>
              </Card>
            ))}
        </MatchList>
      </ContentArea>
    </Container>
  );
}

export default MainPage;
