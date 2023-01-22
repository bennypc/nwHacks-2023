import { Player } from '@livepeer/react';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
 

export function Livepeer() {
  const [url, setUrl] = useState("https://firebasestorage.googleapis.com/v0/b/nwhacks2023-5f0e8.appspot.com/o/IMG_1711.MOV?alt=media&token=7fea6cf9-59de-4f22-b137-310f6a53b00e");
  const [playbackUrl, setPlaybackUrl] = useState("");

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