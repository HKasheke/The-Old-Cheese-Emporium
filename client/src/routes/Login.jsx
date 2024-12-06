import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../App";

export default function Login() {
 
  // react-hook-form
  const { setLoggedIn } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginFail, setLoginFail] = useState(false);
  
  // form submit function
  async function formSubmit(data) {
    const hostUrl = import.meta.env.VITE_APP_HOST;
    const loginUrl = hostUrl + "/api/users/login";
    //const url = 'localhost:3000/api/users/login';
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      credentials: 'include'// make fetch include cookies in the request
    });
    
    if(response.ok){
      setLoggedIn(true);
      setTimeout( async() =>{
        window.location.href = '/home'; // redirect to home page
      }, 5000);
      window.location.href = '/home'; // redirect to home page
    }else{
      console.log(response.json());
      setLoginFail(true);
    }
  }
 
  return (
    <>
      <h2>Login</h2>
      {loginFail && <p className="text-danger">Incorrect username or password.</p>}
      <form onSubmit={handleSubmit(formSubmit)} method="post" className="w-25">
        <div className="mb-3">
          <label className="form-label">Email (username)</label>
          <input {...register("email", { required: "Email is required." })} type="text" className="form-control bg-light" />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input {...register("password", { required: "Password is required." })} type="password" className="form-control bg-light" />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/home" className="btn btn-outline-dark ms-2">Cancel</Link>
      </form>
      <p className="mt-4">Don't have an account. <Link to="/signup">Sign-up</Link> now.</p>
    </>
  )
}