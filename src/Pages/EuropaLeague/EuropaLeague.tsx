// EuropaLeague.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  LogoPlaceholder,
  LoadingContainer,
  LoadingGif,
} from './EuropaLeague.style';
import { fetchEuropaLeagueMatches } from '../../Features/EuropaLeagueSlice';

function EuropaLeague() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const { matches, status, error } = useSelector((state: any) => state.europaLeague);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEuropaLeagueMatches());
    }
  }, [dispatch, status]);

  return (
    <Container>
      <ToggleButton onClick={() => setIsNavbarOpen((prev) => !prev)}>
        {isNavbarOpen ? 'Close' : 'Menu'}
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
            <img src="/public/img/favorites.png" alt="Favorite" />
          </IconPlaceholder>
          Favorite Matches
        </NavItem>
      </Navbar>

      <ContentArea>
        <LogoPlaceholder>
          <img src="/Europa_League.png" alt="Europa League Logo" width="350" />
        </LogoPlaceholder>

        <MatchList>
          {status === 'loading' && (
            <LoadingContainer>
              <LoadingGif src="/Ball.gif" alt="Loading..." />
            </LoadingContainer>
          )}
          {status === 'failed' && <div>Error: {error}</div>}
          {status === 'succeeded' && matches && matches.length > 0 &&
            matches.map((match: any) => (
              <Card key={match.id}>
                <TeamName>{match.homeTeam.name}</TeamName>
                <Score>
                  {match.score.fullTime.home ?? '-'} : {match.score.fullTime.away ?? '-'}
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
