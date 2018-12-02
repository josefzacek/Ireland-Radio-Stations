for (var index = 0; index < 4; index++) {
  $('.stations').append(`
    <div id="station${index}" class="station">

      <svg class="play-button" viewBox="0 0 200 200" alt="Play video" width="48" height="48">
        <circle cx="100" cy="100" r="90" fill="none" stroke-width="9" stroke="#000"/>
        <polygon points="70, 55 70, 145 145, 100" fill="#000"/>
      </svg>

      <svg class="stop-button" viewBox="0 0 200 200" width="48" height="48">
        <circle cx="100" cy="100" r="90" fill="none" stroke-width="9" stroke="#000"/>
        <rect x="63" y="60" width="75" height="80" fill="#000"/>
      </svg>

      <div class="sound-wave">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>

      <div class="title">
        <img src="images/radio-placeholder.png" alt="title${index}" class="img" id="img${index}">
      </div>

    </div>
  `)
}
//  Setup our new radio and pass in the stations.
var radio = new Radio([
  {
    title: 'East Coast FM',
    src: ['http://sirius.shoutca.st:8461/;stream.mp3'],
    img: 'images/east-coast-fm.png',
    howl: null
  },
  {
    title: 'Radio Nova',
    src: ['http://edge-ads-02-gos1.sharp-stream.com/nova.mp3'],
    img: 'images/radio-nova.png',
    howl: null
  },
  {
    title: 'Q102',
    src: ['https://wg.cdn.tibus.net/q102MP3128'],
    img: 'images/q102.png',
    howl: null
  },
  {
    title: 'Newstalk',
    src: ['https://stream.audioxi.com/NT'],
    img: 'images/newstalk.png',
    howl: null
  }
])
