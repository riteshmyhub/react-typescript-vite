import { Outlet as RouterOutlet } from "react-router-dom";

export default function AdminLayout(): JSX.Element {
   return (
      <div>
         <RouterOutlet />
      </div>
   );
}
