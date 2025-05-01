import { Navigate, Outlet } from "react-router";


const AdminProtection = () => {

   const admin = localStorage.getItem("NaukariAdmin");

   console.log(admin);

   if(admin != "admin") {
      return <Navigate to="/admin-login" />
   }

   return (
      <div>
         <Outlet />
      </div>
   );
}

export default AdminProtection;
