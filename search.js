// search bar control

// # Prereqs
// YT Search Setup
apiKey = 'AIzaSyDyBENp5hS_tr0QH4EqsHOUoBfyTjPIs98';
handleClientLoad = function() {
  gapi.client.setApiKey(apiKey);
  gapi.client.load('youtube', 'v3', function() {console.log('YouTube Data API Loaded.');});
};


var ytData,
    search;
$(function() {
  // Youtube Data API & formatting
  ytData = {};
  ytData.results = null;
  ytData.search = function(query,args,callback) {
    //Form request for a search and execute
    args = args || {};
    callback = callback || resultsHandler;
    var request = gapi.client.youtube.search.list(
      $.extend({
        type:'video',
        part:'snippet',
        q:query
      },args));
    request.execute(function(res){
      var resultList = [];
      // console.log(res.items);
      for (var n in res.items) {
        var item = res.items[n];
        // console.log(item);
        resultList.push({
          ytid: item.id.videoId,
          thumbnail: item.snippet.thumbnails.default.url,
          title: item.snippet.title,
          channel: item.snippet.channelTitle
        });
      }
      // Then shove the list of results to a result handle
      callback(resultList);
    });
  };
  ytData.resultsHandler = function (list) {
    fb.child($('.sessionId').html()).set(list);
  };
  
  // Search
  search = {
    input: $('.search .searchBox'),
    results: $('.search .searchResults')
  };
  search.input
  .focus(function(){
    $(this).keypress(function(e){
      // Animate icon
      icon.play();
      // Handle arrow selection
      // Handle enter
      console.log(e.which);
    });
  })
  .blur(function(){
    console.log('not focused');
  });
  
});