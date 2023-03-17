chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    var bookmarks = [];

    function traverseBookmarks(bookmarkNodes) {
        for (var i = 0; i < bookmarkNodes.length; i++) {
            if (bookmarkNodes[i].children) {
                traverseBookmarks(bookmarkNodes[i].children);
            } else {
                bookmarks.push(bookmarkNodes[i]);
            }
        }
    }

    traverseBookmarks(bookmarkTreeNodes);

    var randomIndex = Math.floor(Math.random() * bookmarks.length);
    var randomBookmark = bookmarks[randomIndex];

    chrome.tabs.create({ url: randomBookmark.url });
});

