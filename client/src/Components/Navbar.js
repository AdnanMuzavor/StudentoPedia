import React from 'react';
import { Link } from 'react-router-dom';

const Navbar=()=>{
   return(
    <>
     <div className="outercomp">
        <div className="navcomp">
             <Link to="/" className='link'>
                Home Screen
             </Link>
        </div>
        <div className="navcomp">
             <Link to="/register/-1" className='link'>
                Register student
             </Link>
        </div>
  
     </div>
    
    </>
   )
}

export default Navbar;

