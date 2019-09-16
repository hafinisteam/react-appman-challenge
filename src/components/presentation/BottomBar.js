import React from "react";
import styled from "styled-components";
import { COLORS_APP } from "../../colors";
import { ButtonStyled } from "./Button";

const FooterStyled = styled.footer`
  background: ${COLORS_APP.bottomBarBackground};
  position: absolute;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
`;

const FooterButton = styled(ButtonStyled)`
  width: 90px;
  height: 90px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  color: white;
  font-family: Atma;
  font-weight: 700;
  font-size: 60px;
  top: -36px;
  background: #ec5656;
`;

const BottomBar = ({ handleOpenModal }) => {
  return (
    <FooterStyled>
      <FooterButton onClick={handleOpenModal}>+</FooterButton>
    </FooterStyled>
  );
};

export default React.memo(BottomBar);
