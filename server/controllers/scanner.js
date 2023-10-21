const db = require("../db/connectDB");
require("dotenv").config();
const insert = (req, res) => {
  console.log(req.body)
  const { id, content, scan_date} = req.body;
  // console.log(scan_date.getDate())

  try {
    let query = `INSERT INTO qr(content,scan_date) VALUES('${content}', '${scan_date}')`;
    db.query(query, (err, result) => {
      if (err){
        console.log(err);
        res.json({message:"error in insert"});
        return;
      };
      res.json({message:"New data has been created!"});
    });
  } catch (error) {
    console.log(error);
    res.json({message:"internal server error"});
  }
};


const getAll = (req,res)=>{
  // console.log("getttttt")
  let query = "SELECT * FROM qr";

  db.query(query, (err, result) => {
    if (err){
      res.json({message:"internal server error"});
        return;
    };
    res.status(200).send(result);
  });
}

const deleteById = (req,res)=>{
  const id = req.params.id;
  console.log(id);
  let query = `DELETE FROM qr WHERE id=${id}`;
  db.query(query, (err, result) => {
    if (err){
      res.json({message: "internal server error"});
        return;
    };

    res.send({message:"successfully deleted!"});
  });
}
module.exports = { insert , getAll , deleteById };
