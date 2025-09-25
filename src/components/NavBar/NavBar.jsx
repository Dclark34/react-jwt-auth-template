

import { Link } from "react-router";
//step 10. 
import { useContext } from "react";


//step10
import { UserContext } from "../../contexts/UserContext";


const NavBar = () => {
  //step10 import usercontext, then conditionally render a header based on if user is signed in or not. 
    const { user, setUser } = useContext(UserContext);

  //step 12. signout handler. clear token from local storate and setUser to null. then add an onclick to signout link. call this function.

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  }


  return (
    <nav>
      { user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          <li><Link to='/'>Dashboard</Link></li>
        </ul> )
        : (
        <ul>
            <li><Link to='/sign-up'>Sign Up</Link></li>
            <li><Link to='/sign-in'>Sign In</Link></li>
             <li><Link to='/'>Home</Link></li>
        </ul>
        )};
    </nav>
  );
};

export default NavBar;

