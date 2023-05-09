import { useEffect } from "react";
import { useLocation, Outlet as RouterOutlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import Profile from "../pages/dashboard/profile/Profile";

interface clientRoles {
   clientRoles: string[];
}

export default function AuthGuard({ clientRoles }: clientRoles): JSX.Element {
   const { loading, user } = useAppSelector((state) => state.authReducer);

   const location = useLocation();
   const token = localStorage.getItem("token");

   useEffect(() => {
      return () => {};
   }, []);

   if (loading) {
      return <div>auth checking....</div>;
   } else {
      if (token && user) {
         const { allowRoles, profile } = user;
         if (allowRoles.find((role) => clientRoles?.includes(role))) {
            if (profile?.name) {
               return <RouterOutlet />;
            } else {
               return <Profile />;
            }
         } else {
            return <p>you are unauthorized for page</p>;
         }
      } else {
         return <Navigate to="/auth" state={{ form: location }} replace />;
      }
   }
}
