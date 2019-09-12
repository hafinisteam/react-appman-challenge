import produce from "immer";
import { createAction } from "../helper";

const ADD_POKEMON = "ADD_POKEMON";
const REMOVE_POKEMON = "REMOVE_POKEMON";

export const addPokemon = pokemon => createAction(ADD_POKEMON, { pokemon });
export const removePokemon = id => createAction(REMOVE_POKEMON, { id });

const initialState = {
  currentPokemon: []
};

export const getPokedex = state => state.pokedex.currentPokemon;

const reducer = produce((draft, { payload, type }) => {
  switch (type) {
    case ADD_POKEMON:
      draft.currentPokemon.push(payload.pokemon);
      return;
    case REMOVE_POKEMON:
      draft.currentPokemon = draft.currentPokemon.filter(i => i.id !== payload.id);
      return;
    default:
      return draft;
  }
}, initialState);

export default reducer;
