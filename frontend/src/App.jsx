import { Outlet, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserHeader from "./components/Header";
import AdminHeader from "./components/adminComponents/AdminHeaderr";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (

    <>

      { isAdminPage ? <AdminHeader/> : <UserHeader/> }

      <ToastContainer />

      <Container className="my-2">
        
        <Outlet/>
        
      </Container>

    </>

  );

}

export default App;
