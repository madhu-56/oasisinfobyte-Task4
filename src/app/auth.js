import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials'

export const {auth,signIn,handlers:{GET,POST}} = NextAuth({
    providers:[
        Credentials({
            name:"credentials",
            async authorize(credential){
                const user ={
                    id:100,
                    name:"madhu",
                    password:"admin",
                    role:"admin",
                };
                if(credential?.username===user.name && credential?.password===user.password)
                {
                    return user;
                }else return null;
                
            },
        }),
    ],
    secret:process.env.AUTH_SECRET,
    pages:{
        signIn:"/login",
    },
    callbacks:{
       jwt:async({token,user}) =>{
        if(user){
            token.role = user.role;
        }
        return token;
       },
       session:async({session,token})=>
       {
        if(session?.user)
        {
            session.user.role = token.role;
        }
        return session;
       }
    }
});







// import NextAuth from "next-auth";
// // import credentials from "next-auth/providers/credentials";
// import CredenttialsProvider from 'next-auth/providers/credentials'
// import GitHub from "next-auth/providers/github";
// export const { auth, handlers: { GET, POST } } = NextAuth({
//     providers: [
//         GitHub({
//             clientId:process.env.AUTH_GITHUB_ID,
//             clientSecret:process.env.AUTH_GITHUB_SECRET,
//         }),
//         CredenttialsProvider({
//             name: "user Credential",
//             credentials: {
//                 username: { type: String, required: true },
//                 password: { type: String, required: true },
//             },
//             authorize: async (credentials) => {
//                 const user = { id: 12, name: "madhu", password: "admin",};
//                 if(
//                     credentials ?.username === user.name &&
//                     credentials?.password === user.password
//                 )
//                     return user;
//                 else return null;
//             },
//         }),
//     ],
//     secret:process.env.AUTH_SECRET,
// })