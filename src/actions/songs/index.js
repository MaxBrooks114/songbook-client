import history from "../../history";
import { CREATE_SONG, FETCH_SONGS, FETCH_SONG, DELETE_SONG } from "./types";
import songbook from "../../apis/songbook";

export const createSong = (formValues) => async (dispatch) => {
  const response = await songbook.post("/songs/", { ...formValues });

  dispatch({
    type: CREATE_SONG,
    payload: response.data,
  });

  if (!history.location.pathname.includes("search")) {
    history.push("/songs");
  }

  console.log(history);
};

export const fetchSongs = () => async (dispatch) => {
  const response = await songbook.get("/songs");

  dispatch({
    type: FETCH_SONGS,
    payload: response.data,
  });
};

export const fetchSong = (id) => async (dispatch) => {
  const response = await songbook.get(`/songs/${id}`);

  dispatch({
    type: FETCH_SONG,
    payload: response.data,
  });

  history.push(`/songs/${id}`);
};

export const deleteSong = (id) => async (dispatch) => {
  await songbook.delete(`/songs/${id}`);

  dispatch({
    type: DELETE_SONG,
    payload: id,
  });

  history.push("/songs");
};
