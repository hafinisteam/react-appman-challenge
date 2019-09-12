import React from "react";
import styled from "styled-components";

const HeaderStyled = styled.h1`
  font-size: 50px;
  color: black;
  background: white;
  padding: 10px 0;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  z-index: 2;
  font-family: Atma;
  font-weight: 700;
`;

const Header = ({ title }) => {
  return <HeaderStyled>{title}</HeaderStyled>;
};

export default Header;
