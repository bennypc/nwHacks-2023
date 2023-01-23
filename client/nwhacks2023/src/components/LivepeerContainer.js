import {
    LivepeerConfig,
    ThemeConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import { Livepeer } from './Video';
  import React from 'react';
  

   
  const client = createReactClient({
    provider: studioProvider({ apiKey: apiKey }),
  });
   
  function LivepeerContainer() {

    return (
      <LivepeerConfig client={client}>
        <Livepeer />
      </LivepeerConfig>
    );
  }

  export default LivepeerContainer;
