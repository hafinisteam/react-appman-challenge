import React from "react";
import styled from "styled-components";
import { COLORS_APP } from "../../colors";
import {
  getHP,
  getStrength,
  getWeakness,
  getHappiness,
  getDamage
} from "../../helper";
import cute from "../../static/cute.png";

const CardStyled = styled.div`
  background-color: ${COLORS_APP.cardBackground};
  box-shadow: 0px 0px 1px 0px ${COLORS_APP.cardBoxShadow};
  padding: 5px 10px;
  padding-right: 30px;
  transition: box-shadow 0.2s ease;
  position: relative;
  
  .card-img {
    flex-basis: 0;
  }
  .card-info {
    flex-basis: 100%;
    padding-top: 5px;
  }
  .card-button{
    position: absolute;
    right: 5px;
    top: 5px;
    display: none;
  }
  &:hover {
    box-shadow: 0px 0px 1px 1px ${COLORS_APP.cardBoxShadowHover};
    .card-button {
      display: block;
    }
  }
`;

const CardImg = styled.img`
  max-width: 130px;
  padding-right: 15px;
`;

const CardName = styled.h3`
  font-family: Gaegu;
  font-size: 26px;
`;

const StateItem = styled.div`
  display: flex;
  width: 100%;
  .stat-label {
    font-family: Atma;
    font-weight: 700;
  }
  .stat-progress {
    flex-basic: 1;
    border-radius: 30px;
    background-color: ${COLORS_APP.levelTubeBackground};
    box-shadow: 1px 1px 1px 0px ${COLORS_APP.levelTubeBoxShadow};
    position: relative;
    &:after {
      position: absolute;
      left: 0;
      top: 0;
      width: ${props => props.statPercent}%;
      height: 100%;
      background-color: ${COLORS_APP.levelTubeValueBackground};
      content: "";
      border-radius: 30px;
    }
  }
`;

const StatHappiness = styled.img`
  max-width: 30px;
  margin-right: 3px;
`;

const State = ({ statName, statPercent }) => {
  return (
    <div className="mb-2">
      <StateItem className="row no-gutters" statPercent={statPercent}>
        <div className="col-3 stat-label">{statName}</div>
        <div className="col-7 stat-progress"></div>
      </StateItem>
    </div>
  );
};

const PokemonCard = ({ pokemon, button }) => {
  const { imageUrl } = pokemon;

  const stat = {
    hp: getHP(pokemon.hp),
    str: getStrength(pokemon.attacks),
    weak: getWeakness(pokemon.weaknesses),
    damage: getDamage(pokemon.attacks),
    level: getHappiness(getHP(pokemon.hp), getDamage(pokemon.attacks), getWeakness(pokemon.weaknesses))
  };
  return (
    <CardStyled>
      <div className="d-flex">
        <div className="card-img">
          <CardImg src={imageUrl} />
        </div>
        <div className="card-info">
          <CardName>{pokemon.name.toUpperCase()}</CardName>
          <State statName="HP" statPercent={stat.hp} />
          <State statName="STR" statPercent={stat.str} />
          <State statName="WEAK" statPercent={stat.weak} />
          <div>
            {[...Array(stat.level)].map((item, index) => (
              <StatHappiness src={cute} key={index} />
            ))}
          </div>
        </div>
      </div>
      {button ? <div className="card-button">{(button())}</div> : null}
    </CardStyled>
  );
};

export default PokemonCard;
