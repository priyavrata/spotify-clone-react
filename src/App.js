import { useEffect, useState } from 'react';
import {getTokenFromUrl} from './spotify';
import './App.css';
import Player from './Player.js';
import Login from './Login.js';
import SpotifyWebApi from 'spotify-web-api-js';
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebApi();


function App() {
  const [token,setToken] = useState(null);
  const [{user},dispatch] = useDataLayerValue;

  useEffect(()=>{
    const hash=getTokenFromUrl();
    window.location.hash="";
    const _token=hash.access_token;

    if(_token) {
      setToken(_token);

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      });

      
    }
    console.log("user: ",user);
  },[]);

  return (
    <div className="app">
      {
        token? (
          <Player/>
        ):
      
        <Login />
      }
    </div>
  );
}
export default App;
