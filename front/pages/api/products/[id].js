import axios from 'axios';

const handler = async (req, res) => {

  var url = `http://localhost:4000/api/products/${req.query.id}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTU1YTQxNjE5NmMxN2IxM2QwZjMwODQiLCJuYW1lIjoiSm9obiIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDAxMzYzMjMsImV4cCI6MTcwMjcyODMyM30.yQzu5k0T0XpYhCzVid1CM7Z1SBP77AV8G66pOGTGwIY'
  }
  var data;
  let axi = await axios.get(url, { headers }).then(
    response => {
      data = response.data
    }
  )

  res.send(data);
};

export default handler;
