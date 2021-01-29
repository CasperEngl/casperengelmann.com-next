import Link from 'next/link';
import titleCase from 'title';

import Button from './Button';
import Form from './Form';

import { useAuth } from 'hooks/useAuth';

type EntryFormType = React.HTMLAttributes<HTMLDivElement> & {
  submitButton: JSX.Element;
  method: 'signIn' | 'signUp';
};

export default function EntryForm({ children, submitButton, title, method }: EntryFormType) {
  const { entryMethod, handleEntry, error } = useAuth();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='w-full max-w-2xl mx-auto space-y-16'>
        <div className='space-y-8'>
          <h1 className='text-5xl font-bold text-center lowercase'>{titleCase(title)}</h1>
          <Form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);

              const email = formData.get('email');
              const password = formData.get('password');

              if (typeof email === 'string' && typeof password === 'string') {
                handleEntry({ method, email, password });
              }
            }}
          >
            {children}
            {submitButton}
            {error ? <div className='text-red-500'>{error}</div> : null}
            <p className='text-gray-400'>
              ... or maybe{' '}
              {method === 'signIn' ? (
                <Link href='/register'>
                  <a className='text-gray-600 underline'>Register</a>
                </Link>
              ) : null}
              {method === 'signUp' ? (
                <Link href='/login'>
                  <a className='text-gray-600 underline'>Login</a>
                </Link>
              ) : null}
              ?
            </p>
          </Form>
        </div>
        <div className='space-y-8'>
          <h2 className='text-3xl font-bold text-center lowercase'>Alternative methods</h2>
          <div className='flex flex-col space-y-2'>
            <Button
              className='bg-google text-white'
              onClick={() => {
                entryMethod({
                  provider: 'google',
                });
              }}
              type='button'
              normalCase
            >
              Google
            </Button>
            <Button
              className='bg-github text-white'
              onClick={() => {
                entryMethod({
                  provider: 'github',
                });
              }}
              type='button'
              normalCase
            >
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
