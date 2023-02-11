import React, { useState } from "react";
import logo from "../../media/headphones-gradient.png";
import { NavLink, Outlet } from "react-router-dom";

import { Resizable } from "re-resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBookOpen,
  faPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
/* import logo1 from '../media/soundwise2.png' */
import classes from "../../components/nav/Nav.module.css";
import MainContext from "../../context/MainContext.js";
import DisplayContext from "../../context/DisplayContext.js";
import { useContext } from "react";
import UserPlayList from "../../routes/user_playList/UserPlayList";
import PlayerContext from "../../context/PlayerContext";

export default function Nav() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const [{ playlists }, playerDispatch] = useContext(PlayerContext);

  const [{ navReminder }, dispatch] = useContext(DisplayContext);
  /* const [player, playerDispatch] = useContext(PlayerContext); */
  const { user, login, hashToken } = STATE;
  const [state, setState] = useState({ width: "15vw", height: "200" });
  return (
    <Resizable
      translate="yes"
      style={{ border: "1px solid black" }}
      minHeight="100vh"
      /* set minWidth to be wider */
      minWidth="13vw"
      maxWidth="25vw"
      size={{ width: state.width, height: state.height }}
      onResizeStop={(e, direction, ref, d) => {
        setState({
          width: state.width + d.width,
          height: state.height + d.height,
        });
      }}
    >
      <div className={classes.main} translate="no">
        <div className={classes.logo}>
          <img src={logo} alt="logo" />
          <h2>Soundwise</h2>
        </div>

        <nav className={classes.navLinks}>
          <div
            onClick={() => {
              playerDispatch({
                type: "SET_IS_PLAYER",
                isPlayer: true,
              });
            }}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to="/"
            >
              <FontAwesomeIcon className={classes.awesome} icon={faHouse} />
              Home
            </NavLink>
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              //changing the status of categories to false to get back to main category page
              onClick={() => {
                DISPATCH({
                  type: "SET_CAT_PLAYLIST",
                  catPlaylist: false,
                });
                playerDispatch({
                  type: "SET_IS_PLAYER",
                  isPlayer: true,
                });
              }}
              to="search"
            >
              <FontAwesomeIcon
                className={classes.awesome}
                icon={faMagnifyingGlass}
              />
              Search
            </NavLink>
          </div>
          <div
            onClick={() => {
              if (!hashToken) {
                dispatch({
                  type: "SET_NAV_REMINDER",
                  navReminder: true,
                });
                dispatch({
                  type: "SET_NAV_REMINDER_MSG",
                  navReminderMsg: "library",
                });
              }
            }}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to={!user ? "/" : "library"}
            >
              <FontAwesomeIcon className={classes.awesome} icon={faBookOpen} />
              Library
            </NavLink>
          </div>

          <div
            onClick={() => {
              if (!hashToken) {
                dispatch({
                  type: "SET_NAV_REMINDER",
                  navReminder: true,
                });
                dispatch({
                  type: "SET_NAV_REMINDER_MSG",
                  navReminderMsg: "playlist",
                });
                playerDispatch({
                  type: "SET_IS_PLAYER",
                  isPlayer: true,
                });
              }
            }}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to={!user ? "/" : "playlist"}
            >
              <FontAwesomeIcon className={classes.awesome} icon={faPlus} />
              My Playlist
            </NavLink>
          </div>

          <div
            onClick={() => {
              if (!hashToken) {
                dispatch({
                  type: "SET_NAV_REMINDER",
                  navReminder: true,
                });
                dispatch({
                  type: "SET_NAV_REMINDER_MSG",
                  navReminderMsg: "love",
                });
                playerDispatch({
                  type: "SET_IS_PLAYER",
                  isPlayer: true,
                });
              }
            }}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to={!user ? "/" : "songs"}
            >
              <FontAwesomeIcon className={classes.awesome} icon={faHeart} />
              Liked Songs
            </NavLink>
          </div>
        </nav>
        <UserPlayList />
      </div>
      <Outlet />
    </Resizable>
  );
}
