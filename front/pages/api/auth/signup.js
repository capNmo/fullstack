import axios from 'axios';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  let url = `http://localhost:4000/api/users/exists/${email}`;
  var exists = true;
  await axios.post(url, {"email": email})
  .then((response) => {
    exists = response.data.searchRes;
  })
  if(exists) {
    res.status(422).json({
      message: 'Email Exists!'
    });
    return;
  }

  const newUser = {
    name: name,
    email: email,
    password: password,
    isAdmin: false,
  };
  
  var user;
  await axios.post("http://localhost:4000/api/users/signup", newUser)
  .then((response) => {
    res.send({
      message: 'User updated',
    }); 
  })
  .catch((error) => {
    console.log(error)
  })
  
  
  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.token
  });
}

export default handler;
