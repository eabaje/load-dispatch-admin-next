import "../styles/globals.css";
import { createContext, useContext } from 'react';
import GlobalProvider from "../context/Provider";
import Slide from "@material-ui/core/Slide";
// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import AuthLayout from "../layout/authLayout";
import mainLayout from "../layout/mainLayout";
// const layouts = {
//   auth: authLayout,
//   main: mainLayout,
// };
//const AppContext = createContext();
const App = ({ Component, pageProps }) => {
//  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
 // const Layout=authLayout;
  return (
    <GlobalProvider>
    <AuthLayout>
      <Component {...pageProps} />
    </AuthLayout>
    </GlobalProvider>
  );
};

export default App;