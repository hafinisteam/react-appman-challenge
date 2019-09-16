import React from "react";
import styled from "styled-components";
import { COLORS_APP } from "../../colors";

export const ButtonStyled = styled.button`
  color: ${COLORS_APP.bottomBarBackground};
  font-size: 24px;
  font-family: Atma;
  font-weight: 700;
  border: none;
  background: none;
`;

const Button = ({ onClick, children }) => {
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

export default React.memo(Button);
