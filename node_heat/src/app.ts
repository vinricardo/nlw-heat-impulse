import "dotenv/config";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io"
import { router } from "./routes"
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});


io.on("connection", socket => {
    console.log(`\nUsuário conectado no socket ${socket.id}`);
})

app.use(router);  

app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
});

app.get("/sigin/callback", (request, response) => {
    const { code } = request.query;
    return response.json(code);
});

export { serverHttp, io}