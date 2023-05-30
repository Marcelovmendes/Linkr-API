import { compareSync, hashSync } from "bcrypt";
import { db } from "../config/database.connection.js";
import {v4 as uuidv4} from "uuid";

export async function checkUser(req, res, next) {
    const { email } = req.body;
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
        console.log(rows[0])
        res.locals.userExists = rows.length > 0;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
}

export function cryPass(req, res, next) {
    const { userExists } = res.locals;
    if (userExists) return res.status(409).send("Usuário já cadastrado")

    const { body } = req;
    const newPassword = hashSync(body.password, 10);
    res.locals.body = { ...body, password: newPassword }
    next();
}

export async function deCryPass(req, res, next) {
    const { userExists } = res.locals;
    if (!userExists) return res.status(401).send("Usuário não cadastrado");
    const { body } = req;

    const token = uuidv4();
    try {
        const { rows } = await db.query(`
        SELECT * FROM users
            WHERE email=$1;
        `,
            [body.email]
        )
        const [user] = rows;
        const passwordsMatch = compareSync(body.password, user.password);
        if (!passwordsMatch) return res.status(401).send("UNAUTHORIZED");
        res.locals.session = {id: user.id, token};
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
    next();
}