import toolbox from 'sw-toolbox'

toolbox.options.debug = true

toolbox.precache(['/', '/sw.js', '/bundle.js']);

toolbox.router.get(/image\.tmdb\.org\//, toolbox.networkFirst, {
  cache: {
    name: 'video-images'
  }
});

toolbox.router.get(/api\.themoviedb\.org\//, toolbox.networkFirst, {
  cache: {
    name: 'api'
  }
});

toolbox.router.default = toolbox.networkFirst;