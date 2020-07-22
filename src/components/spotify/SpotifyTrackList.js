import React from 'react'
import SpotifyTrack from './SpotifyTrack'


const SpotifyTrackList = ({tracks}) => {

    const renderedList = tracks.map(track => {
       return (<SpotifyTrack key={track.id} track= {track}/>)
    }) 

    return (
        <div>
            {renderedList}
        </div>
    )
}



export default SpotifyTrackList
