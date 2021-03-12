import SocketIO, {Socket} from "socket.io";
import Koa from 'koa';

export default class SocketModule {
    private io: SocketIO.Server;
    private readonly koa: Koa;

    constructor(io: SocketIO.Server, koa: Koa) {
        this.io = io;
        this.koa = koa;
    }

    public connectionHandler(): void {
        this.io.on("connection", (socket: Socket) => {
            try {
                socket.on("my:event", () => {
                    console.log(socket.handshake.query['token']);
                });

            } catch ({message}) {
                this.io.to(socket.id).emit("error", message);
            }

        });

        // @ts-ignore
        this.io.on("error", (message: string) => {
            this.io.emit("error", message);
            this.koa.emit("error:socket", message);
        });
    }

    public sendUpdatesEvery(time = 1000) {
        return (timeInterval: string) => {
            return setInterval(() => {
                this.io.emit('hello', 'hey');
            }, time);
        }
    }


}