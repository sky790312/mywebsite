'use strict';

class keyboards {
  constructor() {

    var keyControll = {

      secret : '3840373932', //success code
      input  : '',
      keys    : document.querySelectorAll('.key'),
      keyIndex  : 0,
      timer  : null,

      init : function() {
        this.keyCheck();
      },

      // key checking
      keyCheck : function() {
        var _this = this;

        document.addEventListener('keyup', function (event) {
          _this.input += event.which;

          _this.showkeyOutput(event)
          clearTimeout(_this.timer);

          _this.timer = setTimeout(function() {
            _this.input = '';
            _this.keyIndex = 0;
            _this.clearActiveKeys()
          }, 500);

          if ( _this.input == _this.secret ) {
            _this.keySuccess()
          }
        })
      },
      // show keycode ouput
      showkeyOutput : function(e) {
        // var activeKey, activeKeyCode;
        if(this.keyIndex >= 5)
          return;

        var activeKey = this.keys[this.keyIndex],
        activeKeyCode = this.keys[this.keyIndex].dataset['keycode'];
        if ( e.which.toString() == activeKeyCode ) {
          this.keys[this.keyIndex].classList.add('active')
        }
        this.keyIndex++;
      },
      // clear all key active classes
      clearActiveKeys : function() {
        var _this = this;

        [].forEach.call(_this.keys, function (div) {
          div.classList.remove('active')
        })

      },
      // key all success
      keySuccess : function() {

        console.log('Konami Code!')

        // var mario = document.createElement('div')
        //     mario.className = 'mario'

        // document.body.appendChild(mario)

        // setTimeout(function() {
        //   mario.remove()
        // }, 10000)
      }
    }
    // document ready listener
    document.addEventListener('DOMContentLoaded', function() {
      keyControll.init()
    })
  };
};

export default keyboards;