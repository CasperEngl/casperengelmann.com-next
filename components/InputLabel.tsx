import cn from 'classnames';
import titleCase from 'title';

import { ElementProps } from 'types/element';

type LabelProps = React.HTMLAttributes<HTMLLabelElement> & {
  title: string;
  htmlFor?: string;
};

export default function InputLabel({ children, className, htmlFor, title, ...props }: LabelProps) {
  const classes = cn('lowercase', className);

  return (
    <label htmlFor={htmlFor} className='flex flex-col w-full space-y-2' {...props}>
      <div className={classes}>{titleCase(title)}</div>
      {children}
    </label>
  );
}
