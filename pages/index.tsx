import Button from 'components/Button';
import { useAuth } from 'hooks/useAuth';

export default function Home() {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <>
        <div>{}</div>
        <pre>{JSON.stringify('user' in user ? user.user : user.user_metadata, null, 2)}</pre>
        <Button className='text-white bg-black' type='button' onClick={signOut}>
          Logout
        </Button>
      </>
    );
  }

  return <div>hello world</div>;
}
