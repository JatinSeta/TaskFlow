export default function About() {
  return (
    <div className="bg-[#F8FAFC] md:p-[96px_24px] sm:p-[56px_20px] p-10">
        <p className="bg-[#DBEAFE] text-[#4338CA] text-[12px] font-bold rounded-lg text-center w-fit p-[8px_12px]">ABOUT TASKFLOW</p>
        <h1 className="text-[#111827] lg:text-[42px] text-[30px] font-extrabold bm-[24px] md:text-[36px] ">Everything You Need to Manage Your Work</h1>
        <p className="text-[#64748B] text-[16px] font-normal w-full p-1 space-[20px] mb-5 pr-8 mr-8">TaskFlow is a web-based task management application designed to simplify task organization and team collaboration. Users can create tasks, assign responsibilities, set deadlines, manage priorities, and monitor progress through a centralized dashboard.
            </p>
            <p className="text-[#64748B] text-[16px] font-normal w-full p-1 space-[20px] mb-5 pr-8 mr-8">
            With Firebase Authentication and Cloud Firestore, TaskFlow supports user authentication and cloud-based task management. Its team functionality helps users collaborate with team members, while notifications keep users informed about task assignments and team activities.</p>
    </div>
  )
}
