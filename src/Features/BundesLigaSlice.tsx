import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Типы для матчей Бундеслиги
export interface BundesligaMatch {
  id: number;
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  score: { fullTime: { homeTeam: number | null; awayTeam: number | null } };
}

export interface BundesligaState {
  matches: BundesligaMatch[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BundesligaState = {
  matches: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для загрузки матчей Бундеслиги
export const fetchBundesligaMatches = createAsyncThunk<BundesligaMatch[], void>(
  'bundesliga/fetchMatches',
  async () => {
    const response = await fetch(
      'https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/BL1/matches',
      {
        headers: {
          'X-Auth-Token': 'eb16e5405a3a4d9abbbab2bec5714189', // Ваш API-ключ
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch Bundesliga matches');
    }
    const data = await response.json();
    return data.matches;
  }
);

// Слайс для управления состоянием Бундеслиги
const bundesligaSlice = createSlice({
  name: 'bundesliga',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBundesligaMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBundesligaMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchBundesligaMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch Bundesliga matches';
      });
  },
});

export default bundesligaSlice.reducer;
