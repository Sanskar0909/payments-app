import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../baseURL';

export function redirect() {
    let status = true
    axios.get(`${baseURL}/api/v1/user/me`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
        if(response.data.failure) {
            status = false
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
    return status
}
