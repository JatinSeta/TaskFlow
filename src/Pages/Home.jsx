
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const login = useNavigate()
  function goLogin(){
    login('/login')
    
  }
  
  return (
    <div className="m-5">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-4xl font-bold text-center m-1">
          PROJECT MANAGEMENT, SIMPLIFIED
        </h1>
        <h1 className="text-2xl sm:text-2xl text-center m-1">
          Manage your team's work in one place.
        </h1>
        <p className="text-center  m-1">
          Plan projects, assign tasks, track progress, and collaborate with your
          team effortlessly. Keep everyone aligned and every deadline on track.
        </p>
        <button  className="bg-blue-500 w-[50%] sm:w-[15%] p-2 rounded-2xl self-center items-center text-white m-1 font-bold" onClick={goLogin}>
          Get Started
        </button>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-center m-2 font-mono  text-[18px]">
          No complicated setup • Easy to use • Built for teams
        </p>
        <h1 className="text-center m-2 font-semibold text-[20px]">EVERYTHING YOUR TEAM NEEDS</h1>
        <div className="flex justify-center">
          <div className="font-mono text-[16px] font-black m-1">
            <p className="p-1 ">✓ Project Management</p>
            <p className="p-1 ">✓ Team Collaboration</p>
            <p className="p-1 ">✓ Deadlines & Calendar</p>
          </div>
          <div className="font-mono text-[16px] font-black m-1">
            <p className="p-1 ">✓ Task Tracking</p>
            <p className="p-1 ">✓ Progress Tracking  </p>
            <p className="p-1 ">✓ Real-Time Updates</p>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}
