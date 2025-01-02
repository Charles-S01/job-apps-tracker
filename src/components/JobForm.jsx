import { useEffect, useState } from "react"
import BackButton from "./BackButton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createJob, getJobs, updateJob } from "../api/jobs"
import { useNavigate, useParams } from "react-router-dom"
import LoadingIcon from "./icons/LoadingIcon"

export default function JobForm(params) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { jobId } = useParams()

    const [title, setTitle] = useState()
    const [location, setLocation] = useState()
    const [company, setCompany] = useState()
    const [link, setLink] = useState()
    const [dateApplied, setDateApplied] = useState()
    const [status, setStatus] = useState("applied")

    // const [isEditMode, setIsEditMode] = useState(false)

    const { data, isLoading } = useQuery({
        queryKey: ["job"],
        queryFn: () => {
            if (jobId) {
                return getJobs({ jobId })
            }
        },
    })

    useEffect(() => {
        console.log("useEffect no data")
        if (data && !isLoading && jobId) {
            console.log("useEffect")
            const job = data.jobs[0]
            setTitle(job.title)
            setLocation(job.location)
            setCompany(job.company)
            setLink(job.link)
            setDateApplied(job.dateApplied)
            setStatus(job.status)
        }
    }, [data])

    // const job = data?.jobs[0]

    const { mutateAsync: createJobMutation } = useMutation({
        mutationFn: () => createJob({ title, location, company, link, dateApplied, status }),
        onSuccess: () => {
            queryClient.invalidateQueries(["jobs"])
            navigate(history.back())
        },
    })

    const { mutateAsync: updateJobMutation } = useMutation({
        mutationFn: () => updateJob({ jobId, title, location, company, link, dateApplied, status }),
        onSuccess: () => {
            navigate(history.back())
        },
    })

    async function handleSubmit(e) {
        e.preventDefault()

        if (jobId) {
            await updateJobMutation()
        } else {
            await createJobMutation()
        }
    }

    return (
        <>
            <div className="relative flex flex-1 items-center justify-center border-0 border-zinc-500">
                <BackButton />

                {isLoading ? (
                    <>
                        <LoadingIcon />
                    </>
                ) : (
                    <>
                        <div className="form-box flex max-w-96 flex-1 flex-col gap-4 rounded-xl bg-zinc-900 p-4">
                            <p className="self-center text-2xl">
                                <strong>{jobId ? "Job details" : "Add job"}</strong>
                            </p>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <label className="flex flex-col gap-1">
                                    <p>Job title</p>

                                    <input
                                        value={title}
                                        type="text"
                                        placeholder="title"
                                        name="title"
                                        className="rounded-lg bg-zinc-800 p-2"
                                        onChange={(event) => setTitle(event.target.value)}
                                        required
                                    />
                                </label>

                                <label className="flex flex-col gap-1">
                                    <p>Company</p>

                                    <input
                                        value={company}
                                        type="text"
                                        placeholder="company"
                                        name="company"
                                        className="rounded-lg bg-zinc-800 p-2"
                                        onChange={(event) => setCompany(event.target.value)}
                                    />
                                </label>
                                <label className="flex flex-col gap-1">
                                    <p>Location</p>

                                    <input
                                        value={location}
                                        type="text"
                                        placeholder="location"
                                        name="location"
                                        className="rounded-lg bg-zinc-800 p-2"
                                        onChange={(event) => setLocation(event.target.value)}
                                    />
                                </label>
                                <div className="flex justify-between">
                                    <label className="flex flex-col gap-1">
                                        <p>Date applied</p>

                                        <input
                                            value={dateApplied}
                                            type="date"
                                            name="date-applied"
                                            id="date-applied"
                                            // value="2018-07-22"
                                            className="self-start rounded-lg bg-zinc-800 p-2"
                                            onChange={(event) => setDateApplied(event.target.value)}
                                        />
                                    </label>
                                    <label className="flex flex-col gap-1">
                                        <p>Status</p>

                                        <select
                                            value={status}
                                            name="status"
                                            id="status"
                                            // defaultValue="applied"
                                            className="self-start rounded-lg bg-zinc-800 p-2"
                                            onChange={(event) => setStatus(event.target.value)}
                                        >
                                            <option value="bookmarked">Bookmarked</option>
                                            <option value="applied">Applied</option>
                                            <option value="interviewing">Interviewing</option>
                                            <option value="negotiating">Negotiating</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </label>
                                </div>
                                <label className="flex flex-col gap-1">
                                    <p>Link</p>

                                    <input
                                        value={link}
                                        type="text"
                                        placeholder="link"
                                        name="link"
                                        className="rounded-lg bg-zinc-800 p-2"
                                        onChange={(event) => setLink(event.target.value)}
                                    />
                                </label>

                                <button className="rounded-lg bg-blue-500 p-2">Finish</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
