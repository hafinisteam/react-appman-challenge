import produce from "immer";
import { createAction } from "../helper";

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = content => createAction(OPEN_MODAL, { content });
export const closeModal = () => createAction(CLOSE_MODAL);

const initialState = {
  open: false,
  content: () => {}
};

export const getModalOpen = state => state.modal.open;
export const getModalContent = state => state.modal.content;

const reducer = produce((draft, { payload, type }) => {
  switch (type) {
    case OPEN_MODAL:
      draft.open = true;
      draft.content = payload.content;
      return;
    case CLOSE_MODAL:
      draft.open = false;
      draft.content = initialState.content;
      return;
    default:
      return draft;
  }
}, initialState);

export default reducer;
