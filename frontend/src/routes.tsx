import App from "./components/App/App";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TodoList from "./components/TodoList/TodoList";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TodoList /> },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

export default routes;
