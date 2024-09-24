
import { Route, Routes } from 'react-router'
import './App.css'

import { lazy } from 'react'

const RouterApp = lazy(() => import('./Router/Router/RouterApp'))
const AdminRoutes = lazy(() => import('./Router/AdminRoutes/AdminRoute/AdminRoutes'))
const UserRouter = lazy(() => import('./Router/UserRoutes/UserRouter/UserRouter'))

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
