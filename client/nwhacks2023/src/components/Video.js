import { Player } from '@livepeer/react';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
 

export function Livepeer() {
  const [url, setUrl] = useState("https://firebasestorage.googleapis.com/v0/b/nwhacks2023-5f0e8.appspot.com/o/anything.mp4?alt=media&token=ca200e24-8561-42d1-92a7-79b6e351227c");
  const [playbackUrl, setPlaybackUrl] = useState("https://lp-playback.com/hls/148fhhnmhsfl7pyj/index.m3u8");

  useEffect(() => {
    axios({
      method: 'POST',
      url: "http://localhost:3001/livepeer",
      data: { urlLink: url, name: url.substring(0,4) },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      // console.log(res.data)
      const newPlaybackUrl = res.data[1].downloadUrl;
    })
  }, [url])


  return (
    <Player
      // title="Waterfalls"
      // playbackId="2bc2izmjoey99kiq"
      src={playbackUrl}
    />
  );
}