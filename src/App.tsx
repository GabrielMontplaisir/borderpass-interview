import { Button, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import questionData from "./data/questionList.json";
import QuestionType from "./lib/types/question";
import Question from "./components/Question";

export default function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock API retrieval of questions from server
  useEffect(() => {
    setQuestions(questionData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <h1>BorderPass Onboarding</h1>
      <Container>
        <h2 className="subtitle">Let's get you started!</h2>
        <p className="instructions">
          Answer the following questions to get started
        </p>
        {questions.length > 0 &&
          questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        <Button>Back</Button>
        <Button variant="contained">Next</Button>
        <Button variant="contained">Submit</Button>
      </Container>
    </>
  );
}
