import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { Warning } from "../components/Warning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { baseURL } from "../../baseURL"

export function Signin(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return <div className="h-screen bg-slate-300 flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 border rounded-md px-4 pb-3">
                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value)
                }} title={"Email"} placeholder={"johndoe@example.com"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} title={"Password"}/>
                <Button onClick={() => {
                    axios.post(`${baseURL}/api/v1/user/signin`, {
                        username,
                        password
                    })
                        .then(response => {
                            try{
                                if(response.data.token){
                                    localStorage.setItem("token", response.data.token)
                                    navigate("/dashboard")
                                }
                            }catch(e){
                                // console.log(e)
                            }
                        })
                }} label={"Sign in"} />
                <Warning label={"Don't have an account?"} linkText={"Sign up"} redirect={"/signup"} />
            </div>
        </div>
    </div>
}