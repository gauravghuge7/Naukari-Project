import { Navigate, Outlet } from "react-router";


const UserProtection = () => {
   
   const user = localStorage.getItem("NaukariUser");

   if(user !== "user") {
      return <Navigate to={"/student-login"} />
   }



   return (
      <div>
         <Outlet />
      </div>
   );
}

export default UserProtection;
