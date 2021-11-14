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
    Cookies.set('modalOpenBefore', true , { expires: 7 });
    setModalOpen(true);
  };
  const modalCloseAction = () => {
    setModalOpen(false);
  };

  const [email, setEmail] = useState("");
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const [showEmailError, setShowEmailError] = useState(false);
  const checkForEmail = (e) => {
    function emailIsValid(text){
      return /\S+@\S+.|S+/.test(text)
    }
    if(!emailIsValid(email)) {
      setShowEmailError(true)
    }
    console.log('Checking for Email')
  }
  const removeErrorMessage = (e) => {
    setShowEmailError(false)
    console.log('Removing Error Message')
  }
  const [formCompleted, setFormCompleted] = useState(false)
  const submittedForm =(e) =>{
    e.preventDefault()
    if (showEmailError === false && email.length > 5 ) {
      setFormCompleted(true)
      setTimeout(() => {
        modalCloseAction()
      }, 3000)
    }
  }
  return (
    <StateContext.Provider
      value={{
        modalOpen,
        email,
        handleEmailInput,
        modalOpenAction,
        modalCloseAction,
        checkForEmail,
        showEmailError,
        removeErrorMessage,
        submittedForm,
        formCompleted
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
