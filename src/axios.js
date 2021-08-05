import axios from "axios";
import { baseUrl } from "./constant/constants";

const instance=axios.create({
    baseURL:baseUrl
});

export default instance