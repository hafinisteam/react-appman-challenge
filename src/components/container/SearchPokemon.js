import React, { useEffect, useReducer, useMemo } from "react";
import produce from "immer";
import { from, BehaviorSubject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from "rxjs/operators";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";

import { fetchPokemon, createAction, filterPokemonCard } from "../../helper";
import SearchInput from "../presentation/SearchInput";
import PokemonList from "../presentation/PokemonList";
import { getPokedex, addPokemon } from "../../reducers/pokedexReducer";
import SearchType from "../presentation/SearchType";

const initState = {
  loading: false,
  pokemonList: []
};

export const LOADED = "LOADED";
export const LOAD_SUCCES = "LOAD_SUCCES";

export const reducer = produce((draft, { type, payload }) => {
  switch (type) {
    case LOADED:
      draft.loading = true;
      return;
    case LOAD_SUCCES:
      draft.pokemonList = payload.listData;
      draft.loading = false;
      return;
    default:
      return;
  }
});

const search$ = new BehaviorSubject({});

const SearchPokemon = props => {
  const [{ pokemonList, loading }, dispatch] = useReducer(reducer, initState);

  const { currentPokedex, addPokemon } = props;

  const memoPokedex = useMemo(() => {
    return currentPokedex.map(item => item.id);
  }, [currentPokedex]);

  const remainPokemons = checkExistedPokemon(memoPokedex, pokemonList);

  useEffect(() => {
    let searchSub;

    getPokemonList();
    initSearchListener();

    return () => {
      search$.next();
      searchSub.unsubscribe();
    };

    function initSearchListener() {
      searchSub = search$
        .pipe(
          debounceTime(400),
          distinctUntilChanged((prev, current) => isEqual(prev, current)),
          switchMap(query => {
            dispatch(createAction(LOADED));
            return from(fetchPokemon(query)).pipe(map(data => data));
          })
        )
        .subscribe(data => {
          dispatch(
            createAction(LOAD_SUCCES, {
              listData: filterPokemonCard(data.cards)
            })
          );
        });
    }
  }, []);

  async function getPokemonList() {
    dispatch(createAction(LOADED));
    const data = await fetchPokemon();
    const pokemons = filterPokemonCard(data.cards);
    dispatch(createAction(LOAD_SUCCES, { listData: pokemons }));
  }

  function handleSearchPokemon(ev) {
    const name = ev.target.name;
    const query = search$.getValue();
    const nextValue = {
      ...query,
      [name]: ev.target.value
    };
    search$.next(nextValue);
  }

  function handleAddPokedex(pokemon) {
    addPokemon(pokemon);
  }

  function checkExistedPokemon(memoPokedex, dataSource) {
    return dataSource.filter(item => {
      const existed = memoPokedex.findIndex(memo => memo === item.id);
      return existed === -1;
    });
  }

  return (
    <div>
      <div className="mb-2">
        <SearchInput onChange={handleSearchPokemon} />
      </div>
      <div className="mb-4">
        <SearchType onChangeRadio={handleSearchPokemon} />
      </div>
      <PokemonList
        dataSouce={remainPokemons}
        showLoading={loading}
        handleButtonClick={handleAddPokedex}
      />
    </div>
  );
};

export default connect(
  state => ({
    currentPokedex: getPokedex(state)
  }),
  {
    addPokemon
  }
)(SearchPokemon);
