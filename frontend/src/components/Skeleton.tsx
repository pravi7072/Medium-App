export const Skeleton=()=>{
    return <div>
        <div className="border-b-2 px-6 py-4 flex flex-col justify-center max-w-xl w-full min-h-[200px] cursor-pointer">
            {/* Header with author */}
            <div className="flex text-sm items-center">
                <div className="h-7 w-7 border-2 bg-slate-300 rounded-full flex justify-center items-center">
                    <div className="h-2.5 bg-gray-200 rounded-full"></div>
                </div>
                <div className="pl-2 text-gray-500"><div className="h-2.5 w-14 bg-gray-200 rounded-full"></div>
                </div>
                <div className="pl-2 text-gray-400"><div className="h-2.5 w-18 bg-gray-200 rounded-full"></div>
                </div>
            </div>

            {/* Title with wrapping */}
            <div className="pt-2 font-bold text-xl break-words w-full">
                <div className="h-2.5 bg-gray-200 rounded-full"></div>

            </div>

            {/* Description with consistent width */}
            <div className="pt-2 text-base break-words w-full">
                <div className="h-2.5 bg-gray-200 rounded-full"></div>

            </div>

            {/* Footer */}
            <div className="text-gray-400 text-sm pt-2"> <div className="h-2.5 bg-gray-200 rounded-full"></div>
            </div>
        </div>
    </div>
}