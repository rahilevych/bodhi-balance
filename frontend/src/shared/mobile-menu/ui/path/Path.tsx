import { Variants, motion } from 'framer-motion';

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

export const Path = (props: PathProps) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='hsl(0, 0%, 18%)'
    strokeLinecap='round'
    {...props}
  />
);
