import cn from 'classnames';
import { motion } from 'framer-motion';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  type: 'button' | 'submit' | 'reset';
  normalCase?: boolean;
  [key: string]: any;
};

export default function Button({ children, type, className, normalCase, ...props }: ButtonProps) {
  const classes = cn(
    'px-6 py-3 rounded shadow hover:shadow-md focus-visible:ring-2 ring-blue-300 focus-visible:outline-none transition duration-100 ease-in-out',
    className,
    {
      lowercase: !normalCase,
    }
  );

  return (
    <motion.button
      transition={{
        type: 'spring',
        stiffness: 500,
        mass: 0.1,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
      type={type}
      {...props}
    >
      {children}
    </motion.button>
  );
}
