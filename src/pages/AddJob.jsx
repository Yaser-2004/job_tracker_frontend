import Nav from "../components/Nav"
import { useState } from "react"
import axios from "axios";

const AddJob = () => {

  const date = new Date();
  const url = import.meta.env.VITE_APP_BASE_URL;

  const [jobApp, setJobApp] = useState({
    title: "",
    company: "",
    status: "",
    dateApplied: date,
    notes: ""
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobApp({...jobApp, [e.target.name]: e.target.value})
    //console.log("new date obj",jobApp);
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("User not authenticated");
    }
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
      console.log(jobApp);
      setLoading(true);
      
      const response = await axios.post(
          `${url}/api/jobs`,
          { ...jobApp}, 
          { headers }
      );
      console.log("Job successfully added", response.data);
      setJobApp({...jobApp, title: "", company: "", dateApplied: new Date().toISOString().split('T')[0], status: "", notes: ""});
    } catch (error) {
      console.error("Error adding job application: ", error);
      window.alert("Error adding application. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen max-w-[1350px] ml-auto mr-auto font-poppins max-xl:ml-16 max-xl:mr-16 max-sm:ml-3 max-sm:mr-3">
        <Nav />

        <p className="text-center text-2xl max-sm:text-xl max-sm:mt-10">Add New Job Application</p>

        <div className="mt-6 flex justify-center w-full">
          <form action="" className="w-1/2 max-lg:w-3/4 max-sm:w-full max-sm:text-sm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Job Title" value={jobApp.title} className="rounded-xl h-12 w-full pl-3 mb-2" name="title" required onChange={handleChange} />
            <input type="text" placeholder="Company" value={jobApp.company} className="rounded-xl h-12 w-full pl-3 mb-2" name="company" required onChange={handleChange} />
            <div className="flex items-center gap-2">
              <input type="text" placeholder="YYYY-MM-DD" value={new Date(jobApp.dateApplied).toISOString().split('T')[0]} className="rounded-xl h-12 w-full pl-3 mb-2" name="dateApplied" onChange={handleChange} />
              <input type="text" placeholder="Status" value={jobApp.status} className="rounded-xl h-12 w-full pl-3 mb-2" name="status" required onChange={handleChange} />
            </div>
            <textarea name="notes" id="" value={jobApp.notes} className="w-full rounded-xl h-20 mb-2 p-3" placeholder="Notes..." required onChange={handleChange}></textarea>
            <button className="bg-black rounded-xl text-white h-12 w-full mt-2" type="submit" disabled={loading}>{loading ? "Please wait..." : "Submit Application"}</button>
          </form>
        </div>
        
    </div>
  )
}

export default AddJob
