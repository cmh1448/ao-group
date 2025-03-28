import { ApplicatorType } from "@/stores/ApplicationStore.ts";

export interface SurveyAnswer {
  question: string;
  answer: number;
}

export interface FormModel {
  name: string;
  studentId: string;
  applicatorType: ApplicatorType;
  surveyResponses: SurveyAnswer[];
}
