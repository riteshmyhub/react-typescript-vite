import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import AuthService from "../../../../redux/services/auth.service";

export default function Login(): JSX.Element {
   const dispatch = useAppDispatch();
   let navigate = useNavigate();
   const authuser = useAppSelector((state) => state.authReducer);
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
   });
   const _auth = new AuthService();
   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formValues.email && formValues.password) {
         dispatch(_auth._login(formValues));
      }
   };

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({
         ...formValues,
         [name]: value,
      });
   };

   useEffect(() => {
      if (authuser.isAuthenticate) {
         dispatch(_auth._user_on_load());
         navigate("/");
      }
      return () => {};
   }, [authuser.isAuthenticate]);

   return (
      <div className="w-100">
         <div className="card mx-auto" style={{ maxWidth: "500px" }}>
            <form onSubmit={handleSubmit}>
               <h2 className="text-center">Login</h2>
               <div style={{ minHeight: "70px" }}>
                  <label htmlFor="email">email</label>
                  <input type="text" id="email" name="email" value={formValues.email} onChange={handleChange} />
               </div>
               <div style={{ minHeight: "70px" }}>
                  <label htmlFor="password">password</label>
                  <input type="text" id="password" name="password" value={formValues.password} onChange={handleChange} required />
               </div>
               <button type="submit" style={{ background: "black", width: "100%", color: "white", padding: "11px" }}>
                  {authuser.loading ? "loading..." : "submit"}
               </button>
               <span className="link">
                  Not registered yet?
                  <span className="underline">
                     <NavLink to="../register">Create an Acconunt</NavLink>
                  </span>
               </span>
            </form>
         </div>
      </div>
   );
}
