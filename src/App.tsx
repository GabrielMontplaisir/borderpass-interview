import { Button, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import questionData from "./data/questionList.json";
import QuestionType from "./lib/types/question";

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
            <>
              <p>{question.id}</p>
              <p>{question.type}</p>
              <p>{question.question}</p>
              <p>{question.mandatory}</p>
              <p>{question.hint}</p>
            </>
          ))}
        <Button>Back</Button>
        <Button variant="contained">Next</Button>
        <Button variant="contained">Submit</Button>
      </Container>
    </>
  );
}
