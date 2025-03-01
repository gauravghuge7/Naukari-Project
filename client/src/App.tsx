
import { Route, Routes } from 'react-router-dom'
import './App.css'

import AdminRoutes from './Router/AdminRoutes/AdminRoute/AdminRoutes'
import UserRouter from './Router/UserRoutes/UserRouter/UserRouter'
import NotFound from './components/NotFound/NotFound'





function App() {




  return (
    <>
      {/**  Main Routes Imports All Routes Here  */}
      <Routes> 

        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/*' element={<UserRouter />} />
        
        
        <Route path='*' element={<NotFound />} />
        
      </Routes>
    </>
  )
}

export default App
