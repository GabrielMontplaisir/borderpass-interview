import { Box } from "@mui/material";
import QuestionType from "../lib/types/question";

interface QuestionProps {
  question: QuestionType;
}

export const Question = ({ question }: QuestionProps) => {
  return (
    <Box>
      <p className="question_label">
        {question.question}{" "}
        {question.mandatory && <span className="required">(required)</span>}
      </p>
    </Box>
  );
};

export default Question;
