import { Appbar } from "../components/Appbar";
import { Fullblog } from "../components/Fullblog";
import { Skeleton } from "../components/Skeleton";
import { useSingleBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";

export const Blog = () => {
    const { id } = useParams();
    console.log("Raw ID:", id); // Debugging log to verify ID
    const cleanedId = id?.startsWith(":") ? id.slice(1) : id;
    const navigate=useNavigate();
    console.log("Cleaned ID:", cleanedId); // Log the cleaned ID

    const { loading, singleBlog } = useSingleBlog({ id: cleanedId || "" });

    if (loading || !singleBlog) {
        return <div className="flex flex-col items-center max-w-full">
            <div className="pt-40 h-28 grid items-center max-w-2xl w-full">
                <Skeleton/>
            </div>
        </div>
    }

    return (
        <div>
        <Appbar />
        <div className="flex flex-col items-center p-5">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg m-6 p-6">
                <Fullblog blogs={singleBlog} />
            </div>
            <div className="flex items-center justify-center max-w-7xl">
                <button
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-6 py-3 shadow-md transition-transform transform hover:scale-105"
                    onClick={() => {
                        navigate(`/update/${id}`);
                    }}
                >
                    Edit Blog
                </button>
            </div>
        </div>
    </div>
        
    );
};