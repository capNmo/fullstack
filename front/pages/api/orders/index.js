import { getToken } from 'next-auth/jwt';
import axios from 'axios';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    console.log("signin required")
    return res.status(401).send('signin required');
  }

  console.log("token who tries to make an order: ", user)
 
  const newOrder = {
    ...req.body,
    user: user._id,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU1YTQxNjE5NmMxN2IxM2QwZjMwODQiLCJuYW1lIjoiSm9obiIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDAxMzYzMjMsImV4cCI6MTcwMjcyODMyM30.yQzu5k0T0XpYhCzVid1CM7Z1SBP77AV8G66pOGTGwIY'
  }
  
  var order = []
  axios.post("http://localhost:4000/api/orders/", newOrder, {
    headers: headers
  })
  .then((response) => {
    order = response.data;
  })
  .catch((error) => {
    console.log(error)
  })
    
  res.status(201).send(order);
};
export default handler;
