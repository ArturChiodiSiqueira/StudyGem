export type StudyRequest = {
  subject: string;
  content: string;
  question_count: number;
  language: string;
};

export type StudyQuestion = {
  question: string;
  answer: string;
};

export type StudyResponse = {
  subject: string;
  summary: string;
  key_points: string[];
  questions: StudyQuestion[];
};
