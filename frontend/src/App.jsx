import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
 
import { useEffect } from "react";
import SignUPPage from "./components/pages/SignUPPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import SettingsPage from "./components/pages/SettingsPage.jsx";
import Home from "./components/pages/Home.jsx";
import { Loader } from "lucide-react";
import { useAuthStore } from "./components/store/useAuthStroe.js";
import { useThemeStore } from "./components/store/useThemeStore.js";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  if (!authUser) return <Navigate to="/login" />;
  return children;
};


function App() {
  const {theme} = useThemeStore() ;
  // console.log(theme) ; 
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  // Check authentication on app load
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
   
  
   
  if (isCheckingAuth) {
    // Show loader while authentication check is in progress
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="w-9 h-9 animate-spin" />
      </div>
    );
  }

  // Define your routes
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup",
      element: authUser ? <Navigate to="/" /> : <SignUPPage />,
    },
    {
      path: "/login",
      element: authUser ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "/setting",
      element: (
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div data-theme = {theme}> 
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App;
