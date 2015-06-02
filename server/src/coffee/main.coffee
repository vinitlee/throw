# Firebase setup
# fb = new Firebase("https://throw.firebaseio.com")

# YT Player Setup
tag = $('<script>',{'src':'https://www.youtube.com/iframe_api'})
      .prependTo($('head'))

player = {}
@onYouTubeIframeAPIReady = ->
  console.log('ytready')
  console.log('startedThis')
  player = new YT.Player('player',
    videoId: ''
    playerVars:
      'modestbranding': 1
      'autoplay': 1
      'autohide': 1
      'playsinline': 1
      'rel': 0
      'showinfo': 1
      'controls': 0
      'disablekb': 1
      'enablejsapi': 1
      'iv_load_policy': 3
      'playerapiid': 'ytplayer'
    events:
      'onReady': onPlayerReady
      'onStateChange': onPlayerStateChange
  )


onPlayerReady = function(e) {
  loadNext();
  $('#dropLogo')[0].playOnce();
};

current = {song:null,time:0};
load = function(song) {
  player.loadVideoById(song.ytid);
  // player.playVideo();
  $('.powerBar').css('background-image','url('+song.thumbnail+')');
};
loadNext = function() {
  // console.log('loadNext');
  playlist = fb.child($('.sessionId').html());
  playlist.once('value',function(res){
    if (res.val()[0]) {
      load(res.val()[0]);
      playlist.set(res.val().slice(1));
    }
    else {
      search('video','relatedtothething','function');
    }
  });
};

onPlayerStateChange = function(e) {
  switch (player.getPlayerState()) {
    case -1:
      $('.backdrop').css({opacity:0.0});
      break;
    case 0:
      // Empty/done?
      $('.backdrop').css({opacity:0.0});
      loadNext();
      break;
    case 1:
      // Playing
      $('.backdrop').animate({opacity:1.0},200);
      break;
    case 2:
      // Paused
      break;
    case 3:
      $('.backdrop').css({opacity:0.0});
      break;
    default:
      break;
  }
};
