// SignUpForm.jsx step 1. READ THROUGH THIS CODE

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
//step 4. add authService signUp function:
import { signUp } from '../../services/authService';


//step 9. import our context.
import { UserContext } from '../../contexts/UserContext';

//our component function
const SignUpForm = () => {
    //our navigate method which navigates us to another page. in our cancel button which takes us out of the sign up form. 
  const navigate = useNavigate();
    //!step 9. pass usercontext obj to usecontext hook to access user state and set user function. Destructure the obj returned by hook for easy access.
    const { setUser } = useContext(UserContext);

    //! MEssage will be where we display errors, like if a username is already taken. 
  const [message, setMessage] = useState('');
  //state variable for form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  //our state vaiables for our form
  const { username, password, passwordConf } = formData;

  //handle change variable. makes a copy of our form data, then updates the formdata whenever a user types in the respective field. 
  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  //submit form handler, when user hits submit, we block its default of navigating away from page.
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
    //!step 4. add our signUp function
    const newUser = await signUp(formData);
    //!Step 9. call the setUser function to updatte the user state.
    setUser(newUser);
    //!step 9. redirect user to homepage. 
    console.log(newUser) // this line will print the form data to the console
    } catch (err) {
        setMessage(err.message); //!step 4. we now update the message state variable with the error message if there is one. 
    }
  };

    //a function in our submit button that checks if all the fields are present and if password matches the passwordconfirm
  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirm'>Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;




//! note on disabled property in line 80. this essentially disables our button unless all forms are filled and match. 