type InputProps = React.HTMLAttributes<HTMLInputElement> & {
  type: string;
  name: string;
  autoComplete: string;
  required?: boolean;
  ref?: React.Ref<HTMLInputElement>;
};

export default function Input({ type, name, autoComplete, required, ...props }: InputProps) {
  return (
    <input
      type={type}
      name={name}
      autoComplete={autoComplete}
      required={required}
      className='focus:bg-gray-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 ring-blue-300 px-4 py-2 transition duration-100 ease-in-out bg-gray-100 rounded shadow'
      {...props}
    />
  );
}
