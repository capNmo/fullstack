import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        var formdata = new FormData();
        //add three variable to form
        formdata.append("email", credentials.email);
        // formdata.append("token", "d48a3c54948b4c4edd9207151ff1c7a3");
        formdata.append("password", credentials.passwordsword);
        var user;

      
        await axios.post(`http://localhost:4000/api/users/signin/`, {"email": credentials.email, "password": credentials.password})
      
        .then(function (response) {
          user = response.data;
          console.log("responsed user: ")
          console.log(user.token)

          user =  {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: 'file',
            isAdmin: user.isAdmin,
            token: user.token
          };
        })

        if(user){
          return user;
        }
        throw new Error('Invalid email or password');
      }, 
    }),
  ],
});
