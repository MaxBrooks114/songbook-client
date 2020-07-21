import {combineReducers} from 'redux'
import spotifyTracksReducer from './spotify/spotifyTracksReducer'


export default combineReducers({
    spotifyTracks: spotifyTracksReducer
})