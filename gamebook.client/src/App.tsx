
import './App.css';
import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"; 
import Home from "./pages/Home/Home";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home ></Home>,
    children: [
      {
        path: "/Register",
        element: <Register title='Registrovat se'></Register>,
      }
    ]
  }
]);


function App() {
    return (
     /*   <Login title='Přihlásit se'></Login> *
       <Register title='Registrovat se'></Register>
       <Home></Home> */

        <RouterProvider router={router}></RouterProvider>
       
    )

}

export default App;