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
export type YogaStyle = {
  id: string;
  title: string;
  image: string;
  duration: number;
  trainer: string;
  description: string;
};
