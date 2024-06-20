export default interface QuestionType {
  id: number;
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
