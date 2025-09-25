const BASE_URL=`${import.meta.env.VITE_BACK_END_SERVER_URL}/users`; //we do not have to hit the auth controller. this is determined by our routes on backend. 

const index = async () => {
    try {
        // fetch data from base url/ users as defined on our backend.
        const res = await fetch(BASE_URL, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        }); //! quick note about FETCH. unless you specify, fetch defaults as a GET request. 
        // assign response from server to data variable
        const data = await res.json();
        // if data contains err message. display message
        if (data.err) {
            throw new Error(data.err);
        }
        //otherwise return the data
        return data;

        } catch (err) {
            console.log(err);
            throw new Error(err); //why not a res.statuscode and json message here? 
    };
};





export {index,};

//! useEffect() runs after a component renders, which makes it auto run (like if you want to display index stuff intially upon load.).