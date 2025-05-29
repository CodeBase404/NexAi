import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Promt from "../components/Promt";
import { PanelTopOpen, SquarePen } from "lucide-react";
import { useNavigate } from "react-router";

function Home() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white overflow-hidden">
      <div
        className={`${
          isSidebarOpen
            ? "w-50 lg:w-65 fixed md:relative top-0 left-0 h-full z-100"
            : "w-0"
        }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen ? "w-[82%]" : "w-full"
        } `}
      >
        {/* Header for mobile */}
        <div className="fixed left-0 flex items-center justify-between p-1 px-4">
          {/* <div className="text-xl font-bold">deepseek</div> */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="cursor-pointer rounded-xl hover:bg-gray-200 hover:text-black p-1.5"
          >
            <PanelTopOpen className="w-6 h-6 -rotate-90" />
          </button>
          <button
            className="cursor-pointer hover:bg-gray-200 hover:text-black rounded-xl p-1.5"
            onClick={() => {navigate("/");}}
          >
            <SquarePen className="w-6 h-6" />
          </button>
        </div>

        {/* Message area */}
        <div className="flex-1 flex items-center justify-center">
          <Promt />
        </div>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0   bg-opacity-50  md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Home;
