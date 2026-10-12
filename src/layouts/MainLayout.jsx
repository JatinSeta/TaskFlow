
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/Sidebar'

export default function MainLayout() {
  return (
 <div className="w-screen min-h-screen">
  <div className="w-full">
     <aside>
      <Sidebar/>
     </aside>
    <main className="w-full min-w-0">
      <Outlet />
    </main>

  </div>
</div>
  )
}
