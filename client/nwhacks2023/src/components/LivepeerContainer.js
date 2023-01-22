import {
    LivepeerConfig,
    ThemeConfig,
    createReactClient,
    studioProvider,
  } from '@livepeer/react';
  import { Livepeer } from './Video';
  import React from 'react';
  
  const apiKey = '83991dae-682a-475d-bdcd-6d009262ce6e';

   
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