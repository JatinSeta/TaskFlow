
export default function HowWeWork() {
  return (
    <div className="bg-gray-50 px-4 py-12 md:px-10 md:py-16">
        <h1 className="text-center text-3xl font-semibold mb-10 md:mb-12">How TaskFlow Works</h1>
        
      <div className="flex flex-col  gap-5 p-6 border-l-4 border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl ">
          <div className="flex rounded-xl  border-gray-100 gap-4 hover:bg-blue-50 hover:cursor-pointer">

            <div className="bg-blue-100 rounded-md flex h-15 w-15   justify-center">
                <h1 className="text-3xl text-blue-600   text-center self-center font-bold">01</h1>
            </div>
            <div className="self-center">
                <h1 className="text-lg md:text-xl font-semibold  text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Create an Account</h1>
                <p className="text-sm md:text-base text-gray-500  font-normal">Sign up or log in to access your personal workspace.</p>
            </div>
        </div>
          <div className="flex rounded-xl  border-gray-100 gap-4 hover:bg-blue-50 hover:cursor-pointer">
            <div className="bg-blue-100 rounded-md flex h-15 w-15 justify-center">
                <h1 className="text-3xl text-blue-600   text-center self-center font-bold">02</h1>
            </div>
            <div className="self-center">
                <h1 className="text-lg md:text-xl font-semibold  text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Create or Join a Team</h1>
                <p className="text-sm md:text-base text-gray-500 leading-7 font-normal">Set up a team or join an existing team through its invitation process.</p>
            </div>
        </div>
          <div className="flex rounded-xl  border-gray-100 gap-4 hover:bg-blue-50 hover:cursor-pointer">
            <div className="bg-blue-100 rounded-md flex h-15 w-15   justify-center">
                <h1 className="text-3xl text-blue-600   text-center self-center font-bold">03</h1>
            </div>
            <div className="self-center">
                <h1 className="text-lg md:text-xl font-semibold  text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Create and Assign Tasks</h1>
                <p className="text-sm md:text-base text-gray-500 leading-7 font-normal">Add task details, choose an assignee, set priority, and define deadlines.</p>
            </div>
        </div>
          <div className="flex rounded-xl  border-gray-100 gap-4 hover:bg-blue-50 ">
            <div className="bg-blue-100 rounded-md flex h-15 w-15   justify-center">
                <h1 className="text-3xl text-blue-600   text-center self-center font-bold">04</h1>
            </div>
            <div className="self-center">
                <h1 className="text-lg md:text-xl font-semibold  text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Track and Complete Work</h1>
                <p className="text-sm md:text-base text-gray-500 leading-7 font-normal">Update task statuses, monitor deadlines, and check notifications for relevant updates.</p>
            </div>
        </div>
     
      </div>
    </div>
  )
}
