(function(wtc) {
  'use strict';

  var actions = {
    // Open a Dropbox authentication dialog to establish a connection
    'dropbox': function() {
      wtc.dropbox.client.authenticate();
    },

    'browse': function() {
      wtc.dropbox.chooser(function(content) {
        wtc.editor.medium.value(content);
      });
    },

    'save': function() {
      wtc.dropbox.saver();
    },

    'fullscreen': function() {
      var elem = $('body')[0];
      if (elem.requestFullscreen) {
        page.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    }
  };


  // Set up toolbar click handler
  function init(selector) {
    $(selector).on('click', function(e) {
      // map the button's data-action attribute to a function
      wtc.toolbar.actions[$(this).data('action')]();
    });
  }


  wtc.toolbar = {
    actions: actions,
    init: init
  };

})(window.wtc);
