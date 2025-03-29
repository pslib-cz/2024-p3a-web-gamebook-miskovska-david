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
import ShopDialog from './pages/room/ShopDialog';
import Shop from './pages/room/Shop';

import CityCross from './pages/room/CityCrossStreet';
import CityStreight from './pages/room/CityStreightStreet';
import Interier1 from './pages/room/RoomInterier1';
import Interier2 from './pages/room/RoomInterier2';

import { DndProvider } from 'react-dnd';
import { MultiBackend, TouchTransition, MouseTransition } from 'react-dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import DragAndDrop from './pages/room/DragAndDrop';

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

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
    path: "/dialog",
    children: [
      { 
        path: ":id",
        element: <RoomWithDialog />
      }
    ]
  },
  {
    path: "/text",
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
    element: <ShopDialog />,
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
    element: <Shop />,
  },
  {
    path: "/dnd",
    element: <DragAndDrop />,
  }
]);

function App() {
  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <RouterProvider router={router} />
    </DndProvider>
  );
}

export default App;