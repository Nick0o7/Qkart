import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const initialData = {
  username:"",
  password:""
}

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setFormData] = useState(initialData);
  const [progressBar, setProgressBar] = useState(false);
  const history = useHistory();
  
  const handleInput=(e)=>{
    const [key,value]=[e.target.name,e.target.value];
    setFormData((formData)=>({...formData,[key]:value}));
    // console.log(formData);
  }

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {

    // if(validateInput(formData)){
    //   setProgressBar(true);
    //   axios.post(`${config.endpoint}/auth/login`,formData)
    //   .then((response) => {
    //     enqueueSnackbar("Logged in successfully", {variant:`success`});
    //     setProgressBar(false);
    //     persistLogin(response.data.token, response.data.username, response.data.balance);
    //     history.push("/", {from:"Login"});
    //   })
    //   .catch((err) =>{
    //     if(err.response){
    //       // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         // console.log(err.response.data);
    //         // console.log(err.response.status);
    //         // console.log(err.response.headers);
    //         enqueueSnackbar(err.response.data.message, {variant: `error`});
    //         setProgressBar(false);
    //     }
    //     else if(err.request){
    //       // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and return valid JSON", {variant: `error`});
    //         setProgressBar(false);
    //     }
    //     else{
    //       console.log("Error! - ", err.message);
    //       setProgressBar(false);
    //     }
    //   });  
    // }

    if(!validateInput(formData)) return;
    setProgressBar(true);
    try {
      const response = await axios.post(
        `${config.endpoint}/auth/login`,
        formData
      );
      persistLogin(
        response.data.token,
        response.data.username,
        response.data.balance
      );
      setFormData({
        username: "",
        password: "",
      });
      setProgressBar(false);
      enqueueSnackbar("Logged in successfully", {variant: "success"});
      history.push("/", {from : "Login"})
    } catch (e) {
      setProgressBar(false);
      if (e.response && e.response.status === 400) {
        return enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          { variant: "error" }
        );
      }
    }

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {

    if(!data.username){
      enqueueSnackbar("Username is a required field", {variant : "warning"});
      return false;
    }
    else if(!data.password){
      enqueueSnackbar("Password is a required field", {variant : "warning"}); 
      return false;
    }
    return true;

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("balance", balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={true} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            value={data.username}
            onChange={handleInput}
          />
        <TextField 
            id="password"
            label="Password"
            type="password"
            name="password"
            title='password'
            placeholder="Enter password"
            fullWidth
            value={data.password}
            onChange={handleInput}
          />
          {progressBar? (<Box sx={{display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/></Box>):(<Button onClick={() => login(data)} className="button" variant="contained">
            LOGIN TO QKART
           </Button>)
          }
          <p className="secondary-action">
            Don’t have an account? {" "}
            <Link to="/register" className="link" >Register Now</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
