import { useSearchParams } from "react-router-dom"
export function Payee(){
    const [params] = useSearchParams()
    const name = params.get('name')
    const id = params.get('id')
    return <div className="flex flex-start items-center mt-20">
            <div className="w-10 h-10 rounded-full text-medium text-white text-xl bg-green-500 flex justify-center items-center">
                {name[0]}
            </div>
            
            <div className="text-2xl font-bold ml-3">
                {name}
            </div>
        </div>
}