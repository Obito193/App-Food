import { io } from "socket.io-client";

import { domain } from "@app-helper/urlAPI";
import ServiceStorage, { KEY_STORAGE } from "./service-storage";


const url_socket = domain;

const path_socket = '/socket-io'


class SocketService {
  socket: any;

  constructor() {
    this.socket = null;
  }

  initializeSocket = async () => {
    const token = await ServiceStorage.getString(KEY_STORAGE.USER_TOKEN)
    try {
      this.socket = io(url_socket, { path: path_socket, auth: { token } }); // , auth: {token} , , path: path_socket
      console.log("initializing socket");

      this.socket.on("connection", () => {
        console.log("Socket connected");
      });

      this.socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      this.socket.on("error", (data: any) => {
        console.log("Socket error", data);
      });
    } catch (error) {
      console.log("Socket is not initialized: ", error);
    }
  }

  emit(event: any, data: any = {}) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.log("Socket not initialized");
    }
  }

  on(event: any, cb: any) {
    if (this.socket) {
      this.socket.on(event, cb);
    } else {
      console.log("Socket not initialized");
    }
  }

  to(room: string, event: string, data: any = {}) {
    if (this.socket) {
      this.socket.to(room).emit(event, data);
    } else {
      console.log("Socket not initialized");
    }
  }

  removeListener(listenerName: any) {
    if (this.socket) {
      this.socket.removeListener(listenerName);
    } else {
      console.log("Socket not initialized");
    }
  }
}

const SocketServices = new SocketService();
export default SocketServices;
