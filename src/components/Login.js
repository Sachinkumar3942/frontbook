import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../userContext';
function Login() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[redirect,setRedirect]=useState(false); 
  const {setUser}=useContext(UserContext);
  const [display, setDisplay] = useState(false);
  const Navigate=useNavigate();
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.post('/login',{
        email,password
      })
      setUser(data);
      toast.success("Successfuly Login.")
      // alert('Registration Successful.')
      setRedirect(true);      
    }catch(e){
      toast.error('Unable to login.')
    }
  }
  if(redirect){
    Navigate('/')
  }
  
  useEffect(() => {
    setDisplay(false);
    const timeoutId = setTimeout(() => {
      setDisplay(true);
    }, 250);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div>
      <div className=' flex flex-col border-black bg-slate-300 text-center justify-center mx-[20%] mt-[10%]'
      style={{
        transform: display ? "translateY(0%)" : "translateY(300%)",
        transition: "all 0.5s",
      }}>
      <h1 style={{'fontFamily':'Times New Roman' }} className=' text-4xl p-3'>Login</h1>
      <input className=' bg-blue-100  border rounded-full py-2 px-4 gap-2 mx-2 my-2 shadow-md shadow-black' type='email' placeholder='Enter email...' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className=' bg-blue-100 mx-2 my-2 border rounded-full py-2 px-4 gap-2 shadow-md shadow-black' type='password' placeholder='Enter password...' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className=' bg-blue-500 border rounded-full py-2 px-4 gap-2 mx-2 text-2xl my-2 mb-6 shadow-md shadow-black hover:bg-red-300' onClick={handleLogin}>Login</button>
      <h4 className=' pb-4 text-xl'>
        Not Yet Registered!
        <Link className="text-2xl" to="/register">
          Register
        </Link>
      </h4>
    </div>
    </div>
  )
}

export default Login