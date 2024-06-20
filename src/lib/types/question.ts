export default interface QuestionType {
  id: number;
  name: string;
  type:
    | "text"
    | "email"
    | "radio"
    | "checkbox"
    | "country"
    | "dropdown"
    | string;
  question: string;
  mandatory: boolean;
  options?: string[];
  hint?: string;
}
