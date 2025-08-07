import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/blog";
import { Skeleton } from "../components/Skeleton";
import { useBlog } from "../hooks";
export const Blogs = () => {
    const {loading,blog}=useBlog();
    if(loading==true){
        return <div className="flex flex-col items-center max-w-full">
            <div className="grid items-center max-w-2xl w-full">
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </div>

        </div>
    }
    return (
        <div>
            <Appbar/>
            <div className="flex flex-col items-center w-full">
            <div className="flex flex-col w-full max-w-2xl ">
                {blog.map(blogs=> <BlogCard 
                    id={blogs.id}
                    authorName={blogs.author.name} 
                    title={blogs.title} 
                    description={blogs.content} 
                    publisheDate={blogs.publisheDate}
                />
                )
                }
            </div>
        </div>
        </div>
    );
};
