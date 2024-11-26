// LaLiga.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLaLigaMatches } from '../../Features/LaLigaSlice';
import {
  Container,
  Navbar,
  LeagueListWrapper,
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
  LoadingGif,
  LoadingContainer,
} from './LaLiga.style';

function LaLiga() {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const dispatch = useDispatch();
  const matches = useSelector((state: any) => state.laLiga.matches);
  const status = useSelector((state: any) => state.laLiga.status);
  const error = useSelector((state: any) => state.laLiga.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLaLigaMatches());
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
          <img src="./LaLiga.png" alt="Logo" width="350" height="auto" />
        </LogoPlaceholder>
        <MatchList>
          {status === 'loading' && (
            <LoadingContainer>
              <LoadingGif src="/Ball.gif" alt="Loading..." />
            </LoadingContainer>
          )}
          {status === 'failed' && <p>Error: {error}</p>}
          {status === 'succeeded' &&
            matches.map((match: any) => (
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

export default LaLiga;
