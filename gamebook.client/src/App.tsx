import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"; 
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login title='Přihlásit se' />,
  },
  {
    path: "/register",
    element: <Register title='Registrovat se' />,
  },
]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
