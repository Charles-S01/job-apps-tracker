import { useContext } from "react"
import { AppContext } from "../App"
import AddIcon from "./icons/AddIcon"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getJobs } from "../api/jobs"
import LoadingIcon from "./icons/LoadingIcon"
import JobItem from "./JobItem"
// import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function Home(params) {
    const queryClient = useQueryClient()
    const { userData } = useContext(AppContext)

    const { data, isLoading } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => getJobs({ jobId: null }),
    })

    return (
        <>
            <div className="flex flex-1 flex-col gap-4 border-0 border-gray-500">
                <div className="flex items-center justify-between">
                    <Link to={`/job-form`} className="ml-auto">
                        <button className="flex gap-1 rounded-lg border-2 border-white border-opacity-30 p-1 opacity-70 lg:hover:border-transparent lg:hover:bg-zinc-900 lg:hover:opacity-100">
                            <p>Add job</p>
                            <AddIcon />
                        </button>
                    </Link>
                </div>

                <div className="jobs flex flex-col gap-2">
                    {isLoading ? (
                        <>
                            <LoadingIcon />
                        </>
                    ) : (
                        <>
                            <table className="table-fixed bg-neutral-700">
                                <tr className="border-b-2 border-zinc-900 bg-zinc-900">
                                    <th className="p-4">Title</th>
                                    <th>Company</th>
                                    <th className="hidden text-center md:table-cell">Location</th>
                                    <th className="hidden text-center md:table-cell">
                                        Date Applied
                                    </th>
                                    <th>Status</th>
                                </tr>

                                {data?.jobs.map((job) => {
                                    return (
                                        <>
                                            <JobItem
                                                key={job.id}
                                                id={job.id}
                                                title={job.title}
                                                company={job.company}
                                                location={job.location}
                                                dateApplied={job.dateApplied}
                                                status={job.status}
                                            />
                                        </>
                                    )
                                })}
                            </table>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
