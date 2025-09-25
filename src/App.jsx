import { Routes, Route } from 'react-router';
//step 14.
import { useContext } from 'react';




import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
//step 14. 
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';


//step 14 add user context.
import { UserContext } from './contexts/UserContext';

const App = () => {
  //step14. get the user funciton
  const {user} = useContext(UserContext);


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm/>} />
        <Route path='/sign-in' element={<SignInForm/>} />
      </Routes>
    </>
  );
};

export default App;





/* 

LECTURE: now we will incorporate our backend user auth with our Front end react app. 

! NOTE: Must have express-api-jwt-auth-template open to connect fully with this lesson. 


Overview of how react obtains jwt token:
  -sign in: react app presents sign in form
  -api call: once form is submitted, app sends an API fetch call to back end. request includes credentials. backend receives it
  -back end auth: back end validates, if valid, it sends token. contains only user id, roles, username and unique signature.
  -token response: back end then sends response to react. includes generated token as json data.
  -react app token storage: react takes token and stores it. 

  !CRUCIAL TO STORE TOKEN IN REACT APP. TOKEN STORAGE OPTIONS:

  ! WE CAN STORE TOKEN IN BROWSER LOCAL STORAGE, WILL KEEP IT EVEN IF BROWSER REFRESHED BUT VULNERABLE TO XSS ATTACKS. READ ON THESE.

  ! (TRADITIONAL METHOD) CAN ALSO USE HTTP COOKIES. BUT VULNERABLE TO CSRF ATTACKS. READ ON THESE.

  ! CAN USE LIBRARIES LIKE AUTH0 SPA APP SDK WHICH WILL PROVIDE CENTRALIZED STORAGE. HOWEVER, they add complexity to our app. token will not be
  ! maintained when page is refreshed, meaning additional code is necessary in order to maintain the state. 


  ! FOR THIS LESSON: we will use local storage (in browser?)


   -once token is stored, you will need to include this token in the header of subsequent reqs to access protected resources. 


1. sign up a new user with form

  -mkdir and component and jsx for component.
    -populate form. just has username and password.
    -pw will auto hash on backend. so it will be plain text here. add password confirmation to make sure
    pw matches. 

    !-look at form and read all notes regarding its functionality. 

  -export component
  -import compnent in app.jsx
  -import route routes from react to our app. 

2. add a link to the sign up route.
  -will add it to navbar component
  -will use link from react router. 
  -import link to top of navbar
  -add the link with sign up route.

  -this should then bring up your form

  !QUESTION FOR JAN OR BEN. CURRENTLY GETTING ERROR FOR NO ROUTES MATCHIN '/'. IS THAT A PROBLEM. 

3. Pass form data to a service function.

    -create a new folder called services in src directory
    -add auth service.js
    -we'll define our sign up method in the auth service.js
    !-look at code we copied. Notes in red is how we receive and store our token.

    -if it works. You should see and obj that looks something like: {username: 'user', _id: "long ass id number" }. 


4. Now that the service function is built we need to:
  -return to the signupform component and modify the HANDLESUBMIT() function to use the AUTHSERVICE function. 
  
  -IMPORT our signUp from our authservice.js into our signupform:
    import { signUp } from '../../services/authService';

  -THEN add our signup function into the handlesubmit function. 
    -Note. Our handlesubmit function will become a try/ caatch block. 
    - create a new variable called newUser = await signUp(formData);
    -console.log the new user
    - in the catch block, use the setMessage to display the error to the user if there is one. 

  !-This is where we would USUALLY put the new user data into state. INSTEAD, we're going to introduce a new 
  ! way to manage special pieces of state that need to exist throughout the app. 


5. CONTEXT:
    -In reacte context provides a way to pass data through component tree without having to pass down props manually at every level. 

    -Context is designed to share data with a group of components such as the current auth user or the apps theme. 

    - Starts with createing context with the creatContext() API. The context we create will hold the user state.

    !-Bottom line. instead of storing state in the user state in our app and passing it down as props, we can use
    ! a useContext() hook to access the user state anywhere in the app. 

6. create user context.
  - has its own dir called contexts
  - in dir add UserContext.jsx

  -user context file will export a component called USERPROVIDER that will manage the user state and provide that state to 
  any component inside of it. we wont set up state yet. just write basic structure of component. 




7. Wrap the UserProvider component around the app component. 

  -import the UserProvider component and wrap it around the APP COMPONENT in the MAIN.JSX FILE. (after the browserrouter components)


8. Add state to the userProvider component
  -go into USER CONTEXT. 
  - import useState into usercontext.
  - create UserContext variable and set it to createContext() function.
  - create a basic user state variable: 
                  const [user, setUser] = useState(null);

  -create a value variable, it will contain the user state and the setuser function:
            const value = { user, setUser };

  -Pass the value variable (our states for context) down to our UserContext.Provider component as props.
      <UserContext.Provider value={value}>
  
  -Export the UserContext variable at the bottom with the UserProvider.
    !Now our value (userstate and setstate function) will be available to all children of the UserProvider component. Which is our app
    ! and all its children components. 


9. PROVIDE CONTEXT TO COMPONENTS THAT NEED IT. 
  -with context now created, we can add it to any component we want to use.
    -First, we'll add it to our sign up form. 
    -State by importing it at the top under our service import.
    - Pass the UserContext object to the useContext hook to access:
        1. The user state (which we're not using here).
         2.  The setUser function to update the user state (which we are using).
              Destructure the object returned by the useContext hook for easy access
              to the data we added to the context with familiar names.
    -Call the setUser function to update the user state, just like normal.
    -Take the user to the (non-existent) home page after they sign up.



10. Update Navbar to use user context.
    -import the useContext hook and the UserContext object
    - Pass the UserContext object to the useContext hook to access:
        1. The user state (which we use here).
        2. The setUser function to update the user state (which we aren't using).
  
          Destructure the object returned by the useContext hook for easy access
          to the data we added to the context with familiar names.


! Test by creating a new user! if it works you should see header dynamically change. (check).

! note: useContext is great but does not replace props in all cases. Mostly used for sharing data from components that need it, like user auth. 


11. USING LOCAl STORAGE TO PERSIST SESSIONS:

  -Users can now sign up to use app, but if they refresh, app will forget their session. 
  -we already put the users token into storage into our signUp() service function. 
    ex.
               if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    -we never red from local storage to get and token data after that.
      
  -implement logic to theck for a token in local storage, and if it exists, we will extract user data from it.
  -will create this in:
        !UserContext.jsx file. 
  
  -create getUserFromToken function before function of userProvider.
    -set token variable to token in local storage: 
                                                  !gets token from local storage
                                                  const token = localStorage.setItem('token', data.token);
                                                  !if no token. return null.
                                                   if (!token) return null;
                                                   ! if token does exist, we'll get user data from taken like in signup (which is the payload)
                                                   return JSON.parse(atob(token.split('.')[1])).payload;

  -update state variable in userProvider to usestate of our new(getUserFromToken()) function. 
    -this allows us to get the payload data from token. reacte will use that data as initial state in our browser. 
    ! to test. sign in with a new user and refresh page. should keep you signed in. 



12. BUILD SIGN OUT ABILITY.
    - in order to sign out, we only need to removed the token from local storage and then clear the user state. 
    -dont even need to relay that to back end since its not maintaining state. 


    -Add singout to UI in our nav bar. Add it within the conditional underneath teh welcome banner
      -<li><Link to='/'>Sign Out</Link></li>

    -will create a handler function for Sign out. can just exist in the navbar. 
    - set user state variable to user context (cosnt {user, setUser} = useContext{UserContext})

    -create signout function. clear token from local storage and set user state variable to null

    -call signout function onclik within the link tag. 

  !test. should work. 

13. CREATE SIGN IN FUNCTION:
    -create a sign in form. so make a component directory and file. 
    -will look VERY SIMILAR to our Sign Up form with one relative change in our HANDLE SUBMIT Function.

    -import our sign in form to top of our app.

    -add a route for our sign in form. 

    -add a new link to our nav bar IF THEY ARE SIGNED OUT. remember link wont work until service function is complete. 

    -add signIn() service function in authService. export function. 
      !will be EXTREMEMLY similar to signUp function. look for any differences. 
    -export function. 

    -test sign in with a user. 




  14. Conditionally render in a route. 
      -now we will build a landing page for visitors and a dashboard that we'll show to auth users. 
      -will build 2 differnt components and render them based on when either a user or an auth user navigates to '/'

      -create landing director and file in components
      -create landing function component
      -create dashboard dir and file.
      -create dashboard component.
        --dashboard will need context from react and usercontext function. 
        -import both components to top of app
        -import useContext from ract to app. 

        - add user = useContext(usercontext) within the app function. before return statement. 
        -add a route that is conditional on if there is a user. 

      -create links in our navbar to new routes and components within both sides fo ternerary on if user is signed in or not.
        -dashboard on if user signed in (with the signout link)
        -landing page on if user signed out (with sign-up and sign in links. ) 


      -test by signing in and naving around.

15. MAKING AUTHENTICATED REQUESTS. 
    So now we'll add functionality to the dashboard by fetching data from the server. 
    ! We'll need to authenticate this request with a JWT. This is because the server will only respond
    ! if the req includes a valid token. 

    !WE WILL CREATE A NEW AUTH CONTROLLER CALLED USER SERVICE WHICH WILL HANDLE AUTHENTICATED REQUESTS. 

    -create new userSErvice. in services dir.
    - create a new index function
    -function will use fetch to make a get request to our baseurl (with /users) and return an array of our users.
    - assign the json response to a data variable.
    - throw a new error if json has an err
    -otherwise return data
    -export function

16. import function into Dashboard component
    -import useEffect into dashboard
    -create the useEffect hook to call up a list of users when compoenent has loaded
    -create your nested arrow function called fetchUsers
    -create a variable called fetchedUsers and set it equal to our userService.index function
    -throw an error if there is one.
    - if there is a user, immediately call the fetchUsers function
    - add a dependancy array at the end for user

17. address the unauthorized error.
    - to do this we need to include the JWT in the request to the server so that it knows the user.
    -add an Authorization header to the request in our userService. 
    -This header must contain "Bearer {localstorage.getItem('token)}" 
    !- add the above as part of the fetch request, after the base-url.
    -that should bring up our list. if it works. you should see it in console.

18. Display it to the index.

    you do:

     --








      
 










*/