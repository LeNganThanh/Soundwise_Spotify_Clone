import React from 'react';
import AllResults from './AllResults.js';
import PlaylistResults from './PlaylistResults';

const SearchResults = ({ activeCat, activeType }) => {
  const { albums, artists, audiobooks, episodes, playlists, shows, tracks } = activeCat;
  const categories = {
    albums,
    artists,
    audiobooks,
    episodes,
    playlists,
    shows,
    tracks,
  }
 
  console.log('activeType', activeType);

  return (
    <div>
      {activeType === "album,artist,playlist,track,show,episode,audiobook" ? <AllResults categories={categories}/> : ''}
      {activeType === 'playlist' ? <PlaylistResults playlists={playlists}/> : ''}
      {activeType === 'album' ? <PlaylistResults playlists={albums} /> : '' }
    </div>
  )
};

export default SearchResults;
