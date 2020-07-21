import axios from "axios";
import { getToken } from "./spotifyToken";

export default axios.create({
  baseURL: "https://api.spotify.com/v1",
});
