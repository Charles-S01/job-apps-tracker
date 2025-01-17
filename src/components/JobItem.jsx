import { useNavigate } from "react-router-dom"

export default function JobItem({ id, title, company, location, dateApplied, status, link }) {
    const navigate = useNavigate()
    return (
        <>
            <tr
                onClick={() => navigate(`/job-form/${id}`)}
                className="overflow-ellipsis border-t-2 border-blue-200 text-center md:hover:cursor-pointer md:hover:bg-gray-500 md:hover:bg-opacity-10"
            >
                <td className="border-r-2 border-blue-100 p-4">{title}</td>
                <td className="border-r-2 border-blue-100">{company}</td>
                <td className="hidden border-r-2 border-blue-100 text-center md:table-cell">
                    {location}
                </td>
                <td className="hidden border-r-2 border-blue-100 text-center md:table-cell">
                    {dateApplied}
                </td>
                <td>{status.charAt(0).toUpperCase() + status.slice(1)}</td>
            </tr>
        </>
    )
}
