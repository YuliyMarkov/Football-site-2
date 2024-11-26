import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Типы для матчей
interface Team {
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
  competition: {
    name: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  isFavorite?: boolean; // Добавим поле для пометки избранных матчей
}

// Изначальное состояние
interface MatchesState {
  matches: Match[]; // Массив с матчами
  favorites: number[]; // Массив с ID матчей в избранном
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MatchesState = {
  matches: [],
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"), // Загружаем избранные матчи из localStorage
  status: "idle",
};

// Асинхронное действие для получения матчей
export const fetchMatches = createAsyncThunk("matches/fetchMatches", async () => {
  const response = await fetch(
    "https://thingproxy.freeboard.io/fetch/https://api.football-data.org/v4/matches",
    {
      headers: {
        "X-Auth-Token": "eb16e5405a3a4d9abbbab2bec5714189", // Ваш токен
      },
    }
  );
  const data = await response.json();
  return data.matches; // Возвращаем данные матчей
});

const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const matchId = action.payload;
      if (state.favorites.includes(matchId)) {
        state.favorites = state.favorites.filter((id) => id !== matchId);
      } else {
        state.favorites.push(matchId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Сохраняем избранные в localStorage
    },
    // Для установки состояния избранных матчей при загрузке
    setFavoriteMatches: (state) => {
      state.matches = state.matches.map((match) => ({
        ...match,
        isFavorite: state.favorites.includes(match.id), // Помечаем матч как избранный, если он в списке favorites
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.matches = action.payload;

        // Обновляем список избранных матчей при получении данных
        state.matches = state.matches.map((match) => ({
          ...match,
          isFavorite: state.favorites.includes(match.id),
        }));
      })
      .addCase(fetchMatches.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { toggleFavorite, setFavoriteMatches } = matchesSlice.actions;

export default matchesSlice.reducer;
