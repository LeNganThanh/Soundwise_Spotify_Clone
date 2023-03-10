import React, { useEffect, useState } from 'react';

import ArtistsMap from '../artistsMap/ArtistsMap.js';

import getDuration from '../../../functions/duration.js';
import fetchColor from '../../../functions/getColor.js';
import classes from '../../category-list/CategoryTracks.module.css';

const Header = ({ target, artistInfo, songInfo }) => {
  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState('');

  const total = target.total_tracks
    ? target.total_tracks
    : target.tracks?.total
    ? target.tracks.total
    : '';

  useEffect(() => {
    fetchColor(target.images[0].url).then(res => setColors(res));
    if (target.type !== 'artist') {
      const duration2 = getDuration(target);
      setDuration(duration2);
    }
  }, [target]);

  return (
    <React.Fragment>
      <div className={classes['login-button']}></div>
      {target && colors && (
        <div
          className={classes.header}
          style={{
            backgroundImage: `linear-gradient(to bottom left, ${
              colors ? colors[3] : 'black'
            },  ${colors ? colors[4] : 'black'})`,
          }}
          translate="no"
        >
          <img
            className={classes['album_cover']}
            src={target?.images[0]?.url}
            alt="track_image"
          />
          <div translate="no">
            <h2>{songInfo && songInfo.name ? songInfo.name : target.name}</h2>
            {songInfo ? <h4> - {target.name}</h4> : ''}
            <div className={classes.headerInfo}>
              <div>
                {artistInfo ? (
                  <img
                    src={artistInfo?.images[2].url}
                    alt="artist_image"
                    className={classes['artist_image']}
                  />
                ) : (
                  ''
                )}
                {artistInfo ? (
                  <ArtistsMap artists={target.artists} header={true} />
                ) : (
                  ''
                )}
                {target.owner ? (
                  <a
                    href={target.owner.external_urls.spotify}
                    className={classes.profileLink}
                    target="_blank"
                  >
                    {target.owner.display_name}
                  </a>
                ) : (
                  ''
                )}
                {target.type !== 'artist' ? <span></span> : ''}
                <p style={{ fontWeight: 'bold' }}>
                  {target.followers
                    ? `${target.followers.total.toLocaleString()} followers`
                    : target?.release_date?.substring(0, 4)}{' '}
                </p>
                {target.type !== 'artist' ? <span></span> : ''}
                {target.type !== 'artist' ? (
                  <p style={{ fontWeight: 'bold' }}>
                    {total}
                    {total > 1 ? ' songs' : ' song'}
                  </p>
                ) : (
                  ''
                )}
                {target.type !== 'artist' ? <span></span> : ''}
                {target.type !== 'artist' ? (
                  <p style={{ fontWeight: 'bold' }}>
                    {target.album_type && target.album_type === 'single'
                      ? duration[1]
                      : duration[0]}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
