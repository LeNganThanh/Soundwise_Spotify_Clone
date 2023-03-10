import React, { useEffect, useState, useContext } from "react";

import fetchColor from "../../functions/getColor.js";

import style from "../single/Single.module.css";
import classes from "./CreatePlaylist.module.css";

import DisplayContext from "../../context/DisplayContext.js";
import playlistImg from "../../media/headphones-gradient.png";

export default function Single() {
  //for the lyrics to pop up
  const [colors, setColors] = useState();
  const [{ playList }, dispatch] = useContext(DisplayContext);

  const getColor = async () => {
    await fetchColor(playlistImg).then(res => setColors(res));
  };

  useEffect(() => {
    const routes = document.getElementById("routes");
    routes.scrollTo({ top: 0, behavior: "smooth" });

    getColor();
  }, []);

  return (
    <div className={classes.main} translate="no">
      {colors && (
        <div>
          <div translate="no" style={{ color: "wheat" }}>
            The CreatePlaylist page
          </div>

          <div className={style["song-container"]}>
            <div translate="no" className={style["artist_info"]}>
              <img
                src={playlistImg}
                alt="playlist_image"
                className={style["artist_profile_image"]}
              />
              <div>
                <h5 style={{ padding: "0.5rem 0" }}>PLAYLIST</h5>
                <h4> My Playlist '</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
