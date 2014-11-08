(function(wtc) {
  'use strict';

  // Dropbox client object is defined in init() and available in
  // wtc.dropbox.client
  var client;
  var datastore;


  /**
   * Create a Dropbox API client connection. Sets `client`.
   */
  function init() {
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
  }


  function datastore() {
    var datastoreManager = client.getDatastoreManager();
    datastoreManager.openDefaultDatastore(function (error, datastore) {
      if (error) {
        alert('Error opening default datastore: ' + error);
      }
    });
  }


  /**
   * Opens the Dropbox Chooser drop-in. When the user selects a file, its
   * contents are returned to the callback.
   */
  function chooser(fileSelectedCallback) {
    Dropbox.choose({
      success: function(files) {
        var file = files[0];
        console.log('user selected file.link: ', file.link);

        $.get(file.link, fileSelectedCallback);
      },
      extensions: ['.txt', '.html'],
      linkType: 'direct',
      multiselect: false
    });
  }


  /**
   * Opens the Dropbox Saver drop-in.
   * Saves the editor's value to the file.
   */
  function saver() {
  }


  wtc.dropbox = {
    client: client,
    chooser: chooser,
    datastore: datastore,
    init: init
  };

})(window.wtc);
