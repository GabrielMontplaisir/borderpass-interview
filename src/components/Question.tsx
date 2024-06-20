import { Box } from "@mui/material";
import QuestionType from "../lib/types/question";

interface QuestionProps {
  question: QuestionType;
}

export const Question = ({ question }: QuestionProps) => {
  return (
    <Box>
      <p>{question.id}</p>
      <p>{question.type}</p>
      <p>{question.question}</p>
      <p>{question.mandatory}</p>
      <p>{question.hint}</p>
    </Box>
  );
};

export default Question;
