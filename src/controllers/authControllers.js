import {db} from "../config/database.connection.js"

export default async function postUser(req, res) {
    const { name, password, email } = res.locals.body;
    const timesTamp = Date.now();
    const date = new Date(timesTamp);
    try {
        await db.query(`
        INSERT INTO users (name, email, password, createdAt)
            VALUES ($1, $2, $3, $4);
        `, [name, email, password, date])

        return res.send("Usuário cadastrado com sucesso!")
    } catch (err) {
        console.error(err)
        return res.status(500).send(err.message)
    }
}
