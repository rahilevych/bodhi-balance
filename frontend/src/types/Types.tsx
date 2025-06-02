export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
};
export type Trainer = {
  id: string;
  fullName: string;
  experience: number;
  specialization: string;
  about: string;
  photo: string;
};
export type YogaStyle = {
  id: string;
  title: string;
  image: string;
  duration: number;
  trainer: string;
  description: string;
};
export type Training = {
  id: string;
  datetime: Date;
  duration: number;
  spots_taken: number;
  spots_total: number;
  trainer_id: Trainer;
  yogaStyle_id: YogaStyle;
  type: string;
};
export type QuestionType = {
  id: string;
  question: string;
  answer: string;
};
