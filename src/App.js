import React,{ useEffect, useState } from 'react';
import {getTokenFromUrl} from './spotify';
import './App.css';
import Player from './Player.js';
import Login from './Login.js';
import SpotifyWebApi from 'spotify-web-api-js';
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebApi();


function App() {
  const [{user,token},dispatch] = useDataLayerValue();
  // console.log("Reached App");
  useEffect(()=>{

    const hash=getTokenFromUrl();
    window.location.hash="";

    const _token=hash.access_token;

    if(_token) {

      dispatch({
        type:"SET_TOKEN",
        token:_token,
      })

      // console.log(_token);

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        // console.log(user);
        dispatch({
          type: 'SET_USER',
          user
        });
      });

      
    }
  },[]);
  console.log("user*: ",user);
  console.log("token*:", token);
  return (
    <div className="app">
      {
        token? (
          <Player spotify/>
        ):
      
        <Login />
      }
    </div>
  );
}
export default App;
