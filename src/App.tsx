import { Button, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import questionData from "./data/questionList.json";
import QuestionType from "./lib/types/question";
import Question from "./components/Question";

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock API retrieval of questions from server
  useEffect(() => {
    setQuestions(questionData);
    setIsLoading(false);
  }, []);

  // Handle button clicks
  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleNext = () => {
    setQuestionIndex(questionIndex + 1);
  };

  // Handle Form Submission
  const handleSubmit = () => {
    console.log("Submitting form data", answers);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <h1 className="title">BorderPass Onboarding</h1>
      <Container maxWidth="sm" className="container">
        <h2 className="subtitle">Let's get you started!</h2>
        <p className="instructions">
          Answer the following questions to get started
        </p>
        {questions.length > 0 && (
          <Question
            key={questions[questionIndex].id}
            question={questions[questionIndex]}
          />
        )}
        {questionIndex !== 0 && <Button onClick={handleBack}>Back</Button>}
        {questionIndex !== questions.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        )}
      </Container>
    </>
  );
}
