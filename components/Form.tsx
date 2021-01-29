import { ElementProps } from 'types/element';

type FormProps = React.HTMLAttributes<HTMLFormElement> & {};

export default function Form({ children, onSubmit, ...props }: FormProps) {
  return (
    <form className='flex flex-col items-center space-y-4' onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
}
