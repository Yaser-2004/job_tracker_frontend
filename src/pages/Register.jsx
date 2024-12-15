import { useState } from "react"
import Nav from "../components/Nav"
import axios from "axios";
import { useNavigate } from "react-router";


const Register = () => {

    const url = import.meta.env.VITE_APP_BASE_URL;

    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/auth/register`, {
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
            })

            setCredentials({username: "", email: "", password: ""});
            console.log("Registration successfull", response.data);
            
        } catch (error) {
            console.error('Error registering user', error);
        } finally {
            setLoading(false);
            navigate('/login');
        }
    }

  return (
    <div className="h-screen max-w-[1350px] ml-auto mr-auto font-poppins max-xl:ml-16 max-xl:mr-16 max-sm:ml-3 max-sm:mr-3">
      <Nav />

      <p className="text-center text-2xl">Register</p>
      <div className="mt-6 flex justify-center w-full">
        <form action="" className="w-1/2 max-sm:w-full" onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" className="rounded-xl h-12 w-full pl-3 mb-2" name="username" required onChange={handleChange} />
            <input type="text" placeholder="Email" className="rounded-xl h-12 w-full pl-3 mb-2" name="email" required onChange={handleChange} />
            <div className="flex items-center gap-2">
              <input type="password" placeholder="Password" className="rounded-xl h-12 w-full pl-3 mb-2" name="password" required onChange={handleChange} />
            </div>
            <div className="flex gap-2 items-center">
                <button className="bg-black rounded-xl text-white h-12 w-full mt-2" disabled={loading}>{loading ? "Please wait..." : "Register"}</button>
            </div>
        </form>
      </div>

    </div>
  )
}

export default Register
