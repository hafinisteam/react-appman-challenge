import produce from "immer";
import { createAction } from "./helper";

const ADD_POKEMON = "ADD_POKEMON";
const REMOVE_POKEMON = "REMOVE_POKEMON";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = createAction(OPEN_MODAL)
export const closeModal = createAction(CLOSE_MODAL)

const initialState = {
  pokedexList: [],
  myPokemon: [],
  modalOpen: false
};

export const getPokemonList = (state) => state.pokedexList;
export const getMyPokemon = (state) => state.myPokemon;
export const getModalState = (state) => state.modalOpen;

const reducer = produce((draft, { payload, type }) => {
  switch (type) {
    case ADD_POKEMON:
      draft.myPokemon.push(payload.pokemon);
      return;
    case REMOVE_POKEMON:
      draft.filter(i => i.id !== payload.id);
      return;
    case OPEN_MODAL:
      draft.modalOpen = true;
      return;
    case CLOSE_MODAL:
      draft.modalOpen = false;
      return;
    default:
      return draft;
  }
}, initialState);

export default reducer;
