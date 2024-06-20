import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
  onAnswerChange: (id: number, answer: string | string[]) => void;
  answer: string | string[];
}

export const Question = ({
  question,
  onAnswerChange,
  answer,
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
          type={question.type}
          onChange={handleChange}
          value={answer ? answer : ""}
        />
      )}
      {question.type === "country" && (
        <>
          <Select
            displayEmpty
            onChange={handleChange}
            value={answer ? answer : ""}
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
                    name={option}
                    onChange={handleChecklist}
                    checked={checkedList.includes(option)}
                  />
                }
                label={option}
              />
            ))}
        </FormGroup>
      )}
      {question.type === "radio" && (
        <>
          <RadioGroup>
            {question.options &&
              question.options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  checked={answer === option}
                  onChange={handleChange}
                  control={<Radio />}
                  label={option}
                />
              ))}
          </RadioGroup>
        </>
      )}
    </Box>
  );
};

export default Question;
