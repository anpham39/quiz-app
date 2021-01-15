import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  } else if (loading) {
    return <Loading />;
  } else {
    const { question, incorrect_answers, correct_answer } = questions[index];
    let answers = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * 4);
    if (tempIndex === 3) {
      answers.push(correct_answer);
    } else {
      answers.push(answers[tempIndex]);
      answers[tempIndex] = correct_answer;
    }

    return (
      <main>
        <Modal />

        <section className="quiz">
          <p className="correct-answers">
            Correctly answered: {correct}/{index} <br></br> (Total:{" "}
            {questions.length} questions)
          </p>
          <p className="correct-answers"></p>

          <div className="container">
            <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
            <div className="btn-container">
              {answers.map((answer, index) => {
                return (
                  <button
                    key={index}
                    className="answer-btn"
                    onClick={() => checkAnswer(answer == correct_answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  ></button>
                );
              })}
            </div>
          </div>

          <button className="next-question" onClick={nextQuestion}>
            Next question
          </button>
        </section>
      </main>
    );
  }
}

export default App;
