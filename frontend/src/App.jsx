import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUPPage from './components/pages/SignUPPage.jsx'  ;
import LoginPage from './components/pages/LoginPage.jsx'  ;
import ProfilePage from './components/pages/ProfilePage.jsx'  ;
import SettingPage from './components/pages/SettingsPage.jsx'  ;
import Body from "./components/Body.jsx";
import Home from "./components/pages/Home.jsx";

const appRouter = createBrowserRouter([
   {
    path : '/' , 
    element : <Body/> 
   },
   {
    path : '/home' , 
    element : <Home/> 
   },
   {
    path : '/signup' , 
    element : <SignUPPage/> 
   },
   {
    path : '/login' , 
    element : <LoginPage/> 
   },
   {
    path : '/setting' , 
    element : <SettingPage/> 
   },
   {
    path : '/profile' , 
    element : <ProfilePage/> 
   },

]) ; 

function App() {


  return (
    <>
     <RouterProvider router = {appRouter}>

     </RouterProvider>
      

    </>
  )
}

export default App
