import { useState } from 'react'
import { Button } from '../components/Button'
import { Heading } from '../components/Heading'
import { InputBox } from '../components/InputBox'
import { SubHeading } from '../components/SubHeading'
import { Warning } from '../components/Warning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../baseURL'

export function Signup(){
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

    return <div className='h-screen bg-slate-300 flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='bg-white px-5 pb-4 rounded-xl h-max w-80'>
          <Heading label={"Sign up"}/>
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) => {
            setFirstName(e.target.value)
          }} title={"First Name"} placeholder={"John"} />
          <InputBox onChange={(e) => {
            setLastName(e.target.value)
          }} title={"Last Name"} placeholder={"Doe"} />
          <InputBox onChange={(e) => {
            setUsername(e.target.value)
          }} title={"Email"} placeholder={"sanskar@gmail.com"} />
          <InputBox onChange={(e) => {
            setPassword(e.target.value)
          }} title={"Password"} placeholder={"123456"} />
          <Button onClick={async () => {
            const res = await axios.post(`${baseURL}/api/v1/user/signup`, {
              username,
              firstName,
              lastName,
              password
            })
            localStorage.setItem("token", res.data.token)
            navigate('/dashboard')

          }} label={"Sign Up"} />
          <Warning label={"Already have an account?"} linkText={"Sign in"} redirect={"/signin"} />
        </div>
      </div>
    </div>
}