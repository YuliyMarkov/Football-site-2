import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Match {
  id: number;
  homeTeam: { name: string };
  awayTeam: { name: string };
  score: { fullTime: { homeTeam: number | null; awayTeam: number | null } };
}

export interface EuropaLeagueState {
  matches: Match[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EuropaLeagueState = {
  matches: [],
  status: 'idle',
  error: null,
};

export const fetchEuropaLeagueMatches = createAsyncThunk<Match[], void>(
  'europaLeague/fetchMatches',
  async () => {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/EL/matches',
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

const europaLeagueSlice = createSlice({
  name: 'europaLeague',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEuropaLeagueMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEuropaLeagueMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchEuropaLeagueMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch matches';
      });
  },
});

export default europaLeagueSlice.reducer;
