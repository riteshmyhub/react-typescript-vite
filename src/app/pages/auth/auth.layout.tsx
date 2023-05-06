import { Outlet as RouterOutlet } from "react-router-dom";
export default function AuthLayout() {
   return (
      <div className="center-xy" style={{ height: "calc(100vh - 63px)" }}>
         <RouterOutlet />
      </div>
   );
}
