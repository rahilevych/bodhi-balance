export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  address: string;
  phone: string;
};
export type Trainer = {
  _id: string;
  fullName: string;
  experience: number;
  specialization: string;
  about: string;
  photo: string;
};
export type YogaStyle = {
  _id: string;
  title: string;
  image: string;
  duration: number;
  trainer: string;
  description: string;
};
export type Training = {
  _id: string;
  datetime: Date;
  duration: number;
  spots_taken: number;
  spots_total: number;
  trainer_id: Trainer;
  yogaStyle_id: YogaStyle;
  type: string;
  price: number;
  priceId: string;
};
export type QuestionType = {
  _id: string;
  question: string;
  answer: string;
};
export type Plan = {
  _id: string;
  type: string;
  title: string;
  price: number;
  description: string;
  priceId: string;
};
