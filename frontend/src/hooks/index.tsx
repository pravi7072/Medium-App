import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    id:string;
    content:string;
    title:string;
    publisheDate:string;
    author:{
        name:string
    }
}
export const useSingleBlog=({id}:{id:String})=>{
    const [loading,setLoading]=useState(true);
    const[singleBlog,setSingleBlog]=useState<Blog>();
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
            setSingleBlog(response.data.msg);
            setLoading(false);
        })
    },[id])
    return {loading ,singleBlog,setSingleBlog}
}
export const useBlog=()=>{
    const [loading ,setLoading]=useState(true);
    const [blog,setBlogs]=useState<Blog[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/all`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data.blogs)
            setLoading(false);
        })
    },[]);
    return {loading,blog};
}
// export const useUpdate=({id}:{id:string})=>{
//     const [blog,setBlog]=useState<Blog>();
//     const [loading,setLoading]=useState(true);
//     useEffect(()=>{
//         axios.get(`${BACKEND_URL}/api/v/blog/${id}`,{
//             headers:{
//                 Authorization:"Bearer "+localStorage.getItem("token")
//             }
//         })
//         .then(res=>{
//             setBlog(res.data.msg);
//             setLoading(false)
//         })
//     },[id])
// }