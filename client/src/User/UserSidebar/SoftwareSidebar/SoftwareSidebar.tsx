
import './SoftwareSidebar.css';

const SoftwareSidebar = ({ setShow }: { setShow: React.Dispatch<React.SetStateAction<string>> }) => {

   



   return (
      <div>
         {/*  sidebar content */}
         <aside 
            className="fixed left-0 top-20 w-[20%] p-2 bg-slate-400 flex flex-col gap-1 shadow-xl h-[100%] shadow-gray-500 "
         >

            <li className='sidebar-content'
               onClick={() => setShow("Apptitude")}
            >
               <button> Apptitude Resources </button>
            </li>
            
            <li className='sidebar-content'
               onClick={() => setShow("MockInterview")}
            >
               <button> Mock Interview Resources </button>
            
            </li>

            <li className='sidebar-content'
               onClick={() => setShow("JobPortal")}
            >
               <button> Job Portals </button>
            </li>

            <li className='sidebar-content'
               onClick={() => setShow("DataStructuresAlgorithms")}
            >
               <button> Data Structures & Algorithms Resources </button>
            </li>

            <li className='sidebar-content'
               onClick={() => setShow("DevelopmentProjects")}
            >
               <button> Development Projects </button>
            </li>

         </aside>
         
      </div>
   );
}

export default SoftwareSidebar;
