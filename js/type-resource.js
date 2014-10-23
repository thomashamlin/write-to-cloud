/* type */

window.type = (function() {
  'use strict';

  var contentKey = 'type-project.content';
  var contentSelector = '#content';


  /* Draw the string `content` to the content area.
   * This function will translate markdown into HTML eventually.
   */
  function drawContent(content) {
    if (content) {
      $(contentSelector).html(content);
    //} else {
    //  $('#content').html('<span class="placeholder">Type here</span>');
    }
  }


  /* Return the string contents stored in localStorage, or null.
   * Uses the localStorage key defined for this project.
   */
  function loadContent() {
    var content = localStorage.getItem(contentKey);
    return content;
  }


  function insertStringAt(s, orig, index) {
    if (index === undefined) {
      index = orig.length;
    }
    var before = orig.substring(0, index);
    var after = orig.substring(index);
    return before + s + after;
  }

  /* Add a character to localStorage at the specified position `index`, or
   * append at end.
   * `index` is a zero-based integer and corresponds to the position of the
   * cursor within the content.
   */
  function addChar(c, index) {
    // either load from localStorage or use what's already in #content
    var content = loadContent();

    saveContent(insertStringAt(c, content, index));
    drawContent();
  }

  return {
    addChar: addChar,
    drawContent: drawContent,
    loadContent: loadContent
  };
})();


$(document).ready(function() {
  type.drawContent(type.loadContent());
});


$(document).on('keypress', function(e) {
  console.log('body keypress (printable)');

  // if it's a visible character, store it and draw it
  console.log(e.which, ' == ', String.fromCharCode(e.which));
  // type.addChar(String.fromCharCode(e.which));
});


$(document).on('keydown', function(e) {
  console.log('body keydown');

  // if it's a visible character, store it and draw it
  console.log(e.which);
});


$('.page').on('click', function(e) {
  console.log('.page click');
});
