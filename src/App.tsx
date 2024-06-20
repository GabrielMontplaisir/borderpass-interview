import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import questionData from "./data/questionList.json";
import QuestionType from "./lib/types/question";
import Question from "./components/Question";
import axios from "axios";

export default function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    // Mock API retrieval of questions from server
    // getQuestions();

    // Alternatively, get the questions from local JSON file.
    setQuestions(questionData);
    setIsLoading(false);
  }, []);

  // If retrieving questions from the server
  // const getQuestions = async () => {
  //   await axios
  //     .get("http://localhost:3001/questions")
  //     .then((response) => {
  //       setQuestions(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching questions: ", error);
  //     });

  //   setIsLoading(false);
  // };

  // Validate answers
  const validateQuestion = (index: number, value?: string | string[]) => {
    const question = questions[index];
    const answer = value || answers[question.id] || "";

    if (question.mandatory && !answer) {
      setValidationError("This field is required");
      return false;
    } else if (
      question.type === "email" &&
      !/\S+@\S+\.\S+/.test(answer as string)
    ) {
      setValidationError("Invalid email address");
      return false;
    }

    if (validationError) setValidationError("");
    return true;
  };

  // Handle button clicks
  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      validateQuestion(questionIndex - 1);
    }
  };

  const handleNext = () => {
    if (validateQuestion(questionIndex)) setQuestionIndex(questionIndex + 1);
  };

  // Handle Form Submission to Express Server using Axios
  const handleSubmit = async () => {
    await axios
      .post("http://localhost:3001/submit", answers)
      .then((response) => {
        console.log("Submission response: ", response.data);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.log("Error submitting form: ", error);
        setErrorMessage("Error submitting form. Please try again.");
      });
  };

  // Set answer for each question
  const handleAnswerChange = (id: number, answer: string | string[]) => {
    setAnswers({ ...answers, [id]: answer });
  };

  if (isLoading) {
    return <CircularProgress size={60} sx={{ color: "white" }} />;
  }

  return (
    <>
      <h1 className="title">BorderPass Onboarding</h1>
      <Container maxWidth="sm" className="container">
        <h2 className="subtitle">Let's get you started!</h2>
        <p className="instructions">
          Answer the following questions to get started
        </p>
        <FormControl fullWidth>
          {questions.length > 0 && (
            <Question
              key={questions[questionIndex].id}
              question={questions[questionIndex]}
              onAnswerChange={handleAnswerChange}
              answer={answers[questions[questionIndex].id]}
              validateQuestion={validateQuestion}
              validationError={validationError}
            />
          )}
          <Box sx={{ ml: "auto" }}>
            {questionIndex !== 0 && <Button onClick={handleBack}>Back</Button>}
            {questionIndex !== questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!!validationError}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} variant="contained">
                Submit
              </Button>
            )}
          </Box>
        </FormControl>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}>
          <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
            Form submitted successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={5000}
          onClose={() => setErrorMessage("")}>
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      </Container>
    </>
  );
}
