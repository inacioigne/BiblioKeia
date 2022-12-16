import "../styles/globals.css";
import { SearchProvider } from "src/providers/search";
import { AuthProvider } from "src/admin/auth/authContext";
import { BfProvider } from "src/providers/bibframe";
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AuthProvider>
      <SearchProvider>
        <BfProvider>
        <NextNProgress />
        <Component {...pageProps} />

        </BfProvider>
        
      </SearchProvider>
    </AuthProvider>
  );
}

export default MyApp;
