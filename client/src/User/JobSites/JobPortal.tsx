import { useEffect, useState } from "react";


const JobPortal = () => {

   const sites = [
      {
         id: 1,
         title: "LinkedIn",
         url: "https://www.linkedin.com",
         icon: "<FaLinkedin />",
      },
      {
         id: 2,
         title: "FoundIt",
         url: "https://www.foundit.in/",

      }

   ]

   const [jobSites, setJobSites] = useState([

      {
         id: 1,
         title: "Google",
         url: "https://www.google.com",
         icon: "<FaGoogle />",

      },
      {
         id: 2,
         title: "Facebook",
         url: "https://www.facebook.com",
      },

   ]);

   useEffect(() => {
      setJobSites(sites);
   }, [jobSites])


   return (
      <div>
            {/*   heading of this page  */}
         <h1 className='text-center text-3xl text-gray-900 font-bold p-4'> Web Sites For Jobs and Internships </h1>
         
         <section
            className='flex flex-row justify-center items-center'
         >

            {
               jobSites.map((jobSite, index) => (

                  <div className=' shadow-lg shadow-gray-300 rounded-md w-[40%] items-center p-4 m-4' key={index}>

                     
                     
                     <p className='text-center text-xl font-bold'>{jobSite.title} &nbsp; {jobSite.icon}</p>

                     <a href={jobSite.url} target="_blank" className='text-center text-blue-500 font-bold'>Visit</a>

                  </div>


               ))

            }


         </section>

      </div>
   );
}

export default JobPortal;
