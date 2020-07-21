import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchSpotifyTracks } from '../../actions/spotify'

class SpotifySearch extends Component {
  state = { search: "", token: null };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchSpotifyTracks(this.state.search)

  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h1>Spotify Search</h1>
          </label><br />
          <input type="text" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}



export default connect(null, {fetchSpotifyTracks})(SpotifySearch);
