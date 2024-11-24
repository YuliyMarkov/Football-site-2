import { configureStore } from '@reduxjs/toolkit';
import championsLeagueReducer from '../Features/ChampionsLeagueSlice'; // Слайс для Лиги Чемпионов
import matchesReducer from '../Features/MatchesSlice'; // Слайс для других лиг
import europaLeagueReducer from '../Features/EuropaLeagueSlice'; // Слайс для Лиги Европы
import bundesligaReducer from '../Features/BundesLigaSlice'; // Слайс для Бундеслиги
import premierLeagueReducer from '../Features/PremierLeagueSlice';
import serieAReducer from '../Features/SerieASlice';
import laLigaReducer from "../Features/LaLigaSlice";


const store = configureStore({
  reducer: {
    championsLeague: championsLeagueReducer, // Лига Чемпионов
    matches: matchesReducer, // Матчи других лиг
    europaLeague: europaLeagueReducer, // Лига Европы
    bundesliga: bundesligaReducer, // Бундеслига
    premierLeague: premierLeagueReducer,
    serieA: serieAReducer,
    laLiga: laLigaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
