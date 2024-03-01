export function Balance({balance}){
    return <div className="flex flex-start items-center px-8 py-3"> 
        <div className="font-bold text-xl">
            Your balance <span className="ml-2">Rs {balance}</span>
        </div>
    </div>
}