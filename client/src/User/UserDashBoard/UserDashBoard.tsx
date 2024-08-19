
import { useState } from 'react';
import UserNavbar from '../UserNavbar/UserNavbar';
import SoftwareSidebar from '../UserSidebar/SoftwareSidebar/SoftwareSidebar';
import { Apptitude } from '../ApptitudeSites/Apptitude';
import Interview from '../InterviewSites/Interview';
import JobPortal from '../JobSites/JobPortal';
import Projects from '../Projects/Projects';
import DSASource from '../DSASource/DSASource';

const UserDashBoard = () => {

   const [show, setShow] = useState("")

   return (
      <div>
         <UserNavbar />
          
         <SoftwareSidebar  setShow={setShow} />

         <div className='fixed right-0 top-20 w-[80%] p-2 h-[100%]'>


            {/* Conditional Randering  */}

            { show === "Apptitude" && <Apptitude /> }
            { show === "MockInterview" && <Interview /> }
            { show === "JobPortal" && <JobPortal /> }
            { show === "DataStructuresAlgorithms" && <DSASource /> }
            { show === "DevelopmentProjects" && <Projects /> }
       


         </div>
      </div>
   );
}

export default UserDashBoard;
