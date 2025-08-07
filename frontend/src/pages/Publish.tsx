import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";

export const Publish=()=>{
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    return <div>
        <Appbar/>
        <div className="flex flex-col justify-center items-center pt-10">
        <div className="max-w-2xl w-full pt-10">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">TITLE</label>
                <textarea onChange={(e)=>{
                    setTitle(e.target.value);
                }} id="title" className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Title"></textarea>
        </div>
        <div className="max-w-2xl w-full pt-10">
            
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">TELL YOU STORY</label>
            <textarea onChange={(e)=>{
                setDescription(e.target.value);
            }} id="message"  className="block h-60 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>

        </div>
        <div className="pt-5">
            <button onClick={async()=>{
                const res=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content:description,
                    publisheDate:Date()
                },{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                })
                if(!res){
                    alert("Something went wrong")
                }
                else{
                    alert("Published successfully")
                }
                navigate(`/blog/${res.data.id}`)
            }} type="button" className="mr-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish Post</button>
        </div>
    </div>
    </div>
}

