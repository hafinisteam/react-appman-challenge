import React from "react";
import Header from "./components/presentation/Header";
import MyPokedex from "./components/container/MyPokedex";
import Modal from "./components/presentation/Modal";

const Root = () => {
  return (
    <React.Fragment>
      <Header title="My pokedex" />
      <MyPokedex />
      <Modal />
    </React.Fragment>
  );
};

export default Root;
