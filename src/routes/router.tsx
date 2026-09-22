import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import App from "../app/App";
import UsersPage from "../pages/users";
import CreateUserPage from "../pages/users/creare";
import HomePage from "../pages/home-page/home-page";
import TodosPage from "../components/todos";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.USERS,
        element: <UsersPage />,
      },
      {
        path: ROUTES.TODOS,
        element: <TodosPage />,
      },
      {
        path: ROUTES.CREATE_USER,
        element: <CreateUserPage />,
      },
    ],
  },
]);