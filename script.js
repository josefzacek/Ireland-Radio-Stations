for (var index = 0; index < 6; index++) {
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

/*!
 *  Howler.js Radio Demo
 *  howlerjs.com
 *
 *  (c) 2013-2018, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

/**
 * Radio class containing the state of our stations.
 * Includes all methods for playing, stopping, etc.
 * @param {Array} stations Array of objects with station details ({title, src, howl, ...}).
 */
var Radio = function (stations) {
  var self = this

  self.stations = stations
  self.index = 0

  // Setup the display for each station.
  for (var i = 0; i < self.stations.length; i++) {
    // window['title' + i].innerHTML = '<b>' + self.stations[i].title + '</b> '
    window['img' + i].src = self.stations[i].img
    window['img' + i].alt = self.stations[i].title

    // document.getElementById("imageid").src="../template/save.png";
    window['station' + i].addEventListener('click', function (index) {
      var isNotPlaying = (self.stations[index].howl && !self.stations[index].howl.playing())

      // Stop other sounds or the current one.
      radio.stop()

      // If the station isn't already playing or it doesn't exist, play it.
      if (isNotPlaying || !self.stations[index].howl) {
        radio.play(index)
      }
    }.bind(self, i))
  }
}
Radio.prototype = {
  /**
   * Play a station with a specific index.
   * @param  {Number} index Index in the array of stations.
   */
  play: function (index) {
    var self = this
    var sound

    index = typeof index === 'number' ? index : self.index
    var data = self.stations[index]

    sound = data.howl = new Howl({
      src: data.src,
      html5: true, // A live stream can only be played through HTML5 Audio.
      format: ['mp3', 'aac']
    })
    // }

    // Begin playing the sound.
    sound.play()

    // Toggle the display.
    self.toggleStationDisplay(index, true)

    // Keep track of the index we are currently playing.
    self.index = index
  },

  /**
   * Stop a station's live stream.
   */
  stop: function () {
    var self = this

    // Get the Howl we want to manipulate.
    var sound = self.stations[self.index].howl

    // Toggle the display.
    self.toggleStationDisplay(self.index, false)

    // Stop the sound.
    if (sound) {
      sound.stop()
    }
  },

  /**
   * Toggle the display of a station to off/on.
   * @param  {Number} index Index of the station to toggle.
   * @param  {Boolean} state true is on and false is off.
   */
  toggleStationDisplay: function (index, state) {
    // add class "active" to currently playing station
    window['station' + index].classList = state ? 'station active' : 'station'
  }
}

//  Setup our new radio and pass in the stations.
var radio = new Radio([
  {
    title: 'Kfm',
    src: ['http://cty.gocaster.net:8000/kfm_web'],
    img: 'images/kfm.png',
    frequency: '97.6fm & 97.3fm',
    howl: null
  },
  {
    title: 'East Coast FM',
    src: ['http://sirius.shoutca.st:8461/;stream.mp3'],
    img: 'images/east-coast-fm.png',
    frequency: '94.9fm, 96.2fm, 99.9fm, 102.9fm & 104.4fm',
    howl: null
  },
  {
    title: 'Radio Nova',
    src: ['http://edge-ads-02-gos1.sharp-stream.com/nova.mp3'],
    img: 'images/radio-nova.png',
    frequency: '100.3fm & 100.5fm',
    howl: null
  },
  {
    title: 'Q102',
    src: ['https://wg.cdn.tibus.net/q102MP3128'],
    img: 'images/q102.png',
    frequency: '102.2fm',
    howl: null
  },
  {
    title: 'Newstalk',
    src: ['https://stream.audioxi.com/NT'],
    img: 'images/newstalk.png',
    frequency: '106fm & 108fm',
    howl: null
  }
])
