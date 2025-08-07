import { SignupInput} from "@pravi7072/medium_commom"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
type auth={
    buttonText:"SignIn"|"SignUp"
}
export const Login=({buttonText}:auth)=>{
    const navigate=useNavigate();
    const [props,setProps]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${buttonText=== "SignUp"?"signup":"signin"}`,props)
            const jwt=response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        }
        catch(e){
            alert("Something went wrong")
        }

    }
    return <div className="flex flex-col justify-center h-screen ">
        {/* {JSON.stringify(props)} */}
        <div className="grid justify-center ">
            <div className="px-8">
                <div className="text-3xl font font-bold  ">Create an account</div>
                <div className="text-slate-400 pl-4  ">{buttonText==="SignIn"?"Don't have an account?":"Already have an account?"}
                    <Link className="underline pl-1 text-blue-500" to={buttonText==="SignIn"?"/signup":"/signin"}>
                        {buttonText==="SignIn"?"Register":"login"}
                    </Link>
                </div>
            </div>
            <div className="pt-2 ">
                {buttonText==="SignUp"?<Inputs text={"Name"} place={"John"} onChange={(e)=>{
                    setProps(c=>({
                        ...c,
                        name:e.target.value
                    }))
                }}/>:null}
                <Inputs text={"Email"} place={"abc@gmail.com"} onChange={(e)=>{
                    setProps(c=>({
                        ...c,
                        email:e.target.value
                    }))
                }}/>
                <Inputs text={"password"} place={"12345"} type="password" onChange={(e)=>{
                    setProps(c=>({
                        ...c,
                        password:e.target.value
                    }))
                }}/>
                <div className="pt-3">
                    <button type="button" onClick={sendRequest} className="w-full  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{buttonText==="SignUp"?"Sign Up":"Sign In"}</button>

                </div>


            </div>
        </div>
    </div>
}
type inputs={
    text:String,
    place:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string
}
function Inputs({text,place,onChange,type}:inputs){
    return <div>
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">{text}</label>
        <input type={type||"text"} id="input" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={place} required />
        </div>
}