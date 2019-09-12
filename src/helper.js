import qString from "querystring";
import isEmpty from "lodash/isEmpty";
import { API_URL } from "./config";

export const getHP = hp => {
  const val = parseInt(hp, 10);
  return val > 100 ? 100 : val;
};

export const getStrength = attacks => {
  return attacks.length * 50;
};

export const getWeakness = weaknesses => {
  const val = weaknesses.length * 100;
  return val > 100 ? 100 : val;
};

export const createAction = (type, payload = {}) => {
  return { type, payload };
};

export const getDamage = attacks => {
  return attacks.reduce(
    (acc, current) =>
      acc + !isEmpty(current.damage) ? parseInt(current.damage) : 0,
    0
  );
};

export const getHappiness = (hp, damage, weak) => {
  const val = (hp / 10 + damage / 10 + 10 - (weak/100)) / 5;
  return Math.round(val);
};

export function fetchPokemon(query = {}) {
  const queryString = isEmpty(query) ? "" : `&${qString.stringify(query)}`;
  const urlQuery = `${API_URL}/?${queryString}`;
  return fetch(urlQuery)
    .then(res => res.json())
    .catch(err => {
      throw new Error(err);
    });
}

export function filterPokemonCard(cards) {
  return cards.filter(i => i.hasOwnProperty("nationalPokedexNumber"));
}
