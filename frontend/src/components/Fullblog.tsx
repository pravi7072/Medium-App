
import { Blog } from "../hooks"
export const  Fullblog=({blogs}:{blogs:Blog})=>{
    return  <div className="flex max-w-3xl justify-evenly ">
            <div className="flex break-words flex-col pt-4 ">
                <div className="font-bold  text-4xl">
                    {blogs.title}
                </div>
                <div className="text-sm pt-4 text-gray-400">
                    posted on {blogs.publisheDate}
                </div>
                <div className="font-light pt-4">
                    {blogs.content}
                </div>
            </div>
            <div className="flex flex-col pt-10 pl-10">
                <div className="text-sm">
                    Author
                </div>
                <div className="flex pt-4">
                    <div className="pr-4">
                        <div className="h-7  w-7 border-2  bg-slate-300 rounded-full flex justify-center items-center">
                            <div className="">{blogs.author.name[0]}</div>
                        </div>
                    </div>
                    <div className="font-bold text-lg pr-4">
                        {blogs.author.name}
                    </div>
                </div>
                
            </div>
    </div>
}