import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Tracks"
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        this.setState({ track_list: res.data.message.body.track_list });
        let homeTrackList;
        if (localStorage.getItem("track" === null)) {
          homeTrackList = [];
        } else {
          homeTrackList = res.data.message.body.track_list;
          localStorage.setItem("track", JSON.stringify(homeTrackList));
        }
      })
      .catch(err => console.log(err));

    if (!navigator.onLine) {
      const localTrack = JSON.parse(localStorage.getItem("track"));

      this.setState({ track_list: localTrack });
    }
  }

  render() {
    console.log(this.state);
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
