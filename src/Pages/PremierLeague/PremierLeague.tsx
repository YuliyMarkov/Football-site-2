// PremierLeague.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPremierLeagueMatches } from '../../Features/PremierLeagueSlice';
import { RootState } from '../../Store/Store';
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
  LoadingContainer
} from './PremierLeague.style';

interface MatchWithEmblems {
  id: number;
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  score: { fullTime: { home: number | null; away: number | null } };
}

function PremierLeague() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();

  const { matches, status, error } = useSelector((state: RootState) => state.premierLeague);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPremierLeagueMatches());
    }
  }, [dispatch, status]);

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
          <img src="./Premier_League.png" alt="Premier League" width="350" height="auto" />
        </LogoPlaceholder>

        <MatchList>
          {status === 'loading' && (
            <LoadingContainer>
              <LoadingGif src="/Ball.gif" alt="Loading..." />
            </LoadingContainer>
          )}
          {status === 'failed' && <div>Error: {error}</div>}
          {status === 'succeeded' &&
            matches.map((match: MatchWithEmblems) => (
              <Card key={match.id}>
                <TeamName>
                  <img src={match.homeTeam.crest} alt={match.homeTeam.name} width="30" height="30" style={{ marginRight: '10px' }} />
                  {match.homeTeam.name}
                </TeamName>
                <Score>
                  {match.score.fullTime.home !== null && match.score.fullTime.away !== null
                    ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                    : 'Not Available'}
                </Score>
                <TeamName>
                  {match.awayTeam.name}
                  <img src={match.awayTeam.crest} alt={match.awayTeam.name} width="30" height="30" style={{ marginLeft: '10px' }} />
                </TeamName>
              </Card>
            ))}
        </MatchList>
      </ContentArea>
    </Container>
  );
}

export default PremierLeague;
