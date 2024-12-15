import './App.css';
/* import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"; 
import Home from "./pages/Home/Home";
import ControlPanel from "./pages/ControlPanel/ControlPanel";
import AppLayout from "./pages/AppLayout";
import Room from "./pages/Room"; */
import Room1 from "./pages/Room1/Room06";



/* const router = createBrowserRouter([
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
  {
    path: "/controlpanel",
    element: <ControlPanel />,
  },
  { 
    path: "/rooms",
     element: <AppLayout />, 
     children: [ 
      { 
        path: ":id",
        element: <Room />
      }
    ]
  }
 ]); */

function App() {
    return (
       <Room1 />

    )
}

export default App;
{/* <RouterProvider router={router} /> */}