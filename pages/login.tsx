import { useAuth } from 'hooks/useAuth';

import EntryForm from 'components/EntryForm';
import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import InputLabel from 'components/InputLabel';
import Spinner from 'components/Spinner';

export default function Login() {
  const { loading } = useAuth();

  return (
    <EntryForm
      submitButton={
        <Button className='text-white bg-gray-900' type='submit'>
          {loading ? <Spinner /> : 'Login'}
        </Button>
      }
      title='Login'
      method='signIn'
    >
      <InputLabel htmlFor='email' title='Email'>
        <Input type='email' name='email' id='email' autoComplete='email' required={true} />
      </InputLabel>
      <InputLabel htmlFor='password' title='Password'>
        <Input type='password' name='password' id='password' autoComplete='password' required={true} />
      </InputLabel>
    </EntryForm>
  );
}
