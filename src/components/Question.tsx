import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import QuestionType from "../lib/types/question";
import { countries } from "../data/countries";
import { useState } from "react";

interface QuestionProps {
  question: QuestionType;
  answer: string | string[];
  onAnswerChange: (id: number, answer: string | string[]) => void;
  validateQuestion: (index: number, value?: string) => boolean;
  validationError: string;
}

export const Question = ({
  question,
  answer,
  onAnswerChange,
  validateQuestion,
  validationError,
}: QuestionProps) => {
  const [checkedList, setCheckedList] = useState<string[]>(
    (answer as string[]) || []
  );

  // Handle Checklist changes
  const handleChecklist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedList = e.target.checked
      ? [...checkedList, e.target.name]
      : checkedList.filter((item) => item !== e.target.name);

    setCheckedList(updatedList);
    onAnswerChange(question.id, updatedList);
  };

  // Handle text input changes
  const handleChange = (e: any) => {
    validateQuestion(question.id - 1, e.target.value);
    onAnswerChange(question.id, e.target.value);
  };

  return (
    <Box sx={{ mb: 8 }}>
      <p className="question_label">
        {question.question}{" "}
        {question.mandatory && <span className="required">(required)</span>}
      </p>
      {(question.type === "text" || question.type === "email") && (
        <TextField
          fullWidth
          label={question.hint}
          name={question.name}
          type={question.type}
          onChange={handleChange}
          error={!!validationError}
          helperText={validationError}
          value={answer ? answer : ""}
        />
      )}
      {question.type === "country" && (
        <>
          <Select
            displayEmpty
            onChange={handleChange}
            name={question.name}
            value={answer ? answer : ""}
            error={!!validationError}
            fullWidth>
            <MenuItem disabled value="">
              <em>{question.hint}</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.countryCode} value={country.countryCode}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!validationError}>
            {validationError}
          </FormHelperText>
        </>
      )}
      {question.type === "checkbox" && (
        <FormGroup>
          {question.options &&
            question.options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    name={option.toLowerCase()}
                    onChange={handleChecklist}
                    checked={checkedList.includes(option.toLowerCase())}
                  />
                }
                label={option}
              />
            ))}
        </FormGroup>
      )}
      {question.type === "radio" && (
        <>
          <RadioGroup name={question.name}>
            {question.options &&
              question.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option.toLowerCase()}
                  checked={answer === option.toLowerCase()}
                  onChange={handleChange}
                  control={<Radio />}
                  label={option}
                />
              ))}
          </RadioGroup>
          <FormHelperText error={!!validationError}>
            {validationError}
          </FormHelperText>
        </>
      )}
    </Box>
  );
};

export default Question;
