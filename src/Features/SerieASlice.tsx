import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Team {
  id: number;
  name: string;
  crest: string;
}

interface Score {
  fullTime: {
    home: number | null;
    away: number | null;
  };
}

interface Match {
  id: number;
  utcDate: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
}

interface SerieAState {
  matches: Match[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SerieAState = {
  matches: [],
  status: 'idle',
  error: null,
};

// Асинхронное действие для загрузки матчей Serie A
export const fetchSerieAMatches = createAsyncThunk('serieA/fetchMatches', async () => {
  const response = await axios.get('https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/SA/matches', {
    headers: {
      'X-Auth-Token': 'eb16e5405a3a4d9abbbab2bec5714189',
    },
  });
  return response.data.matches.map((match: any) => ({
    id: match.id,
    utcDate: match.utcDate,
    homeTeam: {
      id: match.homeTeam.id,
      name: match.homeTeam.name,
      crest: match.homeTeam.crest,
    },
    awayTeam: {
      id: match.awayTeam.id,
      name: match.awayTeam.name,
      crest: match.awayTeam.crest,
    },
    score: match.score,
  }));
});

const serieASlice = createSlice({
  name: 'serieA',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSerieAMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSerieAMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchSerieAMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch matches';
      });
  },
});

export default serieASlice.reducer;
