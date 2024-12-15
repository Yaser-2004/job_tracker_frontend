import { useState } from "react";
import Nav from "../components/Nav"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { deleteJob, updateJob } from "../store";
import { useNavigate } from "react-router";


const EditJob = () => {

  const url = import.meta.env.VITE_APP_BASE_URL;

    const selectedJob = useSelector((state) => state.jobs.selectedJob);
    const [jobData, setJobData] = useState({ ...selectedJob });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.value);
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    }

    const handleSave = async () => {
        try {
            setLoadingSave(true);
            const token = localStorage.getItem("authToken"); // Retrieve the token
            if (!token) {
                throw new Error("User not authenticated");
            }

            const headers = {
                Authorization: `Bearer ${token}`, 
            };

            const response = await axios.put(
                `${url}/api/jobs/${selectedJob._id}`,
                jobData,
                { headers } 
            );
            console.log("Updated job:", response.data);
            dispatch(updateJob(response.data));
        } catch (error) {
            console.error("Error updating job application ", error);
            window.alert("Error updating job application");
        } finally {
            setLoadingSave(false);
            navigate("/user");
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this job application?")) {
          try {
            setLoadingDelete(true);
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("User not authenticated");
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            await axios.delete(
                `${url}/api/jobs/${selectedJob._id}`,
                { headers }
            );
            console.log("Job application deleted successfully");
    
            // Remove job from Redux store
            dispatch(deleteJob(selectedJob.id));
          } catch (error) {
            console.error("Error deleting job:", error);
            window.alert("Error deleting job application");
          } finally {
            setLoadingDelete(false);
            navigate("/user");
          }
        }
    };


  return (
    <div className="h-screen max-w-[1350px] ml-auto mr-auto font-poppins max-xl:ml-16 max-xl:mr-16 max-sm:ml-3 max-sm:mr-3">
      <Nav />

      <p className="text-center text-2xl max-sm:text-xl">Edit Job Application</p>
      <div className="mt-6 flex justify-center w-full">
        <form action="" className="w-1/2 max-lg:w-3/4 max-sm:w-full max-sm:text-sm">
            <input type="text" placeholder="Job Title" value={jobData.title} className="rounded-xl h-12 w-full pl-3 mb-2" name="title" required onChange={handleChange} />
            <input type="text" placeholder="Company" value={jobData.company} className="rounded-xl h-12 w-full pl-3 mb-2" name="company" required onChange={handleChange} />
            <div className="flex items-center gap-2">
              <input type="text" placeholder="Status" value={jobData.status} className="rounded-xl h-12 w-full pl-3 mb-2" name="status" required onChange={handleChange} />
            </div>
            <textarea name="notes" value={jobData.notes} id="" className="w-full rounded-xl h-20 mb-2 p-3" placeholder="Notes..." required onChange={handleChange} ></textarea>
            <div className="flex gap-2 items-center">
                <button className="bg-black rounded-xl text-white h-12 w-full mt-2" type="button" onClick={handleSave} disabled={loadingSave}>{loadingSave ? "Saving..." : "Save"}</button>
                <button className="bg-yellow-400 rounded-xl text-white h-12 w-full mt-2" type="button" onClick={handleDelete} disabled={loadingDelete}>{loadingDelete ? "Deleting..." : "Delete"}</button>
            </div>
        </form>
      </div>

    </div>
  )
}

export default EditJob
