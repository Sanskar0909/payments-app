import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { MoneyTransfer } from "../components/MoneyTransfer";
import { Payee } from "../components/Payee";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { baseURL } from "../../baseURL";

export function SendMoney(){
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [authenticated, setAuthenticated] = useState(false);
    const [amount, setAmount] = useState(0)
    
    useEffect(() => {
        axios.get(`${baseURL}/api/v1/user/me`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => {
            if(response.data.failure) {
                navigate('/signin');
            } else {
                setAuthenticated(true);
            }
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
    }, [navigate, token]);
    
    if(!authenticated){
        return null
    }

    return <div className="h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="border shadow-md rounded-lg p-4 w-96 bg-white">
                <Heading label={"Send Money"} />
                <Payee />
                <InputBox onChange={(e) => {
                    setAmount(e.target.value)
                }} title={"Amount (in Rs)"} placeholder={"Enter amount"} />
                <MoneyTransfer amount={amount} />
            </div>
        </div>
    </div>
}