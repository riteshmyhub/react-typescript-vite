import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import AuthService from "../../../../redux/services/auth.service";

export default function Navbar(): JSX.Element {
   const [toggle, setToggle] = useState<boolean>(false);
   const navigate = useNavigate();
   const authuser = useAppSelector((state) => state.authReducer);
   let dispatch = useAppDispatch();
   const { _logout } = new AuthService();
   useEffect(() => {
      return () => {};
   }, []);

   return (
      <nav>
         <ul className="logo-side-nav">
            <li>
               <div className="logo">logo</div>
            </li>
         </ul>
         <ul className="hamburger-menu">
            <li>
               <button onClick={() => setToggle(!toggle)}>button</button>
            </li>
         </ul>
         <ul className={`side-nav${toggle ? " open" : ""}`}>
            <li>
               <NavLink to="/">home</NavLink>
            </li>
            {authuser.user ? (
               <>
                  <li>
                     <NavLink to="dashboard">dashboard</NavLink>
                  </li>
                  <li>
                     <NavLink to="admin">admin</NavLink>
                  </li>
                  <li>
                     <button onClick={() => dispatch(_logout())}>logout</button>
                  </li>
               </>
            ) : (
               <li>
                  <button onClick={() => navigate("/auth/login")}>login</button>
               </li>
            )}
         </ul>
      </nav>
   );
}
