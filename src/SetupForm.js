import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Choose your quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">
              Number of questions (Max 50 questions)
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            />
          </div>

          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={quiz.category}
              onChange={handleChange}
              className="form-input"
            >
              <option value="generalKnowledge">General Knowledge</option>
              <option value="books">Entertainment: Books</option>
              <option value="films">Entertainment: Movies</option>
              <option value="music">Entertainment: Music</option>
              <option value="sports">Sports</option>
              <option value="history">History</option>
              <option value="politics">Politics</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="category">Difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              value={quiz.difficulty}
              onChange={handleChange}
              className="form-input"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {error && (
            <p className="error">
              Can't generate questions, please try different options
            </p>
          )}

          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Start!
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
