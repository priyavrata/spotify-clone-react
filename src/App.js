import React,{ useEffect, useState } from 'react';
import {getTokenFromUrl} from './spotify';
import './App.css';
import Player from './Player.js';
import Login from './Login.js';
import SpotifyWebApi from 'spotify-web-api-js';
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebApi();


function App() {
  const [{user,token,playlists},dispatch] = useDataLayerValue();
  // console.log("Reached App");
  useEffect(()=>{

    const hash=getTokenFromUrl();
    window.location.hash="";

    const _token=hash.access_token;

    if(_token) {
      spotify.setAccessToken(_token);
      console.log("Spotify: ",spotify.addToMySavedAlbums);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);
  // console.log("user*: ",user);
  // console.log("token*:", token);
  // console.log("playlists* :",playlists);
  return (
    <div className="app">
      {
        token? (
          <Player spotify={spotify}/>
        ):
      
        <Login />
      }
    </div>
  );
}
export default App;
