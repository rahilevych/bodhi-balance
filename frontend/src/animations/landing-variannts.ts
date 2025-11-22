import { Variants } from 'framer-motion';

export const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
