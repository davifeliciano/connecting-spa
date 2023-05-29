import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Root from "./routes/Root.jsx";
import theme from "./styles/theme.js";
import RootIndex from "./routes/RootIndex.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import SignUp, { action as signUpAction } from "./routes/SignUp.jsx";
import Login, { action as loginAction } from "./routes/Login.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RootIndex /> },
      { path: "/signup", element: <SignUp />, action: signUpAction },
      { path: "/login", element: <Login />, action: loginAction },
    ],
  },
]);

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
