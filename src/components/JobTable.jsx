import { useState } from "react";
import TableRow from "./TableRow";
import { useSelector } from "react-redux";


const JobTable = () => {

    const jobs = useSelector((state) => state.jobs.jobs);
    //console.log(jobs);
    const [filterStatus, setFilterStatus] = useState("all");

    const filteredJobs = (filterStatus === "all") ? jobs : jobs.filter((job) => job.status === filterStatus);

    const handleStatusChange = (e) => {
        setFilterStatus(e.target.value);
    }

  return (
    <div className="max-sm:overflow-x-auto w-full">
    <table className="w-full ml-auto mr-auto pl-20 pr-20 bg-white rounded-xl backdrop-blur-md bg-opacity-60">
          <thead className="border-b">
              <tr>
                  <th className="pt-4 border-r-1 border-black pb-4">Job Title</th>
                  <th className="border-gray-500 pt-4 pb-4 max-sm:hidden">Company Name</th>
                  <th className="border-gray-500 pt-4 pb-4">
                    <select name="status" id="status" className="text-sm bg-transparent" value={filterStatus} onChange={handleStatusChange} >
                        <option value="all">Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offered">Offered</option>
                    </select>
                  </th>
                  <th className="border-gray-500 pt-4 pb-4 max-sm:hidden">Date Applied</th>
                  <th className="border-gray-500 pt-4 pb-4">Action</th>
              </tr>
          </thead>

          <tbody className="divide-y">
            {filteredJobs && filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                    <TableRow 
                        key={job._id} 
                        job={job}
                    />
                ))
                ) : (
                <tr>
                    <td colSpan="5" className="text-center py-4">
                    No jobs available.
                    </td>
                </tr>
            )}
          </tbody>
    </table>
    </div>
  )
}

export default JobTable
