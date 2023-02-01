import React, { useState, useEffect } from "react";
import { useToken } from "../../spotify.js";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import style from "../MusicBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function RelatedArtists({ artistId }) {
  const searchParams = useToken();
  const navigate = useNavigate();
  const [relatedArtist, setRelatedArtist] = useState(null);

  const getRelatedArtists = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setRelatedArtist(res);
        }
      });
  };
  useEffect(() => {
    getRelatedArtists();
  }, []);

  return (
    <div className={style.main}>
      <div>
        {relatedArtist && (
          <div>
            <div className={style.albumContainer}>
              {relatedArtist?.artists?.map((artists, index) => {
                return (
                  <NavLink
                    to="/artist"
                    state={artists}
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={style.albumImage}>
                      <img
                        src={artists.images[1].url}
                        alt="/related_artists_image"
                      />
                    </div>
                    <div className={style.albumName}>{artists.name}</div>
                    <div className={style.artistName}>
                      {artists.followers.total.toLocaleString()}{" "}
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "pink", marginLeft: "5px" }}
                      />
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
