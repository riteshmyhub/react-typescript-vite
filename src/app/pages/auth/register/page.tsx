import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import AuthService from "../../../../redux/services/auth.service";
import { useAppDispatch } from "../../../../redux/store";

export default function Register(): JSX.Element {
   const dispatch = useAppDispatch();
   const [formValues, setFormValues] = useState({
      email: "",
      password: "",
      confirm_password: "",
   });

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formValues.email && formValues.password && formValues.confirm_password) {
         if (formValues.password === formValues.confirm_password) {
            const { _register } = new AuthService();
            dispatch(
               _register({
                  email: formValues.email,
                  password: formValues.password,
                  returnSecureToken: true,
               })
            );
         } else {
            alert("password & confirm_password is not matched!");
         }
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
      return () => {};
   }, []);

   return (
      <div className="w-100">
         <div className="card mx-auto" style={{ maxWidth: "500px" }}>
            <form onSubmit={handleSubmit}>
               <h2 className="text-center">Register</h2>
               <div style={{ minHeight: "70px" }}>
                  <label htmlFor="email">email</label>
                  <input type="text" id="email" name="email" value={formValues.email} onChange={handleChange} />
               </div>
               <div style={{ minHeight: "70px" }}>
                  <label htmlFor="password">password</label>
                  <input type="text" id="password" name="password" value={formValues.password} onChange={handleChange} required />
               </div>
               <div style={{ minHeight: "70px" }}>
                  <label htmlFor="confirm_password">confirm password</label>
                  <input type="text" id="confirm_password" name="confirm_password" value={formValues.confirm_password} onChange={handleChange} required />
               </div>
               <button type="submit" style={{ background: "black", width: "100%", color: "white", padding: "11px" }}>
                  submit
               </button>
            </form>
         </div>
      </div>
   );
}
