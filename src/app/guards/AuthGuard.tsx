import { useEffect } from "react";
import { useLocation, Outlet as RouterOutlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

interface clientRoles {
   clientRoles: string[];
}

export default function AuthGuard({ clientRoles }: clientRoles): JSX.Element {
   const authuser = useAppSelector((state) => state.authReducer);

   const location = useLocation();
   const token = localStorage.getItem("token");

   useEffect(() => {
      return () => {};
   }, []);

   if (authuser.loading) {
      return <div>auth checking....</div>;
   } else {
      if (token && authuser.user) {
         const { allowRoles, profile } = authuser.user;
         if (allowRoles.find((role) => clientRoles?.includes(role))) {
            if (profile?.name) {
               return <RouterOutlet />;
            } else {
               return <p>please create profile</p>;
            }
         } else {
            return <p>you are unauthorized for page</p>;
         }
      } else {
         return <Navigate to="/auth" state={{ form: location }} replace />;
      }
   }
}
