var StrangerThings = {
  data: {
    credits: [
      {
        people: ['Winona Ryder'],
      },
      {
        people: ['David Harbour'],
      },
      {
        people: [
          'Finn Wolfhard',
          'Millie Bobby Brown'
        ]
      },
      {
        people: [
          'Gaten Matarazzo',
          'Caleb McLaughlin'
        ]
      },
      {
        people: [
          'Natalia Dyer',
          'Charlie Heaton'
        ]
      },
      {
        people: ['Cara Buono']
      },
      {
        title: 'And',
        people: ['Matthew Modine']
      },
      {
        title: 'Co-Executive Producer',
        people: ['Iain Patterson']
      },
      {
        title: 'Executive Producer',
        people: ['Karl Gajdusek']
      },
      {
        title: 'Executive Producers',
        people: [
          'Cindy Holland',
          'Brian Wright',
          'Matt Thunell'
        ]
      },
      {
        title: 'Executive Producers',
        people: [
          'Shawn Levy',
          'Dan Cohen'
        ]
      },
      {
        title: 'Executive Producers',
        people: ['The Duffer Brothers']
      }
    ]
  },

  $credits: null,
  $iframe: null,
  $people: null,
  creditIndex: 0,
  scWidget: null,
  transitionEvent: null,

  init: function () {
    this.$credits = document.getElementById('credits');
    this.$title = document.getElementById('title');
    this.$people = document.getElementById('people');
    this.transitionEvent = this.getRightTransitionEvent();

    this.$iframe = this.getSCIframe();
    document.body.appendChild(this.$iframe);

    this.$scWidget = SC.Widget(this.$iframe.id);

    this.$scWidget.bind(SC.Widget.Events.READY, function () {
      this.start();
      this.$scWidget.play();
    }.bind(this));

    this.$scWidget.bind(SC.Widget.Events.ERROR, function () {
      this.start();
    }.bind(this));
  },

  getSCIframe: function () {
    var $iframe = document.createElement('iframe');

    $iframe.id = 'soundcloud-iframe';
    $iframe.src = '//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/275179936';

    return $iframe;
  },

  start: function () {
    this.$credits.classList.add('strange-thing');

    if(this.transitionEvent) {
      this.$credits.addEventListener(this.transitionEvent, function () {
        var $fragment = document.createDocumentFragment(),
            $p,
            i;

        if(this.data.credits.length > this.creditIndex) {
          this.$credits.classList.remove('strange-thing');
          this.$title.textContent = this.data.credits[this.creditIndex].title;
          this.$people.textContent = '';

          for(i = 0; i < this.data.credits[this.creditIndex].people.length; i++) {
            $p = document.createElement('p');
            $p.textContent = this.data.credits[this.creditIndex].people[i];
            $fragment.appendChild($p);
          }

          this.$people.appendChild($fragment);
          this.creditIndex++;

          setTimeout(function () {
            this.$credits.classList.add('strange-thing');
          }.bind(this), 0);
        }
      }.bind(this));
    }
  },

  // https://davidwalsh.name/css-animation-callback
  getRightTransitionEvent: function () {
    var animation,
        element = document.createElement('a');
        animationEvents = {
          'animation': 'animationend',
          'OAnimation': 'oAnimationEnd',
          'MozAnimation': 'animationend',
          'WebkitAnimation': 'webkitAnimationEnd'
        };

    for(animation in animationEvents) {
      if(element.style[animation] !== undefined) {
        return animationEvents[animation];
      }
    }

    return false;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  StrangerThings.init();
});
