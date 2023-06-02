import { db } from "../config/database.connection.js"

export async function postUser(req, res) {
    const { name, password, email } = res.locals.body;
    const timeStamp = Date.now();
    const date = new Date(timeStamp);
    try {
        await db.query(`
        INSERT INTO users (name, email, password, createdAt)
            VALUES ($1, $2, $3, $4);
        `, [name, email, password, date])

        return res.status(201).send("Usuário cadastrado com sucesso!")
    } catch (err) {
        console.error(err)
        return res.status(500).send(err.message)
    }
}

export async function createSession(req, res) {
    const { id, token } = res.locals.session;
    const timeStamp = Date.now();
    const date = new Date(timeStamp);
    try {
        await db.query(`
            INSERT INTO sessions (userId, token, createdAt)
                VALUES ($1, $2, $3);
        `,
            [id, token, date]
        )
        return res.send({token, message:"Sessão iniciada com sucesso!"})
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
    
}
