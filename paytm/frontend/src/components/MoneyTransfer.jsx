import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { baseURL } from '../../baseURL'

export function MoneyTransfer({amount}){
    const [params] = useSearchParams()
    const id = params.get("id")
    return <button type="button" onClick={() => {
        axios.post(`${baseURL}/api/v1/account/transfer`, {
            to: id,
            amount: amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    }} className="w-full border rounded-md bg-green-500 text-white py-2 mt-2">Initiate Transfer</button>
}