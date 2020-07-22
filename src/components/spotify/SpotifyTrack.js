import React from 'react'

const SpotifyTrack = ({track}) => {
    
    return (
        <div>
            <h2>{track.name}</h2>
            <img src={track.album.images[1].url} alt={track.album.name}/>
            <p>{track.artists[0].name}</p>
            <button>Import Song</button>
        </div>
    )
}

export default SpotifyTrack
