/**
 * Editor abstraction. Adaptor for Medium.js.
 */

(function(wtc) {
  'use strict';

  // Singleton Medium.js object to be defined in init and available at wtc.editor.medium
  var medium;

  // Key codes (Medium also defines these and more on window.Key)
  var keyCode = {
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
  };


  /* Make an element editable via medium.js.
   * Supports configuration of the medium.js via a data-* API:
   *   data-edit-mode: [rich, inline, partial]
   *   data-edit-placeholder: string
   *   ...
   */
  function init() {
    var $editor = $('#editor');

    medium = new Medium({
      // Called at the start of a paste operation
      beforeInsertHtml: function () {
        var medium = this;
        // do some custom stuff
      },
      autoHR: false,
      element: $editor[0],
      mode: Medium.richMode,
      //pasteAsText: false,
      placeholder: 'Write something here'
    });

    // Restore value from localStorage
    medium.value(wtc.cache.getValue(medium));

    // Save it
    wtc.editor.medium = medium;

    // Setup event handlers
    $editor
      .on('keypress', {medium: medium}, handlePrintableKeys)
      .on('keydown', {medium: medium}, handleNonPrintableKeys);
  }


  function handlePrintableKeys(e) {
    console.log('keypress (printable)');
    console.log('  ', e.which, ' == ', String.fromCharCode(e.which));
    var medium = e.data.medium;

    wtc.cache.resetCacheTimeout(medium);

    // Periodically sync with cloud
    // e.g. every 10 key strokes or every 10 seconds
  }


  function handleNonPrintableKeys(e) {
    console.log('keydown: ', e.which);
    var medium = e.data.medium;

    switch (e.which) {
      case keyCode.ENTER:
        //wtc.cache.resetCacheTimeout(medium);
        break;
      case keyCode.BACK_SPACE:
        wtc.cache.resetCacheTimeout(medium);
        break;
      case keyCode.DELETE:
        wtc.cache.resetCacheTimeout(medium);
        break;
      //case keyCode.PASTE:
      //  wtc.cache.resetCacheTimeout(medium);
      //  break;
      default:
        // do not refresh content
        return;
    }
  }


  wtc.editor = {
    init: init,
    medium: medium
  };

})(window.wtc);
