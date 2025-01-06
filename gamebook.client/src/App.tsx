import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"; 
import Home from "./pages/Home/Home";
import RoomWithDialog from "./pages/room/RoomWithDialog";
import RoomWithText from './pages/room/RoomWithText';
import FightRoom from './pages/room/FightRoom';
import Menu from './pages/Menu/Menu';
import ObchodDialog from './pages/room/ShopDialog';
import Shop from './pages/room/Shop';

import CityCross from './pages/room/CityCrossStreet';
import CityStreight from './pages/room/CityStreightStreet';
import Interier1 from './pages/room/RoomInterier1';
import Interier2 from './pages/room/RoomInterier2';



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
    path: "/shopdialog",
    element: <ObchodDialog />,
   },

   {
    path: "/city-cross",
    element: <CityCross />,
   },
   {
    path: "/city-streight",
    element: <CityStreight />,
   },
   {
    path: "/interier1",
    element: <Interier1 />,
   },
   {
    path: "/interier2",
    element: <Interier2 />,
   },
   {
    path: "/shop",
    element: <Shop/>,
   },


 ]); 

function App() {
    return (
      <RouterProvider router={router} />

    )
}

export default App;
