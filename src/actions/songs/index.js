import history from "../../history";
import { CREATE_SONG } from "./types";
import songbook from "../../apis";

export const createSong = (formValues) => async (dispatch) => {
  const response = await songbook.post("/songs", { ...formValues });

  dispatch({
    type: CREATE_SONG,
    payload: response.data,
  });

  history.push("/");
};
