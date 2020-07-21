import React, { Component } from "react";
import { getToken } from "../../apis/spotifyToken.js";
import spotify from "../../apis/spotify";

class SpotifySearch extends Component {
  state = { search: "", token: null, spotifySongs: [] };

  async componentDidMount(){
    const token = await getToken()
    this.setState({ token: token });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    spotify.get("/search", {
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      params: {
        q: this.state.search,
        type: "track",
      },
    });

    
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.search} onChange={(e) => this.setState({ search: e.target.value })} />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default SpotifySearch;
