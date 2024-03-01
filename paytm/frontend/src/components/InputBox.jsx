export function InputBox({title, placeholder, onChange}){
    return <div>
        <div className="font-medium pb-2">{title}</div>
        <input onChange={onChange} placeholder={placeholder} className="w-full text-md border border-slate-300 rounded pt-1 pb-1 pl-2 mb-2" />
    </div>
}