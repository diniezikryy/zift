import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { AuthContextProvider } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("Here is your toast");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Toaster />
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </AuthContextProvider>
  );
}

export default MyApp;
