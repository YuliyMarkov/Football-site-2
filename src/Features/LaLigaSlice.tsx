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

export interface LaLigaMatch {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    fullTime: Score;
  };
}

export interface LaLigaState {
  matches: LaLigaMatch[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LaLigaState = {
  matches: [],
  status: 'idle',
  error: null,
};

export const fetchLaLigaMatches = createAsyncThunk<LaLigaMatch[], void>(
  'laLiga/fetchMatches',
  async () => {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/PD/matches',
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

const laLigaSlice = createSlice({
  name: 'laLiga',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaLigaMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLaLigaMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchLaLigaMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch matches';
      });
  },
});

export default laLigaSlice.reducer;
