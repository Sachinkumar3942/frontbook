import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[name,setName]=useState('')
  const Navigate=useNavigate();

  // useEffect(()=>{
  //   const auth=localStorage.getItem('user');
  //   if(auth){
  //     Navigate('/')
  //   }
  //   else{
  //     Navigate('/register')
  //   }
  // },[Navigate])
  const handleRegister=async (e)=>{
      // let result=await fetch('',{
      //   method:'post',
      //   body:JSON.stringify({name,email,password}),
      //   headers:{
      //     'Content-Type':'application/json'
      //   }
      // });
      // result=await result.json();
      // localStorage.setItem('user',JSON.stringify(result.user))
      // if(result){
      //   Navigate('/');
      // }
      e.preventDefault();
      try{
        let result=await axios.post('/register',{
          name,email,password,
        })
        toast.success("Registration successful.Now login")
        // alert('Registration Successful.')
        if(result){
          Navigate('/login')
        }
      }catch(e){
        toast.error('Registration unsuccessful.Please try again.')
      }

  }
  const [display, setDisplay] = useState(false);
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
      <h1 style={{'fontFamily':'Times New Roman' }} className=' text-4xl p-3'>Register</h1>
      <input className=' bg-blue-100 mx-2 my-2 border rounded-full py-2 px-4 gap-2 shadow-md shadow-black' type='text' placeholder='Enter your name...' value={name} onChange={(e)=>setName(e.target.value)} />
      <input className=' bg-blue-100  border rounded-full py-2 px-4 gap-2 mx-2 my-2 shadow-md shadow-black' type='email' placeholder='Enter email...' value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className=' bg-blue-100 mx-2 my-2 border rounded-full py-2 px-4 gap-2 shadow-md shadow-black' type='password' placeholder='Enter password...' value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className=' bg-blue-500 border rounded-full py-2 px-4 gap-2 mx-2 text-2xl my-2 mb-6 shadow-md shadow-black hover:bg-red-300' onClick={handleRegister}>Register</button>
      <h4 className=' pb-4 text-xl'>
        Already Registered!
        <Link className="text-2xl" to="/login">
          Login
        </Link>
      </h4>
    </div>
    </div>
  )
}



export default Register