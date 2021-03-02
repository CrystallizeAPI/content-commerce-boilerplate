import React from "react";

const HLS_EXTENSION = /\.(m3u8)($|\?)/i;
const DASH_EXTENSION = /\.(mpd)($|\?)/i;
const MOV_EXTENSION = /\.(mov)($|\?)/i;

function getVideoType(url) {
  if (HLS_EXTENSION.test(url)) {
    return "application/x-mpegURL";
  } else if (DASH_EXTENSION.test(url)) {
    return "application/dash+xml";
  } else if (MOV_EXTENSION.test(url)) {
    return "video/mp4";
  } else {
    return `video/mp4`;
  }
}

export default function Video({
  playlists,
  thumbnails,
  autoplay,
  loop,
  controls,
  fluid,
  ...rest
}) {
  return (
    <video>
      {playlists?.map((playlist) => (
        <source src={playlist} key={playlist} type={getVideoType(playlist)} />
      ))}
      Your browser does not support the video types
    </video>
  );
}
