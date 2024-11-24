import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
  background-color: #001f45;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease-in-out;
`;

const LeagueListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 12px;
  text-decoration: none;
  color: white;
  transition: background-color 0.3s ease, padding-left 0.3s ease;

  &:hover {
    background-color: #003f72;
    padding-left: 30px;
  }
`;

const IconPlaceholder = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const TeamInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TeamLogo = styled.img`
  width: 30px; 
  height: 30px;
  margin-right: 10px; 
`;

const TeamName = styled.div`
  font-size: 18px;
  font-weight: bold;
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
  margin-left: 90px;
  margin-bottom: 20px;
`;

function FavoriteMatches() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const favoriteMatches = useSelector((state: any) => state.favoriteMatches.matches);
  const status = useSelector((state: any) => state.favoriteMatches.status);
  const error = useSelector((state: any) => state.favoriteMatches.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFavoriteMatches());
    }
  }, [status, dispatch]);

  return (
    <Container>
      <ToggleButton onClick={() => setIsNavbarOpen((prev) => !prev)}>
        {isNavbarOpen ? 'Close' : 'Menu'}
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
          <img src="./public/img/Favorite_Matches_Logo.png" alt="Favorites Logo" width="350" height="auto" />
        </LogoPlaceholder>
        <MatchList>
          {status === 'loading' && <p>Loading your favorite matches...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' &&
            favoriteMatches.map((match: any) => (
              <Card key={match.id}>
                <TeamInfo>
                  <TeamLogo src={match.homeTeam.crest} alt={match.homeTeam.name} />
                  <TeamName>{match.homeTeam.name}</TeamName>
                </TeamInfo>
                <Score>
                  {match.score.fullTime.home ?? '-'} : {match.score.fullTime.away ?? '-'}
                </Score>
                <TeamInfo>
                  <TeamName>{match.awayTeam.name}</TeamName>
                  <TeamLogo src={match.awayTeam.crest} alt={match.awayTeam.name} />
                </TeamInfo>
              </Card>
            ))}
        </MatchList>
      </ContentArea>
    </Container>
  );
}

export default FavoriteMatches;
