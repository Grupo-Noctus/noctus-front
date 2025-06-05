import { io, Socket } from "socket.io-client";
import { ref } from "vue";

type TMessage = {
    id: string;
    message: string;
    time: string;
    userName: string;
    admin: boolean;
};

type TJoinCourseData = {
    courseId: string;
    userName: string;
};

type TSendMessageData = {
    message: string;
    courseId: string;
    userName: string;
    userId: string;
    admin: boolean;
};

type TChatState = {
    connected: boolean;
    messages: TMessage[];
    error: string | null;
};

export const state = ref<TChatState>({
    connected: false,
    messages: [],
    error: null,
});

const URL = import.meta.env.VITE_WEBSOCKET_URL;

export const socket: Socket = io(URL, {
    query: {
        persistentId: localStorage.getItem("persistentId") || "",
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
});

socket.on("connect", () => {
    state.value.connected = true;
    state.value.error = null;
});

socket.on("disconnect", () => {
    state.value.connected = false;
});

socket.on("connected", (userId: { persistentId: string }) => {
    localStorage.setItem("persistentId", userId.persistentId);
});

socket.on("error", (error: string) => {
    state.value.error = error;
    console.error("Socket error:", error);
});

socket.on("courseMessages", (messages: TMessage[]) => {
    state.value.messages = messages;
});

socket.on("newMessage", (message: TMessage) => {
    state.value.messages.push(message);
});

export const joinCourse = (data: TJoinCourseData) => {
    socket.emit("joinCourse", data);
};

export const leaveCourse = (data: TJoinCourseData) => {
    socket.emit("leaveCourse", data);
};

export const sendMessage = (data: TSendMessageData) => {
    socket.emit("sendMessage", data);
};

socket.on("connect_error", (error) => {
    state.value.error = "Failed to connect to chat server";
    console.error("Connection error:", error);
});

socket.on("connect_timeout", () => {
    state.value.error = "Connection timeout - please try again";
    console.error("Connection timeout");
});
