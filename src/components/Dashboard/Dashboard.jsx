
import { useContext, useEffect } from 'react';

import { useState } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService'; //remember * indicates that you import everything from the file, not just one function. bit redundant here. 

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);




    //a useeffect hook that runs after component has rendered.
    useEffect(() => {
      //our async function to fetch a list of users
      const fetchUsers = async () => {
        //try call the index function fromm our Userservice file. 
        try {
          const fetchedUsers = await userService.index();
          console.log(fetchedUsers);
          //add this so the users you retrieve wiil be stored in state.
          setUsers(fetchedUsers);
        } catch (err) {
          console.log(err);
        } 
      }
      if (user) fetchUsers();
      }, [user]);
  

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
        <ul>
          {users.map((aUser) => (
            <li key={aUser._id}>{aUser.username}</li>
          ))}
        </ul>
    </main>
  );
};

export default Dashboard; 

/*
can display everything all within the component. just needed:
  -line 12, new state variable 
  -line 26 setUsers to the index of users we got in our response
  -line 39 through 42. Map over each user for each item. 

*/