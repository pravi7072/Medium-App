import { Link } from "react-router-dom"

Link
export const Appbar=()=>{
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'}>Medium</Link>
        <div className="flex">
            <Link to={"/publish"}>
                <button type="button" className="mr-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
            </Link>
            <div className="h-10 w-10 border-2 bg-slate-300 rounded-full flex justify-center items-center">
                    <div>{"Pravin"[0]}</div>
            </div>
        </div>
    </div>
}