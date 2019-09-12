import React from "react";
import styled from "styled-components";
import { COLORS_APP } from "../../colors";
import searchIcon from "../../static/search.png";

const InputStyled = styled.div`
  border: 3px solid ${COLORS_APP.searchBoxBorder};
  border-radius: 3px;
  position: relative;

  input {
    color: #636363;
    background: none;
    border: none;
    padding: 5px;
    font-family: Gaegu;
    font-size: 26px;
    display: block;
    width: 100%;
    padding-right: 50px;
    padding-left: 10px;
  }

  .search-icon {
    position: absolute;
    right: 0;
    top: 5px;
    width: 40px;
    height: 40px;
  }
`;

const SearchInput = ({ onChange }) => {
  return (
    <InputStyled>
      <input name="name" placeholder="Find Pokemon" onChange={onChange} />
      <img src={searchIcon} className="search-icon" alt='Search icon' />
    </InputStyled>
  );
};

export default SearchInput;
