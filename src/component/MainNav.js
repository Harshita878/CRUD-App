 import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

 
 const MainNav = () => {
  let navigate = useNavigate();
  const logoutHandler = ()=>{
    
    localStorage.clear();
    navigate('/login');
  }

   return (
     <>
        <Link to='/dashboard/category'>Category list</Link>
        <Link to='/dashboard/add-category'>Add new Category</Link>
        <br/>
        <p>Hello {localStorage.getItem('userName')}!</p>
        <button onClick={logoutHandler}>Logout</button>
     </>
   )
 }
 
 export default MainNav