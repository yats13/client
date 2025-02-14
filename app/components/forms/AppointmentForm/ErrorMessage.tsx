import { motion } from 'framer-motion';

type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.p 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="py-2 text-center text-sm text-primary bg-purple rounded-t-3xl w-full"
    >
      {message}
    </motion.p>
  );
} 