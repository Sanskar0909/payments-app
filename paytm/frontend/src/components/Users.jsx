import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { baseURL } from '../../baseURL'

export function Users(){
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")
    useEffect(() => {
        axios.get(`${baseURL}/api/v1/user/bulk?filter=` + filter, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setUsers(response.data.users)
            })
    }, [filter])

    return <div className="px-8">
        <div className="text-xl font-bold">
            Users
        </div>

        <div>
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} className="w-full border rounded mt-5 mb-7 px-2 py-2" placeholder="Search users..." />
        </div>
        <div>
            {users.map(user => <UsersRender user = {user} />)}
        </div>

    </div>
}

function UsersRender({user}){
    const navigate = useNavigate()
    return <div className="flex justify-between items-center mb-5">
            <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex justify-center items-center">
                    {user.firstName[0]}
                </div>
                <div className="font-bold ml-4">
                    {user.firstName + " " + user.lastName}
                </div>
            </div>
            <button type="button"onClick={() => {
                navigate('/send?id=' + user.id + "&name=" + user.firstName)
            }} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-black dark:focus:ring-gray-700 dark:border-gray-700">Send Money</button>
    </div>
}