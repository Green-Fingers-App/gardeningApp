import io from "socket.io-client";

type SocketType = ReturnType<typeof io>;

let socket: SocketType;

export const initSocket = (userId: number): SocketType => {
	const socket = io("https://greenfingers.truenas.work", {
		transports: ["websocket"],
		autoConnect: true,
	});


	socket.on("connect", () => {
		console.log("Connected to socket:", socket.id);
		socket.emit("join-user-room", userId);
	});

	return socket;
};

export const getSocket = (): SocketType => socket;
