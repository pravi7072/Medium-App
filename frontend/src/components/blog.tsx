import { Link } from "react-router-dom";

type Blog = {
    authorName: string;
    title: string;
    description: string;
    publisheDate:string;
    id:string
};

export const BlogCard = ({ authorName, title, description, publisheDate, id }: Blog) => {
    return (
        <Link to={`/blog/${id}`} className="pb-10 pt-3">
            <div className="border-b-2 px-6 py-4 flex flex-col justify-center max-w-xl w-full min-h-[200px] cursor-pointer bg-white shadow-lg 
                transition-transform transform hover:scale-105 hover:shadow-2xl rounded-lg duration-300">
                
                {/* Header with author */}
                <div className="flex text-sm items-center">
                    <div className="h-7 w-7 border-2 bg-slate-300 rounded-full flex justify-center items-center">
                        <div>{authorName[0]}</div>
                    </div>
                    <div className="pl-2 text-gray-500">{authorName}</div>
                    <div className="pl-2 text-gray-400">{publisheDate}</div>
                </div>

                {/* Title with wrapping */}
                <div className="pt-2 font-bold text-xl break-words w-full">
                    {title}
                </div>

                {/* Description with consistent width */}
                <div className="text-base break-words w-full">
                    {description.slice(0, 100) + "...."}
                </div>

                {/* Footer */}
                <div className="text-gray-400 text-sm pt-2">{`${Math.ceil(description.length / 100)} minute(s) read`}</div>
            </div>
        </Link>
    );
};
