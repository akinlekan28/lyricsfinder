import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${
          process.env.REACT_APP_MM_KEY
        }`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        let payload;
        if (localStorage.getItem("lyrics") === null) {
          payload = [];
          localStorage.setItem("lyrics", JSON.stringify(payload));
        } else {
          payload = JSON.parse(localStorage.getItem("lyrics"));
          payload.push(res.data.message.body.lyrics);
          localStorage.setItem("lyrics", JSON.stringify(payload));
        }

        return axios
          .get(
            `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${
              process.env.REACT_APP_MM_KEY
            }`
          )
          .then(res => {
            this.setState({ track: res.data.message.body.track });
            let payload2;
            if (localStorage.getItem("singletrack") === null) {
              payload2 = [];
              localStorage.setItem("singletrack", JSON.stringify(payload2));
            } else {
              payload2 = JSON.parse(localStorage.getItem("singletrack"));
              payload2.push(res.data.message.body.track);
              localStorage.setItem("singletrack", JSON.stringify(payload2));
            }
          });
      })
      .catch(err => console.log(err));

    //Load contents from localstorage for offline use
    if (!navigator.onLine) {
      const track = JSON.parse(localStorage.getItem("singletrack"));

      const singleTrack = track.filter(identified => {
        return identified.track_id.toString() === id;
      });

      const lyrics = JSON.parse(localStorage.getItem("lyrics"));

      let lyricsId = singleTrack[0].lyrics_id;
      const singleLyrics = lyrics.filter(lyricObject => {
        return lyricObject.lyrics_id.toString() === lyricsId.toString();
      });

      this.setState({ track: singleTrack[0] });
      this.setState({ lyrics: singleLyrics[0] });
    }
  }

  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-outline-primary btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            {track.primary_genres === undefined ? (
              <li className="list-group-item">
                <strong>Song Genre</strong>:{" "}
                {
                  track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name
                }
              </li>
            ) : (
              <li className="list-group-item">
                <strong>Song Genre</strong>: Unknown
              </li>
            )}

            <li className="list-group-item">
              <strong>Explicit Words</strong>:
              {track.explicit === 0 ? " No" : " Yes"}
            </li>

            <li className="list-group-item">
              <strong>Release Date</strong>:{" "}
              <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
