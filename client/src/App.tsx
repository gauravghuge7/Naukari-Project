import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';

// Lazy-loaded route components
const AdminRoutes = lazy(() => import('./routes/AdminRoutes/AdminRoute/AdminRoutes'));
const UserRouter = lazy(() => import('./routes/UserRoutes/UserRouter/UserRouter'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRouter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
