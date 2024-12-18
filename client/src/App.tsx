
import { Route, Routes } from 'react-router-dom'
import './App.css'

import RouterApp from './Router/Router/RouterApp'
import AdminRoutes from './Router/AdminRoutes/AdminRoute/AdminRoutes'
import UserRouter from './Router/UserRoutes/UserRouter/UserRouter'


function App() {


  return (
    <>
      {/**  Main Routes Imports All Routes Here  */}
      <Routes> 

        <Route path='/*' element={<RouterApp />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/user/*' element={<UserRouter />} />
        

      </Routes>
    </>
  )
}

export default App
