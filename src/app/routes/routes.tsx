import { Navigate, Route, Routes } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import Home from "../pages/home/Home";
import NotFound from "../pages/404/NotFound";
import AdminLayout from "../pages/admin/admin.layout";
import ProductInfo from "../pages/product-info/ProductInfo";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import DashboardLayout from "../pages/dashboard/dashboard.layout";
import Profile from "../pages/dashboard/profile/Profile";
import Overview from "../pages/admin/overview/Overview";
import AuthLayout from "../pages/auth/auth.layout";
import Products from "../pages/products/Products";

export default function PageRoutes(): JSX.Element {
   return (
      <Routes>
         <Route path="auth" element={<AuthLayout />} caseSensitive>
            <Route index element={<Navigate to="login" replace />} caseSensitive />
            <Route path="login" element={<Login />} caseSensitive />
            <Route path="register" element={<Register />} caseSensitive />
         </Route>

         {/* home */}
         <Route path="/" element={<Home />} caseSensitive />
         <Route path="products" element={<Products />} caseSensitive />
         <Route path="products/:id" element={<ProductInfo />} caseSensitive />

         {/* dashboard: (user) and also (admin) */}
         <Route element={<AuthGuard clientRoles={["user", "admin"]} />}>
            <Route path="dashboard" element={<DashboardLayout />} caseSensitive>
               <Route index element={<Navigate to="profile" replace />} caseSensitive />
               <Route path="profile" element={<Profile />} caseSensitive />
            </Route>
         </Route>

         {/* only for (admin) */}
         <Route element={<AuthGuard clientRoles={["admin"]} />}>
            <Route path="admin" element={<AdminLayout />} caseSensitive>
               <Route index element={<Navigate to="overview" replace />} caseSensitive />
               <Route path="overview" element={<Overview />} caseSensitive />
            </Route>
         </Route>

         {/* 404 */}
         <Route path="*" element={<NotFound />} caseSensitive />
      </Routes>
   );
}
