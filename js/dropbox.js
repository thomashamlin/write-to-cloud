(function(wtc) {
  'use strict';

  wtc.dropbox = {
  };

  /**
   * Create a Dropbox API client connection.
   */
  function connect() {
    console.log('connecting to Dropbox');
    var client = new Dropbox.Client({key: wtc.settings.dropboxAppKey});

    // Try to finish OAuth authorization.
    client.authenticate({interactive: false}, function (error) {
      if (error) {
        alert('Authentication error: ' + error);
      }
    });

    if (client.isAuthenticated()) {
      // Client is authenticated. Display UI.
    }

    wtc.dropbox.client = client;
  }

  $(document).ready(function() {
    connect();
  });

})(window.wtc);
