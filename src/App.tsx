import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes, useHref } from 'react-router';
import './App.css';
import AdminComponent from './Components/Admin/AdminComponent';
import CaregoryComponent from './Components/Admin/CategoryComponent';
import FoodComponent from './Components/Admin/FoodComponent';
import AdminDashboard from './Components/AdminDashboard';
import Footer from './Components/Footer';
import Header from './Components/Header';
import FoodProvider from './Components/Provider/FoodProvider';
import Router from './Components/Router';
import UserDashboard from './Components/UserDashboard';
import './Components/Admin/plugins/fontawesome-free/css/all.min.css';
import './Components/Admin/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css';
import './Components/Admin/plugins/jqvmap/jqvmap.min.css';
import './Components/Admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css';
import './Components/Admin/dist/css/adminlte.min.css';
import './Components/Admin/plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
import './Components/Admin/plugins/daterangepicker/daterangepicker.css';
import './Components/Admin/plugins/summernote/summernote-bs4.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      {/* <GoogleOAuthProvider clientId="324187780182-7ofam7nrdet3tjlhd69etfevegmheihv.apps.googleusercontent.com" >
        <FoodProvider>
        <Header />
        <Router />
        <Footer />
        </FoodProvider>
      </GoogleOAuthProvider> */}

      <GoogleOAuthProvider clientId="324187780182-7ofam7nrdet3tjlhd69etfevegmheihv.apps.googleusercontent.com" >
        <FoodProvider>
          <Routes>
            <Route path="/*" element={<UserDashboard />} />

            <Route path="admin/*" element={<AdminDashboard />} />
          </Routes>

        </FoodProvider>
      </GoogleOAuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
