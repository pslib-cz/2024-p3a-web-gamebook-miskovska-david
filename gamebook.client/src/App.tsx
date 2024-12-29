import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"; 
import Home from "./pages/Home/Home";
import RoomWithDialog from "./pages/Room1/RoomWithDialog";
import RoomWithText from './pages/Room1/RoomWithText';
import FightRoom from './pages/Room1/FightRoom';
import Menu from './pages/Menu/Menu';


 const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
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
    path: "/rooms",
     children: [
      { 
        path: ":id",
        element: <RoomWithDialog />
      }
    ]
  },
  {
    path: "/room-with-text",
    children: [
      {
        path: ":id",
        element: <RoomWithText />
      }
    ]
  },
  {
    path: "/fight",
    children: [
      {
        path: ":id",
        element: <FightRoom />
      }
    ]
  }
 ]); 

function App() {
    return (
      <RouterProvider router={router} />

    )
}

export default App;
