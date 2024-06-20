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

interface QuestionProps {
  question: QuestionType;
  onAnswerChange: (id: number, answer: string | string[]) => void;
}

export const Question = ({ question, onAnswerChange }: QuestionProps) => {
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
        />
      )}
      {question.type === "country" && (
        <>
          <Select displayEmpty onChange={handleChange} fullWidth>
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
                control={<Checkbox name={option} />}
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
