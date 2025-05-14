export type YogaCardType = {
  id: number;
  title: string;
  image: string;
  duration: number;
  days: string[];
  description: String;
};
export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
};
export type Teacher = {
  id: string;
  fullName: string;
  experience: string;
  specialization: string;
  about: string;
  photo: string;
};
