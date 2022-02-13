import {io} from "socket.io-client";
//const socket = io("http://192.168.1.107:5500")
const socket = io("https://oddie-server.herokuapp.com/");
export default socket