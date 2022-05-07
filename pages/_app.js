import "../styles/globals.css";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App";
import { createContext, useContext } from 'react';
import GlobalProvider from "../context/Provider";
import Slide from "@material-ui/core/Slide";
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import authLayout from "../layout/authLayout";
import mainLayout from "../layout/mainLayout";
const layouts = {
  auth: authLayout,
  main: mainLayout,
};
const AppContext = createContext();
const App = ({ Component, pageProps }) => {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  return (
    <GlobalProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </GlobalProvider>
  );
};

export default App;