import { Outlet as RouterOutlet } from "react-router-dom";

export default function DashboardLayout(): JSX.Element {
   return (
      <div>
         <RouterOutlet />
      </div>
   );
}
