
import React, { useContext, useEffect, useState } from "react";
import MainContext from "../../context/MainContext";
import PlayerContext from "../../context/PlayerContext";
import { NavLink } from "react-router-dom";
import classes from "./UserPlayList.module.css";
import axios from "axios";
export default function UserPlayList() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [{ playlists }, playerDispatch] = useContext(PlayerContext);
  const [activeId, setActiveId] = useState(null);
  //get data from playlist to play
  const getPlaylistData = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: "Bearer " + hashToken,
          "Content-Type": "application/json",
        },
      }
    );
    const { items } = response.data;
    const playlists = items.map((playlist, id) => {
      return playlist;
    });
    playerDispatch({
      type: "SET_PLAYLISTS",
      playlists,
    });
  };
  useEffect(() => {
    if (hashToken) {
      getPlaylistData();
    }
  }, [hashToken, playerDispatch]);
  return (
    hashToken && (
      <div className={classes.main} translate="no">
        {playlists?.map((playlist, id) => {
          return (
            <NavLink
              key={id}
              to="/activePlaylist"
              state={{ playlist: playlist }}
              className={
                activeId === id ? `${classes.active}` : `${classes.navLink}`
              }
              onClick={() => setActiveId(id)}
            >
              {playlist.name}
            </NavLink>
          );
        })}
      </div>
    )
  );
}



