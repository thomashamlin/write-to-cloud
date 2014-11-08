(function() {
  'use strict';

  window.wtc = {
    // Some key codes (Medium also defines these and more on window.Key)
    BACK_SPACE: 8,
    DELETE: 46,
    ENTER: 13,
    SPACE: 32,
    SHIFT: 16,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    END: 35,
    CURSOR: "\u2038",
    LS: "\u2028", // unicode line separator
    PS: "\u2029", // unicode paragraph separator

    settings: {
      // Milliseconds to delay before caching content as user types; active
      // typing resets timer.
      cacheTimeoutMsecs: 200,

      // Identifies this app to Dropbox API
      dropboxAppKey: 'vj78nhiqqv60sar',
    },
    userSettings: {
    },
  };

})();
