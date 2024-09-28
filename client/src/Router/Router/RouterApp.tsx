import {
  Route,
  Routes,
} from 'react-router-dom';

import AdminLogin from '../../Admin/AdminLogin/AdminLogin.tsx';
import AdminSignUp from '../../Admin/AdminSignUp/AdminSignUp.tsx';
import { Home } from '../../Components/Home/Home.tsx';
import HomeLayout from '../../Components/HomeLayout/HomeLayout.tsx';
import StudentLogin from '../../User/UserLogin/StudentLogin.tsx';
import StudentSignUp from '../../User/UserLogin/StudentSignUp.tsx';

const RouterApp = () => {
   return (
      
      <div>
         <Routes>

            {/* create a Outlet for nested routes */}
            <Route path='/' element={<HomeLayout />}> 

               <Route path='/' element={<Home />} />
               <Route path='/admin-login' element={<AdminLogin />} />
               <Route path='/admin-signup' element={<AdminSignUp />} />

               <Route path='/student-login' element={<StudentLogin />} />
               <Route path='/student-register' element={<StudentSignUp />} />

            </Route>

            {/* you can also nest routes within routes */}

            
         </Routes>
      </div>
   
   )
}
export default RouterApp;