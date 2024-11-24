import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
}

export interface Score {
  home: number | null;
  away: number | null;
}

export interface PremierLeagueMatch {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    fullTime: Score;
  };
}

export interface PremierLeagueState {
  matches: PremierLeagueMatch[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PremierLeagueState = {
  matches: [],
  status: 'idle',
  error: null,
};

export const fetchPremierLeagueMatches = createAsyncThunk<PremierLeagueMatch[], void>(
  'premierLeague/fetchMatches',
  async () => {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/PL/matches',
      {
        headers: {
          'X-Auth-Token': 'eb16e5405a3a4d9abbbab2bec5714189',
        },
      }
    );
    const data = await response.json();
    return data.matches;
  }
);

const premierLeagueSlice = createSlice({
  name: 'premierLeague',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPremierLeagueMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPremierLeagueMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchPremierLeagueMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch matches';
      });
  },
});

export default premierLeagueSlice.reducer;
