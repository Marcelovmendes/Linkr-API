import db from "../config/database.connection.js";

export async function deletePost(req,res){
 const {id}= req.params;
 try{
    await db.query(`DELETE FROM posts WHERE id = $1`, [id])
    res.status(200).send("Deleted successfully")
 }
   catch(err){
    console.log(err.message)
    res.status(500).send(err.message)
}

}