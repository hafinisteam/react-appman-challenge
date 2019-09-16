import React from "react";
import styled, { keyframes, css } from "styled-components";
import PokemonCard from "./PokemonCard";
import Button from "./Button";
import noData from "../../static/no-result.png";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const ListStyled = styled.ul`
  min-height: 120px;
  position: relative;

  &:after {
    content: "";
    border: 5px solid #f3f3f3;
    border-top: 5px solid #555;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 2s linear infinite;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30px;
    display: none;
    z-index: 2;
  }
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: rgba(255, 255, 255, 0.6);
    z-index: 1;
    display: none;
  }
  ${props =>
    props.showLoading &&
    css`
      &:after,
      &:before {
        display: block;
      }
    `}
  li {
    margin-bottom: 10px;
  }
`;

const PokemonList = ({ dataSouce, showLoading, handleButtonClick }) => {
  function renderAddBtn(pokemon) {
    return <Button onClick={() => handleButtonClick(pokemon)}>Add</Button>;
  }
  return dataSouce.length > 0 ? (
    <ListStyled>
      {dataSouce.map(item => (
        <li key={item.id}>
          <PokemonCard pokemon={item} button={() => renderAddBtn(item)} />
        </li>
      ))}
    </ListStyled>
  ) : (
    !showLoading && (
      <div className="text-center">
        <img src={noData} alt="no data found" className="w-75" />
      </div>
    )
  );
};

export default React.memo(PokemonList);
