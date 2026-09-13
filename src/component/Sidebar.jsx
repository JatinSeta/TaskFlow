export default function Sidebar() {
  return (
    <div className=" flex-col p-2 justify-center">
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">Dashboard</button>
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">My Tasks</button>
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">Projects</button>
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">My Team</button>
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">Activity</button>
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">Notification</button>
        <button className="p-4 w-[90%] bg-blue-500 m-3 self-center text-white rounded-2xl">Log Out</button>
    </div>
  )
}
