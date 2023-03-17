chrome.browserAction.onClicked.addListener(function() {
  // Get all bookmarks
  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    // Collect all bookmarks into an array
    var bookmarks = [];

    function processNode(node) {
      // If the node is a bookmark, add its URL to the bookmarks array
      if (node.url) {
        bookmarks.push(node.url);
      }

      // If the node has children, process each child
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          processNode(node.children[i]);
        }
      }
    }

    // Start processing at the root of the bookmark tree
    processNode(bookmarkTreeNodes[0]);

    // Open a new tab with a randomly selected bookmark
    if (bookmarks.length > 0) {
      var randomIndex = Math.floor(Math.random() * bookmarks.length);
      chrome.tabs.create({ url: bookmarks[randomIndex] });
    }
  });
});

