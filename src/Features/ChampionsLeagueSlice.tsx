import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Match {
  id: string;
  homeTeam: { name: string; crest: string };
  awayTeam: { name: string; crest: string };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  competition: { name: string };
}

interface ChampionsLeagueState {
  matches: Match[];
  favorites: string[]; // Массив для хранения избранных матчей
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChampionsLeagueState = {
  matches: [],
  favorites: [],
  status: 'idle',
  error: null,
};

// Асинхронный запрос для получения матчей Лиги Чемпионов
export const fetchChampionsLeagueMatches = createAsyncThunk(
  'championsLeague/fetchMatches',
  async () => {
    const response = await fetch('https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/competitions/CL/matches', {
      headers: {
        'X-Auth-Token': 'eb16e5405a3a4d9abbbab2bec5714189',
      },
    });
    const data = await response.json();
    return data.matches;
  }
);

const championsLeagueSlice = createSlice({
  name: 'championsLeague',
  initialState,
  reducers: {
    // Редьюсер для добавления/удаления матчей из избранного
    toggleFavorite: (state, action) => {
      const matchId = action.payload;
      if (state.favorites.includes(matchId)) {
        state.favorites = state.favorites.filter((id) => id !== matchId); // Удалить из избранных
      } else {
        state.favorites.push(matchId); // Добавить в избранное
      }
    },
  },
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

export const { toggleFavorite } = championsLeagueSlice.actions;

export default championsLeagueSlice.reducer;
