import { AuthProvider } from 'hooks/useAuth';

import '../styles/style.scss';
import '../styles/tailwind.scss';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
