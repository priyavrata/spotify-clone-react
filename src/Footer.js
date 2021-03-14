import "./Footer.css";
import React,{useEffect, useState} from 'react';
import { Grid, Slider } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import {useDataLayerValue} from "./DataLayer";

function Footer({spotify}) {
    const [{ token, item, playing }, dispatch] = useDataLayerValue();

    useEffect(() => {
        console.log(spotify.getMyCurrentPlaybackState);
      spotify.getMyCurrentPlaybackState().then((r) => {
        console.log(r);
  
        dispatch({
          type: "SET_PLAYING",
          playing: r.is_playing,
        });
  
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
      });
    }, [spotify]);

    const handlePlayPause = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };
    
      const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };
    
      const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };

    return (
        <div className="footer">
            <div className="footer_left">
                <img
                    className="footer_albumLogo"
                    src={item?.album.images[0].url}
                    alt=""
                />
                {item ? (
                <div className="footer__songInfo">
                    <h4>{item.name}</h4>
                    <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                </div>
                ) : (
                <div className="footer__songInfo">
                    <h4>No song is playing</h4>
                    <p>...</p>
                </div>
                )}
            </div>

            <div className="footer_center">
                <ShuffleIcon className="footer_green"/>
                <SkipPreviousIcon onClick={skipNext} className="footer_icon"/>
                {playing ? (
                <PauseCircleOutlineIcon
                    onClick={handlePlayPause}
                    fontSize="large"
                    className="footer__icon"
                />
                ) : (
                <PlayCircleOutlineIcon
                    onClick={handlePlayPause}
                    fontSize="large"
                    className="footer__icon"
                />
                )}
                <SkipNextIcon onClick={skipPrevious} className="footer_icon"/>
                <RepeatIcon className="footer__green" />
            </div>

            <div className="footer_right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon/>
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon/>
                    </Grid>
                    <Grid item xs>
                        <Slider aria-labelledby="continuous slider"/>
                    </Grid>
                </Grid>

            </div>

        </div>
    );
}

export default Footer;