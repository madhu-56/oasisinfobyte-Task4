import React from 'react'
import {auth} from './auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home(){
  const session = await auth();
  console.log(session);
  if(!session)
  redirect("/api/auth/signin");
      return<div className='max-w-xl mx-auto mt-20'>
      <div className='text-4xl text-gray-800'>
        welcome {session.user.name}
      </div>
      <div>
        Role : {session.user.role}
      </div>
        <Link href='api/auth/signout'>Logout</Link>
      
      </div>;
}

// import Image from "next/image";
// import {auth} from "./auth"
// import { redirect } from "next/navigation";
// import Link from "next/link";

// export default async function Home() {
//   const session = await auth();
//   if (!session) redirect("api/auth/signin");
//   return (
//     <>
//     <div>
//       Protected page
//       <div>
//         {
//           session.user.name
//         }
//         {
//           session.user.email &&<p>
//           Email:{session.user.email}
//         </p>
//         }
        
//       </div>
//       <Link href="/api/auth/signout">Logout</Link>
//     </div>
//     </>
//       );
// }
