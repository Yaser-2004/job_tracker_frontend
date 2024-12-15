import { Link } from "react-router"
import Nav from "../components/Nav"


const Home = () => {

  return (
    <div className="h-screen max-w-[1350px] ml-auto mr-auto font-poppins max-xl:ml-16 max-xl:mr-16 max-sm:ml-4 max-sm:mr-4">
        <Nav />

        <div className="mt-16 ml-auto mr-auto flex flex-col gap-6 items-center justify-center">
            <h1 className="text-7xl font-bold text-center max-sm:text-4xl max-sm:text-left">Manage Jobs like never Before</h1>
            <div className="w-5/6 max-sm:w-full max-sm:text-sm">
                <p className="text-left text-gray-700 mb-12 max-sm:hidden">
                Discover endless opportunities and take control of your future. Our platform helps you track, manage, and grow your job applications seamlessly. From submitting applications to staying organized throughout the hiring process, we provide the tools to help you succeed in landing your dream role. Join us and make your career aspirations a reality!
                </p>

                <p className="text-left text-gray-700 mb-12 sm:hidden">
                Discover endless opportunities and take control of your future. Our platform helps you track, manage, and grow your job applications seamlessly.
                </p>

                <div className="flex gap-6">
                    <Link to={'/register'} className="border border-black bg-black text-white rounded-full flex justify-center items-center h-12 w-[200px]">Get Started</Link>
                    <Link to={'/login'} className="bg-yellow-400 text-white rounded-full flex justify-center items-center h-12 w-[200px]">Login</Link>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
