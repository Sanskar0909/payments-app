import { useState, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../baseURL";


export function Dashboard() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        axios.get(`${baseURL}/api/v1/user/me`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => {
            if(response.data.failure) {
                console.log("failed")
                navigate('/signin');
            } else {
                setAuthenticated(true);
            }
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
    }, [navigate, token]);

    useEffect(() => {
        if (authenticated) {
            axios.get(`${baseURL}/api/v1/account/balance`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(response => {
                setBalance(response.data.balance);
            })
            .catch(error => {
                console.error('Error fetching balance:', error);
            });
        }
    }, [authenticated, token]);

    if (!authenticated) {
        return null;
    }

    return (
        <div>
            <AppBar />
            <Balance balance={balance}/>
            <Users />
        </div>
    );
}
