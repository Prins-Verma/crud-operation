import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Navbar from './component/Navbar';
import Newcustomer from './component/Newcustomer';
import Allcustomer from './component/Allcustomer';
import CustomerDetails from './component/CustomerDetails';
import UpdateCustomer from './component/UpdateCustomer';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Allcustomer />} />
        <Route path='/create' element={<Newcustomer />} />
        <Route path='/edit/:userid' element={<UpdateCustomer />} />
        <Route path='/details/:userid' element={<CustomerDetails />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
}

export default App;
