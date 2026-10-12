import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import DescriptionIcon from "@mui/icons-material/Description";
import RestoreIcon from "@mui/icons-material/Restore";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [user, setUser] = useState("");
  const [time, setTime] = useState("");
  const [myteam, setMyteam] = useState(0);
  const [mytask, setMytasks] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [overdue, setOverdue] = useState(0);
  const [todayTask, setTodayTask] = useState([]);
  const ViewPage = useNavigate();
  function Timezone() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) {
      setTime("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setTime("Good Afternoon");
    } else if (hour >= 17 && hour < 21) {
      setTime("Good Evening");
    } else {
      setTime("Good Night");
    }
  }
  async function GetUsers(user_Detiles) {
    try {
      const Allusers = [];
      const docref = collection(db, "Tems");
      const getData = await getDocs(docref);
      getData.forEach((ele) => {
        if (ele.data().createdby.id == user_Detiles.id) {
          const get_users = ele.data().users;
          get_users.map((users) => {
            if (Allusers.length == 0) {
              Allusers.push(users);
            } else {
              Allusers.map((res) => {
                if (res.id != users.id) {
                  Allusers.push(users);
                }
              });
            }
          });
        }
      });
      setMyteam(Allusers.length);
    } catch (error) {
      console.log(error);
    }
  }
  async function Task(user_Detiles) {
    const full_date = new Date();
    const docref = collection(db, "createTask");
    const getData = await getDocs(docref);
    let task_count = 0;
    let completed_task_count = 0;
    let overdue_count = 0;
    getData.forEach((ele) => {
      const data = ele.data();
      const Today = [];
      if (user_Detiles.id === data.assign.userid) {
        task_count++;
        const date = full_date.getDate();
        const month = full_date.getMonth();
        const year = full_date.getFullYear();
        const today_date = `${year}-${month + 1}-${date}`;
        console.log(data);
        console.log("Today", today_date);
        console.log("Start Date", data.sdate);
        if (today_date == data.sdate && data.CompletedDate == "") {
          Today.push(data);
        }
        if (data.CompletedDate !== "") {
          completed_task_count++;
        } else {
          const date = full_date.getDate();
          const month = full_date.getMonth() + 1;
          const year = full_date.getFullYear();

          if (`${year}-${month}-${date}` > data.edate) {
            overdue_count++;
          }
        }
      }
      console.log("Today Task", Today);
      setTodayTask(Today);
    });
    setMytasks(task_count);
    setCompleted(completed_task_count);
    setOverdue(overdue_count);
  }
  useEffect(() => {
    onAuthStateChanged(auth, (current_user) => {
      if (current_user != null) {
        const users_detiles = {
          name: current_user.displayName,
          id: current_user.uid,
        };
        setUser(users_detiles.name);
        GetUsers(users_detiles);
        Task(users_detiles);
      }
    });
    Timezone();
  }, []);

  return (
    <div className="p-3 sm:p-6 md:p-8 ">
      <div>
        <h1 className="text-[12px] font-semibold text-[#6C5CE7] uppercase ">
          YOUR WORKSPACE
        </h1>
        <h1 className="text-[32px] font-bold text-[#241B42]  ">Dashboard</h1>
        <h1 className="text-[24px] font-medium text-[#6C5CE7] ">
          {time},{user}
        </h1>
        <p className="text-[15px] font-normal text-[#8B879B] ">
          Ready to make progress today?
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        <div className="bg-[#FFFFFF] border-2 border-[#EAE7F2] rounded-2xl p-6 shadow-[0_4px_20px_rgba(36, 27, 66, 0.04)] hover:bg-[#FBFAFF] hover:cursor-pointer ">
          <PeopleIcon className="bg-[#F0EDFF] h-12 w-12 rounded-xl text-[#6C5CE7] text-[24px]!" />
          <h1 className="font-bold  text-[32px]">{myteam}</h1>
          <h1 className="text-[18px] font-semibold text-[#241B42] mt-2 ">
            My Team
          </h1>
          <p className="text-[14px] font-normal text-[#8B879B] mt-1">
            Manage your team members
          </p>
        </div>
        <div className="bg-[#FFFFFF] border-2 border-[#EAE7F2] rounded-2xl p-6 shadow-[0_4px_20px_rgba(36, 27, 66, 0.04)] hover:bg-[#FBFAFF] hover:cursor-pointer ">
          <DescriptionIcon className="bg-[#F0EDFF] h-12 w-12 rounded-xl text-[#6C5CE7] text-[24px]!" />
          <h1 className="font-bold  text-[32px]">{mytask}</h1>
          <h1 className="text-[18px] font-semibold text-[#241B42] mt-2 ">
            My Task
          </h1>
          <p className="text-[14px] font-normal text-[#8B879B] mt-1">
            View and manage your tasks
          </p>
        </div>
        <div className="bg-[#FFFFFF] border-2 border-[#EAE7F2] rounded-2xl p-6 shadow-[0_4px_20px_rgba(36, 27, 66, 0.04)] hover:bg-[#FBFAFF] hover:cursor-pointer ">
          <TaskIcon className="bg-[#F0EDFF] h-12 w-12 rounded-xl text-[#6C5CE7] text-[24px]!" />
          <h1 className="font-bold  text-[32px]">{completed}</h1>
          <h1 className="text-[18px] font-semibold text-[#241B42] mt-4 ">
            Completed
          </h1>
          <p className="text-[14px] font-normal text-[#8B879B] mt-2">
            View all completed tasks
          </p>
        </div>
        <div className="bg-[#FFFFFF] border-2 border-[#EAE7F2] rounded-2xl p-6 shadow-[0_4px_20px_rgba(36, 27, 66, 0.04)] hover:bg-[#FBFAFF] hover:cursor-pointer ">
          <RestoreIcon className="bg-[#F0EDFF] h-12 w-12 rounded-xl text-[#6C5CE7] text-[24px]!" />
          <h1 className="font-bold  text-[32px]">{overdue}</h1>
          <h1 className="text-[18px] font-semibold text-[#241B42] mt-4 ">
            Over due
          </h1>
          <p className="text-[14px] font-normal text-[#8B879B] mt-2">
            Track your overdue tasks
          </p>
        </div>
      </div>
      {todayTask.map((res, index) => (
            <div
              key={index}
              onClick={() => ViewPage(`/view-task/${res.id}`)}
              className="p-4 border-2 border-[#EAE7F2] gap-3 hover:bg-[#FBFAFF] hover:cursor-pointer rounded-2xl shadow-xl mt-2"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h1 className="text-4  font-semibold text-[#241B42] ">
                    {res.title}
                  </h1>
                  <p className="line-clamp-2 text-[14px] font-normal text-[#8B879B]">
                    {res.description}
                  </p>
                </div>
                <div>
                  <p
                    className={`${res.priority == "High" ? "bg-[#FEE2E2] text-[#B91C1C]" : res.priority == "Medium" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#DCFCE7] text-[#166534]"} w-fit items-center justify-center px-3 py-1 text-[12px] font-semibold rounded-full`}
                  >
                    {res.priority}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor=""
                    className="text-[12px] font-semibold uppercase text-[#8B879B] mb-1"
                  >
                    END DATE
                  </label>
                  <p className="text-[14px] font-medium text-[#241B42]">
                    {res.edate}
                  </p>
                </div>
                <div className="text-center">
                  <label
                    htmlFor=""
                    className="text-[12px] text-[#8B879B] font-semibold mb-1"
                  >
                    Status
                  </label>
                  <p
                    className={`${res.status == "Pending" ? "bg-[#F3E8FF] text-[#7E22CE]" : res.status == "In Progress" ? "bg-[#DBEAFE] text-[#1D4ED8]" : "bg-[#DCFCE7] text-[#166534]"} w-fit items-center justify-center px-3 py-1 text-[12px] font-semibold rounded-full`}
                  >
                    {res.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
