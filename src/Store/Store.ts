import { configureStore } from "@reduxjs/toolkit";
import championsLeagueReducer from "../Features/ChampionsLeagueSlice";
import europaLeagueReducer from "../Features/EuropaLeagueSlice";
import bundesligaReducer from "../Features/BundesLigaSlice";
import premierLeagueReducer from "../Features/PremierLeagueSlice";
import serieAReducer from "../Features/SerieASlice";
import laLigaReducer from "../Features/LaLigaSlice";
import matchesReducer from "../Features/MatchesSlice"; 

// Создаем Redux Store
const store = configureStore({
  reducer: {
    championsLeague: championsLeagueReducer,
    matches: matchesReducer, 
    europaLeague: europaLeagueReducer,
    bundesliga: bundesligaReducer,
    premierLeague: premierLeagueReducer,
    serieA: serieAReducer,
    laLiga: laLigaReducer,
  },
});

// Тип состояния всего приложения
export type RootState = ReturnType<typeof store.getState>;

// Тип для диспетчера действий
export type AppDispatch = typeof store.dispatch;

// Экспортируем конфигурированный Store
export default store;
