import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
 <div className="w-screen min-h-screen">
  <Navbar />

  <div className="flex w-full">
    <aside className="lg:w-[20%] shrink-0">
      <Sidebar />
    </aside>

    <main className="w-full min-w-0 lg:w-[80%]">
      <Outlet />
    </main>
  </div>
</div>
  )
}
