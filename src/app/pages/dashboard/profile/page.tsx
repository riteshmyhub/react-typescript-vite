import { useEffect } from "react";
import { useAppSelector } from "../../../../redux/store";
import JsonViewer from "../../../shared/components/JsonViewer";

export default function Profile(): JSX.Element {
   const authuser = useAppSelector((state) => state.authReducer);
   useEffect(() => {
      return () => {};
   }, []);

   return (
      <div>
         {authuser.loading ? (
            "loading..."
         ) : authuser.user ? (
            <div>
               <JsonViewer code={JSON.stringify(authuser.user)} />
            </div>
         ) : authuser.error ? (
            authuser.error
         ) : (
            "no user"
         )}
      </div>
   );
}
