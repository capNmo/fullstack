import { getToken } from 'next-auth/jwt';
import axios from 'axios';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  if (password) {
    user.password = password;
    user.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU1YTQxNjE5NmMxN2IxM2QwZjMwODQiLCJuYW1lIjoiSm9obiIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDAxMzYzMjMsImV4cCI6MTcwMjcyODMyM30.yQzu5k0T0XpYhCzVid1CM7Z1SBP77AV8G66pOGTGwIY'
  }
  let axi = await axios.post("http://localhost:4000/api/users/reset-password", user)
  .then((response) => {
    console.log(response.data);
    res.send({
      message: 'User updated',
    }); 
  })
  .catch((error) => {
    console.log(error)
  })
}

export default handler;
