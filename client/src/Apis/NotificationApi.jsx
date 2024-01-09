import axios from "axios";

export default axios.create({
    baseURL: `http://localhost:${
        import.meta.env.VITE_BACKEND_PORT
    }/api/notification`,
});
