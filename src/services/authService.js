
// Use the `VITE_BACK_END_SERVER_URL` environment variable to set the base URL.
// Note the `/auth` path added to the server URL that forms the base URL for
// all the requests in this service.
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

//sign up function. sends form data as arg.
const signUp = async (formData) => {
  try {
    //makes a fetch call to api on server, will post and create the new data.
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // will await the json response. this will be our payload for our token that we're waiting for the server to sign and create.
    const data = await res.json();
    // if an error, show err.
    if (data.err) {
      throw new Error(data.err);
    }
    //! if the data has a token, 
    if (data.token) {
        //! we store the token in local storage with the KEY token.
      localStorage.setItem('token', data.token);
      //! this then returns the payload from the token. 
      // 1. data.toke.split('.')[1] ===== inside we will split the token into 3 parts using the . character. We only want the second part of token
      //    which is the payload.
      // 2. atob === decode this part of the token from base64(the enoded but not encrypted string) into readable text.
      // 3. JSON.parse(). payload === Parse the decoded payload into JS object and get the specific data we want (the payload). 
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};



//step 13 sign in service function.
const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export {
  signUp, signIn,
};

