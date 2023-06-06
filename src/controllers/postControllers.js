import db from "../config/database.connection.js";import urlMetadata from "url-metadata";

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

export async function createPost(req,res){
   const {userId} = res.locals;
   const {url,text} =req.body;
   const {title, image, description } = urlMetadata(url)
   const dataImg = image.startsWith("https://") ? image : url + (image.startsWith("/") ? image.substring(1) : image);
   try{
      
  const resultUrl=  await db.query(`INSERT INTO url (url,title,image,description) VALUES ($1,$2,$3,$4) RETURNING id`, [url,title,dataImg,description])

const urlId = resultUrl.rows[0].id;

const resultPost = await db.query(`INSERT INTO posts (userId,urlId,text) VALUES ($1,$2,$3) RETURNING id`, [userId ,urlId,text])
console.log(resultPost.rows[0])
    res.status(200).send("Created successfully")
   }catch(err){
console.log(err)
res.status(500).send(err.message)
   }
}

export async function getPosts(req, res) {
   const { userId } = res.locals;
   try {
     const result = await db.query(
       `SELECT p.*, u.name AS user_name, u.picture AS user_picture, url.title AS url_title, url.image AS url_image, url.description AS url_description
        FROM posts p
        INNER JOIN users u ON p."userId" = u.id
        INNER JOIN url ON p."urlId" = url.id
        WHERE p."userId" = $1
        ORDER BY p."createdAt" DESC
        LIMIT 20`,
       [userId]
     );
 
     const posts = result.rows.map((row) => ({
       id: row.id,
       userId: row.userId,
       text: row.text,
       createdAt: row.createdAt,
       userName: row.user_name,
       userPicture: row.user_picture,
       urlTitle: row.url_title,
       urlImage: row.url_image,
       urlDescription: row.url_description,
     }));
 
     if (posts.length === 0) {
       res.status(200).json({ message: "There are no posts yet" });
     } else {
       res.status(200).json(posts);
     }
   } catch (err) {
     console.log(err);
     res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
   }
 }