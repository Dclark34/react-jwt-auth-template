//where we import context from.
import { createContext, useState } from 'react';

//UserContext is created using the createContext() method. we'll use this to provide the user state to the rest of the app.
const UserContext = createContext();

//step 11. add new getUserFromToken function.
const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {

//STEP 8: create state for our user like normally //!step 11 update usestate to getUserFromToken().
const [user, setUser] = useState(getUserFromToken());

//step 8: this is the user state and the set user fucntion that will update context. this variable name isnt special
// its just convention to user value.
const value = { user, setUser };


// !step 8: add value element to our UserContext.Provider component. The data
// ! we pas to the value prop in line 14 is now available to all the children of the UserProvider component
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

//line 10: UserContext.Provider component responsible for keeping track of context data given to components that consume the user
// context. Currently, the provider componenet is empty but we'll add data soon. 

//! note we a destructuring the childrn prop inthe UserProvider component in line 7. This is a special prop that React provides.
//! to components that have children. it allows the component to display whatever we pass between its opening and closing tags. 
    /*
    Think of it as a placeholder for the content that REact will render inside the component. in this case, children prop will be
    the components that need access to the user state that we eventually add to the children prop. 
    
    */



//! STEP 8. add UserContext to the export object. when components need to use the value of the user context, the will need 
// access to the UserContext object to know which context to access. Therefore we export it. 