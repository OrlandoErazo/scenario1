/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Cookies from "js-cookie";

export const StateContext = React.createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export function EMProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalOpenAction = () => {
    Cookies.set("modalOpenBefore", true, { expires: 7 });
    setModalOpen(true);
  };
  const modalCloseAction = () => {
    setModalOpen(false);
  };

  const [email, setEmail] = useState("");
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  return (
    <StateContext.Provider
      value={{
        modalOpen,
        email,
        handleEmailInput,
        modalOpenAction,
        modalCloseAction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
