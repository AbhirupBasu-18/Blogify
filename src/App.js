import './App.css';
import Home from './Pages/Home';
import { useEffect } from 'react';
import { useState } from 'react';
import About from './Pages/About';
import Detail from './Pages/Detail';
import AddEditBlog from './Pages/AddEditBlog';
import NotFound from './Pages/NotFound';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes, Route } from "react-router-dom";
import Header from './components/Header';
import "../src/style.scss"
import "../src/media-query.css"
import Auth from './Pages/Auth';
import {auth} from './firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
function App() {
  const [active,setActive]=useState("home");
  const [user,setUser]=useState("null");
  
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };
  return (
    <div className="App">
      <Header setActive={setActive} active={active}  user={user} handleLogout={handleLogout}/>
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser}/>}/>
        <Route path="/create" element={<AddEditBlog/>}/>
        <Route path="/update:id" element={<AddEditBlog/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
