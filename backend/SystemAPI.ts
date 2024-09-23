import express, {Express, Request, Response} from "express";
import cors from "cors";
import { client, dbQuery } from "./database";
import { User } from "./modules/User";

let server: Express = express();
const serverPort = 3500;

server.use(cors());
server.use(express.json());


server.post("/checkLogin", async function (req: Request, res: Response): Promise<Response>
{
    let user = new User();
    user.username = req.body.username.trim();
    user.password = req.body.password.trim();

    let sql = `select * from users where username = $1 and password = crypt($2, password);`;
    let result = await dbQuery(sql, [user.username, user.password]);

    if (result.rows.length > 0)
    {
        return res.status(200).json({success: true, message: "Sucesso ao efetuar login."});
    }
    return res.status(400).json({success: false, message: "Erro ao efetuar login. Usuário ou senha não batem."});
});



server.listen(serverPort, () =>
{
    console.log("Server started on port " + serverPort);
});