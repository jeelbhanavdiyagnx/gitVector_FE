import CommitClassification from "@/components/Branch/CommitClassification";

export default function EventMessage({ item }) {
    return (
        <div className="flex   items-center gap-2 ">
            <div className="flex items-center justify-center">
                {/* Commit Classification */}
                <span className="flex items-center px-1">
                    {item?.type && (
                         <CommitClassification
                         Tooltip={true}
                         type={item?.type}
                     />
                    )}
                    {item?.commit?.commitClassification && (
                        <CommitClassification
                            Tooltip={true}
                            type={item?.commit?.commitClassification}
                        />
                    )}
                </span>
            </div>
            <h1 className="text-sm leading-5">
                {item.message}
                <span className="text-gray-600 text-[12px]">({new Date(item.createdAt).toLocaleTimeString()})</span>
                <span
                    className={`text-sm leading-5 font-semibold pl-1 ${item?.commit?.review?.overview_summary?.final_score > 6
                        ? "text-green-700"
                        : "text-red-700"
                        }`}
                >
                    {item?.commit?.review?.overview_summary?.final_score}
                </span>
            </h1>
        </div>
    )
}