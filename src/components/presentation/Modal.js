import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  getModalOpen,
  getModalContent,
  closeModal
} from "../../reducers/modalReducer";
import { COLORS_APP } from "../../colors";

const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${COLORS_APP.modalOutside};
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${props => (props.open ? "flex" : "none")};
`;

const ModalInner = styled.div`
  background: ${COLORS_APP.modalContentBackground};
  box-shadow: 0px 0px 1px 1px ${COLORS_APP.modalContentBoxShadow};
  width: 92%;
  height: 92%;
  overflow: auto;
  border-radius: 5px;
  border: 1px solid #444;
  padding: 10px;
`;

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, []);
}

const Modal = props => {
  const ref = useRef();

  useOnClickOutside(ref, () => props.closeModal());

  return (
    <ModalWrapper open={props.open}>
      <ModalInner ref={ref}>{props.content()}</ModalInner>
    </ModalWrapper>
  );
};

export default connect(
  state => ({
    open: getModalOpen(state),
    content: getModalContent(state)
  }),
  {
    closeModal
  }
)(Modal);
