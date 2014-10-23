/* type */

window.type = (function() {
  'use strict';

  // Identifiers
  var contentKey = 'type-project.content';
  var cursorKey = 'type-project.cursor';
  var contentSelector = '#content';

  // Some key codes
  var BACK_SPACE = 8;
  var DELETE = 46;
  var ENTER = 13;
  var SPACE = 32;
  var SHIFT = 16;
  var LEFT = 37;
  var RIGHT = 39;
  var CURSOR = "\u2038";
  var LS = "\u2028"; // unicode line separator
  var PS = "\u2029"; // unicode paragraph separator


  /* Re-draw the stored content to the content area.
   */
  function refreshContent() {
    var html = plainToHtml(getContent());
    $(contentSelector).html(html);
  }


  /* Return HTML representation of content.
   */
  function plainToHtml(plain) {
    // convert to lines
    var lines = plain.split(LS);
    var html = '';
    var line;

    for (var i = 0; i < lines.length; i++) {
      line = (lines[i] === "") ? "&nbsp;" : lines[i];
      html = html + '<div class="line">' + line + '</div>';
    }

    return html;
  }


  /* Return the string contents stored in localStorage.  Uses the localStorage
   * key defined for this project. If content is undefined, initializes it with
   * a unicode cursor character and returns that.
   *
   * If `splitAtCursor` is True, return an array of 2 strings representing
   * content before and after the cursor.
   */
  function getContent(splitAtCursor) {
    var content = localStorage.getItem(contentKey);
    if (content === null || content === "") {
      // initialize the content
      content = CURSOR;
      setContent(content);
    }

    if (splitAtCursor) {
      var parts = content.split(CURSOR);
      if (parts.length != 2) {
        parts[0] = content;
        parts[1] = "";
      }
      return parts;
    }

    return content;
  }


  function setContent(content) {
    localStorage.setItem(contentKey, content);
  }


  /* Add a character to localStorage at the position of the cursor.
   */
  function addChar(c) {
    var parts = getContent(true);
    setContent(parts[0] + c + CURSOR + parts[1]);
  }


  function handlePrintableKeys(e) {
    console.log('body keypress (printable)');
    console.log(e.which, ' == ', String.fromCharCode(e.which));

    // if it's a visible character, store it and draw it
    if (e.which == ENTER || e.which == BACK_SPACE) {
      return;
    }
    addChar(String.fromCharCode(e.which));
    refreshContent();
  }


  function handleNonPrintableKeys(e) {
    console.log('body keydown: ', e.which);
    var parts = getContent(true);
    var before = parts[0];
    var after = parts[1];

    function moveCursorLeft() {
      // setContent(content.substring(0, content.length - 1));
    }

    switch (e.which) {
      case ENTER:
        setContent(before + LS + CURSOR + after);
        refreshContent();
        break;

      case BACK_SPACE:
        // remove the character just before the cursor

        setContent(before.substring(0, before.length - 2) + CURSOR + after);
        refreshContent();
        break;

      case DELETE:
        // remove the character just after the cursor
        break;

      case RIGHT:
        before = before + after.substring(0, 1);
        after = after.substring(1);
        setContent(before + CURSOR + after);
        refreshContent();
        break;

      case LEFT:
        after = before.substring(before.length - 1) + after;
        before = before.substring(0, before.length - 1);
        setContent(before + CURSOR + after);
        refreshContent();
        break;
    }
  }


  function adjustCursorPosition(e) {
    console.log('.page click');

    var index = 0;
    // translate the x,y coords into index
  }


  function setupHandlers() {
    $(document).on('keypress', handlePrintableKeys);
    $(document).on('keydown', handleNonPrintableKeys);
    $('.page').on('click', adjustCursorPosition);
  }


  function run() {
    setupHandlers();
    refreshContent();
  }

  // Public functions
  return {
    run: run
  };
})();


$(document).ready(function() {
  type.run();
});
