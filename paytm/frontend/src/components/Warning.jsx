import { Link } from "react-router-dom";

export function Warning({label, linkText, redirect}){
    return <div className="flex justify-center">
        <div className="font-medium">
            {label}
        </div>
        <div className="cursor-pointer pl-2 font-medium underline">
            <Link to={redirect}>{linkText}</Link>
        </div>
    </div>
}