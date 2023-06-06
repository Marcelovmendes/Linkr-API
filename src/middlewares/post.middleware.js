import db from "../config/database.connection.js";

export async function DeleteValidate(req,res,next){
const {authorization} = req.headers;
const {id}= req.params;
const token = authorization?.replace("Bearer ","");

try{
if(!token) return res.status(401).send("Unauthorized");

if(id === undefined) return res.status(422).send("Id is required");

 const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
 if(!session[0]) return res.status(401).send("Unauthorized");
 next();
}catch(err){
    res.status(500).send(err.message)
}
}

