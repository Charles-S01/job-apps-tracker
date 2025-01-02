import { useQuery } from "@tanstack/react-query"
import { getJobs } from "../api/jobs"
import JobItem from "./JobItem"
import LoadingIcon from "./icons/LoadingIcon"

export default function Bookmarks(params) {
    const { data, isLoading } = useQuery({
        queryKey: ["jobs"],
        queryFn: () => getJobs({ jobId: null, status: "bookmarked" }),
    })

    return (
        <>
            <div className="flex flex-1 flex-col gap-4">
                <p className="text-2xl">
                    <strong>Bookmarks</strong>
                </p>

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

                                {data.jobs.map((job) => {
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
