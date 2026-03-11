
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {useEffect} from "react";
import { useDispatch } from "react-redux";

import { checkAuthThunk } from "./store/thunks/authThunks";

import { fetchCategoriesThunk }  from "./store/thunks/categoryThunks"; 

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";


export default function App() {
const dispatch = useDispatch();

useEffect(() => {
  dispatch(checkAuthThunk());
  dispatch(fetchCategoriesThunk());
}, [dispatch]);


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <PageContent />  
        </main>

        <Footer />  


        <ToastContainer position = "top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Router>
  );
}





