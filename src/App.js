import { useEffect } from 'react';
import {getTokenFromUrl} from './spotify';
import './App.css';
import Login from './Login.js';
function App() {

  useEffect(()=>{
    const token=getTokenFromUrl();
    console.log('I HAVE A TOKEN ', token);
  },[]);

  return (
    <div className="app">
        <Login />
    </div>
  );
}
export default App;
