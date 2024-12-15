import Nav from "../components/Nav"
import JobCard from "../components/JobCard"
import JobTable from "../components/JobTable"
import JobChart from "../components/JobChart"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplay, setJobs, toggleDisplay } from "../store";
import axios from "axios";

const UserDashBoard = () => {

    const url = import.meta.env.VITE_APP_BASE_URL;
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs.jobs);
    console.log("---------->",jobs);
    
    const user = JSON.parse(localStorage.getItem("user"));
    

    useEffect(() => {
        async function fetchJobs() {
            try {
                const token = localStorage.getItem("authToken");

                if (!token) {
                    console.log("No token found. Redirect to login.");
                    return;
                }

                const response = await axios.get(`${url}/api/jobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token here
                    },
                });
                console.log("Jobs fetched successfully",response.data);
                dispatch(setJobs(response.data));
            } catch (error) {
                console.log("Error fetching jobs: ", error);
            } 
        }
        fetchJobs();
    }, [dispatch])


    const display = useSelector((state) => state.jobs.display);
    const currentJob = useSelector((state) => state.jobs.selectedJob);

    const handleClick = () => {
        dispatch(toggleDisplay());
        dispatch(setDisplay(false));
    }

  return (
    <div className="dashBoard font-poppins relative max-xl:ml-16 max-xl:mr-16 max-sm:ml-3 max-sm:mr-3">
      <div className="h-screen max-w-[1350px] ml-auto mr-auto">
        <Nav />
        <div className="flex justify-between items-center">
            <div>
                <p className="text-3xl max-sm:text-2xl max-sm:text-center">Welcome in, {user?.username}</p>

                <div className="mt-8 flex gap-2 flex-wrap max-sm:justify-center">
                    <div className="w-40">
                        <p className="text-sm mb-2 max-sm:hidden">Job Applications</p>
                        <div className="bg-black rounded-full w-full text-white h-10 flex items-center pl-2 max-sm:text-sm">{jobs.length} <p className="text-sm sm:hidden pl-1">Job Applications</p></div>
                    </div>
                    <div>
                        <p className="text-sm mb-2 max-sm:hidden">Rejected</p>
                        <div className="bg-yellow-400 rounded-full w-20 max-sm:w-auto max-sm:pr-2 max-sm:text-sm text-white h-10 flex items-center pl-2">{jobs?.filter((job) => job.status === "Rejected").length} <p className="text-sm sm:hidden pl-1">Rejected</p></div>
                    </div>
                    <div className="w-40">
                        <p className="text-sm mb-2 max-sm:hidden">Interviewing</p>
                        <div className="border-black border rounded-full w-full h-10 flex items-center pl-2 w-8/12 max-sm:text-sm">{jobs?.filter((job) => job.status === "Interviewing").length} <p className="text-sm sm:hidden pl-1">Interviewing</p></div>
                    </div>
                </div>
            </div>

            <div>
                {/* for image */}
            </div>
        </div>

        <div className={`${jobs.length == 0 ? 'hidden' : null} mt-10`}>
            <p className="text-2xl max-sm:text-center">Recent Job Applications</p>
            <div className="flex gap-4 mt-4 flex-wrap max-sm:items-center max-sm:justify-center">
                {jobs && jobs.length>0 ? (
                    jobs.map((job, index) => (
                        index<4 ? <JobCard key={index} title={job.title} status={job.status} note={job.notes} /> : null
                    ))
                ): null}
            </div>

            <p className="mt-10 text-2xl max-sm:text-center">All Applications</p>
            <div className="mt-4 w-full">
                <JobTable />
            </div>
        </div>

        <div className="w-full pb-20">
            <p className='text-2xl mt-10 max-sm:text-center'>Job Application Status</p>
            <JobChart />
        </div>

        
        {/* to view the selected job application */}
        <div className={`${!display ? "hidden" : null} h-full w-full fixed bg-black z-10 top-0 left-0 opacity-30`}></div>
        <div className={`${!display ? "hidden" : null} appDetails fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-20 w-1/3 max-sm:w-[95%] bg-white rounded-xl p-6`}>
            <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-semibold max-sm:text-xl">{currentJob.title} <span className="text-xs font-normal">({new Date(currentJob.dateApplied).toLocaleDateString()})</span></p>
                <p className="p-2 border rounded-full w-fit pt-0 pb-0">{currentJob.company}</p>
            </div>
            <p className="mb-2 max-sm:text-xs">Status: {currentJob.status}</p>
            <p className="mb-2 max-sm:text-xs">Note: {currentJob.notes}</p>

            <div className="w-full flex justify-center mt-10 max-sm:text-xs"><button className="bg-black text-white rounded-lg p-2" onClick={handleClick}>Close</button></div>
        </div>
      </div>
    </div>
  )
}

export default UserDashBoard
