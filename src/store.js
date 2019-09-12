import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";

import pokedexReducer from "./reducers/pokedexReducer";
import modalReducer from "./reducers/modalReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["pokedex"] // whitelist reducers
};

export const isDevEnv = process.env.NODE_ENV === "development";

const configStore = () => {
  const middlewares = [];

  const rootReducers = combineReducers({
    pokedex: pokedexReducer,
    modal: modalReducer
  });

  if (isDevEnv) {
    middlewares.push(createLogger());
  }

  const pReducer = persistReducer(persistConfig, rootReducers);

  const store = createStore(pReducer, applyMiddleware(...middlewares));
  return store;
};

const store = configStore();

export const persistor = persistStore(store);

export default store;
