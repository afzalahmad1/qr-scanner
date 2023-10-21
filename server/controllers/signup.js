
const db = require("../db/connectDB");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const userBody = req.body;
  // console.log(userBody);
  if (!userBody.name || !userBody.email || !userBody.password) {
    res.status(200).json({
      status: 400,
      message: "All Fields Are Mandatory",
    });
    return;
  }

  let query = "INSERT INTO signup(name , email , password) VALUES(?)";
  const values = [
    userBody.name,
    userBody.email,
    userBody.password
  ]
  db.query(query, [values], (err, result) => {
    if(err){
      // console.log(err);
      return res.json({message: "Email Already Exist"})
    }
    res.json({
      message: "User has been created!",
    });
  });
    
};



const loginUser = async (req, res) => {
  // console.log(req.body);
  const token = await jwt.sign(req.body.email, process.env.JWT_SECRET);

  const query = "SELECT * from signup WHERE email = ?";
  db.query(query, [req.body.email],  (err,result) => {
      if(err){
          return res.json({message: "Login Error"})
      }
      // console.log(result);
      if(result.length > 0){
        if(req.body.password !== result[0].password){
          return res.json({message:"Incorrect Password"})
        }else{
          return res.json({
            message: "Login Success",
            token: token
          })
        }
      }else{
        return res.json({message:"Email not found"})
      }
  })
};



module.exports = {registerUser,loginUser};
