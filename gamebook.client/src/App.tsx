import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register"; 
import Home from "./pages/home/Home";
import RoomWithDialog from "./pages/room/RoomWithDialog";
import RoomWithText from './pages/room/RoomWithText';
import FightRoom from './pages/room/FightRoom';
import Menu from './pages/menu/Menu';
import Obchod from './pages/room/ShopDialog';



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
  },
  {
    path: "/shop",
    element: <Obchod />,
   },
 ]); 

function App() {
    return (
      <RouterProvider router={router} />

    )
}

export default App;
