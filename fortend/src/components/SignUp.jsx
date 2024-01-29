import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });


  const [loading, setLoadig] = useState(false);

  const navigate = useNavigate();

  const handleInputChang = (event) =>{
    setFormData({
      ...formData,
      [event.target.id] : event.target.value
    });
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();

    setLoadig(true);

    try {

      const {data} = await axios.post('/api/user/register', formData)


      console.log(data);
      setLoadig(false);
      toast.success('Succesfully Registered')
      navigate('/login');
    }catch(e){
     setLoadig(false);
     toast.error(e.response.data);
    console.error(e);
    }

  }

  return (
    <div className='w-full'>
    <Card>
  <CardHeader>
    <CardTitle>Register</CardTitle>
    <CardDescription>Sign Up with your info</CardDescription>
  </CardHeader>
  <CardContent>
  <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="userName">Usename</Label>
              <Input id="userName" placeholder="Enter Your Username"
              onChange = {handleInputChang} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter Your Email " 
              onChange = {handleInputChang}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type='password' id="password" placeholder="Enter Your Password"
              onChange = {handleInputChang} />
            </div>
            <Button>{loading ? "Registering..." : "Register"}</Button>  
                 
          </div>
        </form>
  </CardContent>
</Card>
</div>
  );
};

export default SignUp;