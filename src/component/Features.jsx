import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
export default function Features() {
  return (
    <div className='bg-[#F5F7FB]  p-[80px_40px]'>
    <h1 className="text-3xl md:text-4xl font-bold text-[#172033] text-center tracking-tight mb-4">
  Features Section
</h1>
    <div className=' grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
      <div className="bg-white  border-[#E5EAF2] hover:border-[#C7D2FE] hover:cursor-pointer p-6 rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] border-2 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200">
        <div className='h-11 w-11 bg-[#E8EEFF] flex justify-center rounded-lg'>
            <ListAltOutlinedIcon className='text-4xl! text-center text-[#4F46E5] self-center '/>
        </div>
        <div>
            <h1 className='text-[18px] font-semibold text-[#172033] m-0 text-left'>Task Management</h1>
            <p className='text-[14px] font-normal text-[#64748B]'>Create, view, update, and organize tasks in one place. Keep task information accessible throughout the workflow.</p>
        </div>
        </div>
      <div className="bg-white  border-[#E5EAF2] hover:border-[#C7D2FE] hover:cursor-pointer p-6 rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] border-2 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200">
        <div className='h-11 w-11 bg-[#DDF8EC] flex justify-center rounded-lg'>
            <GroupsOutlinedIcon className='text-4xl! text-center text-[#059669] self-center '/>
        </div>
        <div>
            <h1 className='text-[18px] font-semibold text-[#172033] m-0 text-left'>Team Collaboration</h1>
            <p className='text-[14px] font-normal text-[#64748B]'>Create a team, share an invitation link, and organize work with team members.</p>
        </div>
        </div>
      <div className="bg-white  border-[#E5EAF2] hover:border-[#C7D2FE] hover:cursor-pointer p-6 rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] border-2 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200">
        <div className='h-11 w-11 bg-[#F3E8FF] flex justify-center rounded-lg'>
            <TaskOutlinedIcon className='text-4xl! text-center text-[#9333EA] self-center '/>
        </div>
        <div>
            <h1 className='text-[18px] font-semibold text-[#172033] m-0 text-left'>Task Assignment</h1>
            <p className='text-[14px] font-normal text-[#64748B]'>Assign tasks to team members so responsibilities and ownership are clear.</p>
        </div>
        </div>
      <div className="bg-white  border-[#E5EAF2] hover:border-[#C7D2FE] hover:cursor-pointer p-6 rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] border-2 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200">
        <div className='h-11 w-11 bg-[#FFF0D9] flex justify-center rounded-lg'>
            <WatchLaterOutlinedIcon className='text-4xl! text-center text-[#D97706] self-center '/>
        </div>
        <div>
            <h1 className='text-[18px] font-semibold text-[#172033] m-0 text-left'>Deadline and Priority Tracking</h1>
            <p className='text-[14px] font-normal text-[#64748B]'>Set start dates, due dates, and priority levels to organize work and identify upcoming deadlines.</p>
        </div>
        </div>
      <div className="bg-white  border-[#E5EAF2] hover:border-[#C7D2FE] hover:cursor-pointer p-6 rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] border-2 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200">
        <div className='h-11 w-11 bg-[#FFE4E8] flex justify-center rounded-lg'>
            <NotificationsActiveOutlinedIcon className='text-4xl! text-center text-[#E11D48] self-center '/>
        </div>
        <div>
            <h1 className='text-[18px] font-semibold text-[#172033] m-0 text-left'>Notifications</h1>
            <p className='text-[14px] font-normal text-[#64748B]'>Inform users about task assignments and team invitation activities through an in-app notification system.</p>
        </div>
        </div>
      <div className="bg-white  border-[#E5EAF2] hover:border-[#C7D2FE] hover:cursor-pointer p-6 rounded-xl shadow-[0_2px_8px_rgba(15,23,42,0.03)] border-2 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-200">
        <div className='h-11 w-11 bg-[#DFF3FF] flex justify-center rounded-lg'>
            <TrendingUpOutlinedIcon className='text-4xl! text-center text-[#0284C7] self-center '/>
        </div>
        <div>
            <h1 className='text-[18px] font-semibold text-[#172033] m-0 text-left'>Task Progress Tracking</h1>
            <p className='text-[14px] font-normal text-[#64748B]'>Organize tasks by status, including Pending, Working, Completed, and Overdue, to make progress easier to understand.</p>
        </div>
        </div>
    </div>
    </div>
  )
}
