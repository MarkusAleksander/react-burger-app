import axios from "axios";

const instance = axios.create({
    baseURL: "https://react-burger-app-200c6.firebaseio.com/",
});

export default instance;
