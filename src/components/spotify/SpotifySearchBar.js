import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { fetchSpotifyTracks } from "../../actions/spotify";



const SpotifySearchBar = ({onFormSubmit}) => {
 
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()

  return (
      <div>
          <div>
              <form onSubmit={(e) => {e.preventDefault(); dispatch(fetchSpotifyTracks(query))}}>
                  <div >
                      <label>Spotify Song Search</label>< br/>
                      <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
                      <button>Submit</button>
                  </div>
              </form>
          </div>
      </div>
  )
}

export default SpotifySearchBar



