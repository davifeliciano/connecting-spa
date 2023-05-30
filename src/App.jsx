import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Root from "./routes/Root.jsx";
import theme from "./styles/theme.js";
import RootIndex from "./routes/RootIndex.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import SignUp, { action as signUpAction } from "./routes/SignUp.jsx";
import Login, { action as loginAction } from "./routes/Login.jsx";
import Feed from "./routes/Feed.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import NewPost from "./routes/NewPost.jsx";
import User from "./routes/User.jsx";

dayjs.extend(relativeTime);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RootIndex /> },
      { path: "/signup", element: <SignUp />, action: signUpAction },
      { path: "/login", element: <Login />, action: loginAction },
      { path: "/feed", element: <Feed /> },
      { path: "/new", element: <NewPost /> },
      { path: "/user/:username", element: <User /> },
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
