import { useNavigate, useParams } from "react-router-dom";
import { useSingleBlog } from "../hooks";
import { Appbar } from "../components/Appbar";
import { Skeleton } from "../components/Skeleton";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Update=()=>{
    const navigate=useNavigate();
    const {id}=useParams();
    const {loading ,singleBlog,setSingleBlog}=useSingleBlog({id:id||""});
    if(loading||!singleBlog){
        return <div className="flex flex-col items-center max-w-full">
                    <div className="pt-40 h-28 grid items-center max-w-2xl w-full">
                        <Skeleton/>
                    </div>
                </div>
    }
    return <div>
        <Appbar/>
        <div className="flex flex-col justify-center items-center pt-10">
        <div className="max-w-2xl w-full pt-10">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">TITLE</label>
                <textarea value={singleBlog?.title} onChange={(e)=>{
                    setSingleBlog({...singleBlog,title:e.target.value});
                }} id="title" className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Title"></textarea>
        </div>
        <div className="max-w-2xl w-full pt-10">
            
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">TELL YOU STORY</label>
            <textarea value={singleBlog.content} onChange={(e)=>{
                setSingleBlog({...singleBlog,content:e.target.value});
            }} id="message"  className="block h-60 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>

        </div>
        <div className="pt-5">
            <button onClick={async()=>{
                const res=await axios.put(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    title:singleBlog.title,
                    content:singleBlog.content,
                    publisheDate:new Date().toISOString()
                },{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                })
                if(!res){
                    alert("Something went wrong")
                }
                else{
                    alert("Updated successfully")
                }
                navigate(`/blog/${id}`)
            }} type="button" className="mr-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Update Post</button>
            <button onClick={async()=>{
                const res=await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                })
                if(!res){
                    alert("Something went wrong")
                }
                else{
                    alert("Deleted successfully")
                }
                navigate(`/blogs`)
            }} type="button" className="mr-5 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Post</button>
        </div>
        </div>
    </div>
}