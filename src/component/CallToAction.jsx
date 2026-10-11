import { useNavigate } from "react-router-dom";

export default function CallToAction() {
           const login = useNavigate();
    function goLogin() {
      login("/login");
    }
  return (
    <div className="bg-[#0F172A] p-[64px_32px] text-center">
       <div>
         <h1 className="text-[40px] font-bold mb-5 text-[#FFFFFF]">Ready to Organize Your Work?</h1>
        <p className="text-[18px] text-[#CBD5E1] font-normal mb-5">Bring your tasks, deadlines, and team collaboration together with TaskFlow. Start organizing your work in one place.</p>
        <div className="bg-[#1E293B] text-[#E2E8F0]  p-6 justify-center rounded-xl mb-8 flex gap-8  ">
            <p className="text-[16px] font-medium text-[#E2E8F0]">Organized task management</p>
            <p className="text-[16px] font-medium text-[#E2E8F0]">Clear task ownership</p>
            <p className="text-[16px] font-medium text-[#E2E8F0]">Team collaboration</p>
        </div>
        <button onClick={goLogin} className="bg-[#3B82F6] text-[#FFFFFF] text-[16px] font-semibold p-[16px_32px] rounded-lg hover:cursor-pointer hover:bg-[#2563EB] duration-300">Get Start With TaskFlow</button>
       </div>
    </div>
  )
}
