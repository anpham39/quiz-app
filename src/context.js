import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const categoriesTable = {
  generalKnowledge: 9,
  books: 10,
  films: 11,
  music: 12,
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";

const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "generalKnowledge",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    try {
      setLoading(true);
      setWaiting(false);
      const response = await axios.get(url);
      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          setQuestions(data);
          setError(false);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      if (index >= questions.length - 1) {
        setModalOpen(true);
        return 0;
      } else return oldIndex + 1;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setWaiting(true);
    setCorrect(0);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    if (amount > 50) setError(true);
    else {
      const url = `${API_ENDPOINT}amount=${amount}&category=${categoriesTable[category]}&difficulty=${difficulty}&type=multiple`;
      fetchQuestions(url);
    }
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        quiz,
        questions,
        index,
        correct,
        error,
        modalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
