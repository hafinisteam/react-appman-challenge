import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import PokemonCard from "../presentation/PokemonCard";
import { openModal } from "../../reducers/modalReducer";
import SearchPokemon from "./SearchPokemon";
import { getPokedex, removePokemon } from "../../reducers/pokedexReducer";
import Button from "../presentation/Button";
import BottomBar from "../presentation/BottomBar";

const Container = styled.div`
  height: 100%;
  overflow: auto;
  padding-top: 81px;
  padding-bottom: 100px;
`;

const MyPokedex = props => {
  const { myPokedex, openModal } = props;

  function openSearchModal() {
    openModal(() => <SearchPokemon />);
  }

  // render button function
  function renderRemoveButton(id) {
    return <Button onClick={() => props.removePokemon(id)}>X</Button>;
  }

  return (
    <React.Fragment>
      <Container className="container">
        <div className="row custom-gutter">
          {myPokedex.map(item => (
            <div className="col-6 mb-2" key={item.id}>
              <PokemonCard
                pokemon={item}
                button={() => renderRemoveButton(item.id)}
              />
            </div>
          ))}
        </div>
      </Container>
      <BottomBar handleOpenModal={openSearchModal} />
    </React.Fragment>
  );
};

export default connect(
  state => ({
    myPokedex: getPokedex(state)
  }),
  {
    openModal,
    removePokemon
  }
)(MyPokedex);
