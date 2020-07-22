import React, {useEffect, useCallBack} from 'react'
import {useSelector, connect } from 'react-redux'
import SpotifySearchBar from './SpotifySearchBar'
import SpotifyTrackList from './SpotifyTrackList'
import { fetchSpotifyTracks } from '../../actions/spotify/index'


const SpotifySearch = ({fetchSpotifyTracks}) => {

    const tracks = useSelector(state => state.spotifyTracks)
   

 

    const renderTracklist = () => {
      return  Object.keys(tracks).length > 0 ? <SpotifyTrackList tracks={Object.values(tracks)} /> : ""
    }

    return (
        <div>
            <SpotifySearchBar onFormSubmit={fetchSpotifyTracks}/>        
            {renderTracklist()}
        </div>
    )
}

export default connect(null, {fetchSpotifyTracks})(SpotifySearch)
