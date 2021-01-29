import { useAuth } from 'hooks/useAuth';

import Input from 'components/Input';
import InputLabel from 'components/InputLabel';
import Form from 'components/Form';
import Button from 'components/Button';
import EntryForm from 'components/EntryForm';
import Spinner from 'components/Spinner';

export default function Register() {
  const { loading } = useAuth();

  return (
    <EntryForm
      submitButton={
        <Button className='text-white bg-gray-900' type='submit'>
          {loading ? <Spinner w='6' h='6' /> : 'Register'}
        </Button>
      }
      title='Register'
      method='signUp'
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
