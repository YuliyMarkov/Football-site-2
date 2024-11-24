import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Match {
  id: number;
  team1: string;
  team2: string;
  score: string;
}

interface ChampionsLeagueState {
  matches: Match[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChampionsLeagueState = {
  matches: [],
  status: 'idle',
  error: null,
};

export const fetchChampionsLeagueMatches = createAsyncThunk(
  'championsLeague/fetchMatches',
  async () => {
    const response = await fetch('https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/CL/matches',
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

const championsLeagueSlice = createSlice({
  name: 'championsLeague',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampionsLeagueMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChampionsLeagueMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchChampionsLeagueMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load matches';
      });
  },
});

export default championsLeagueSlice.reducer;
