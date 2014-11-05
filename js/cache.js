(function(wtc) {
  'use strict';

  // Container for timer IDs
  var cacheTimeoutIDs = {};

  /* Return a string unique to this URL and Medium element (using its ID).
   * This key is used to store and retrieve the Medium's content in
   * localStorage.
   */
  function cacheKey(medium) {
    return window.location.pathname + '#' + medium.element.id;
  }


  function getValue(medium) {
    return localStorage.getItem(cacheKey(medium));
  }


  /* Reset a timer for this medium object to save its state to local storage
   * after specified idle time.
   *
   *   @medium: Medium.js object
   *   @timeoutMsecs: milliseconds to wait before caching
   */
  function resetCacheTimeout(medium, timeoutMsecs) {
    console.log('resetCacheTimeout');
    var ms = timeoutMsecs || wtc.cacheTimeoutMsecs;
    // timeouts are identified simply by the ID of their Medium element
    var timeoutID = medium.element.id;

    window.clearTimeout(cacheTimeoutIDs[timeoutID]);

    cacheTimeoutIDs[timeoutID] = window.setTimeout(function () {
      console.log('  caching');
      localStorage.setItem(cacheKey(medium), medium.value());
    }, ms);
  }


  wtc.cache = {
    getValue: getValue,
    setValue: setValue,
    resetCacheTimeout: resetCacheTimeout
  };

})(window.wtc);
