import "../styles/globals.css";
import { SearchProvider } from "src/providers/search";
import { AuthProvider } from "src/admin/auth/authContext";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AuthProvider>
      <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>

    </AuthProvider>
    
  );
}

export default MyApp;
