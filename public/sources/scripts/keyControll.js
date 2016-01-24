'use strict';

class keyboards {
  constructor() {

    var keyControll = {

      secret : [38, 40, 37, 39, 32],
      input  : '',
      keys    : document.querySelectorAll('.key'),
      keyIndex  : 0,
      timer  : null,

      init : function() {
        this.keyCheck();
      },

      // key checking
      keyCheck : function() {
        let _this = this;

        document.addEventListener('keyup', function (event) {
          if(event.which !== _this.secret[_this.keyIndex])
            return;
          // _this.input += event.which;

          _this.showkeyOutput()
          clearTimeout(_this.timer);

          _this.timer = setTimeout(function() {
            _this.input = '';
            _this.keyIndex = 0;
            _this.clearActiveKeys()
          }, 500);
        })
      },
      // show keycode ouput
      showkeyOutput : function() {
        let _this = this;
        let activeKey = _this.keys[_this.keyIndex];
        let activeKeyCode = _this.keys[_this.keyIndex].dataset['keycode'];

        _this.keys[_this.keyIndex].classList.add('active');

        _this.keyIndex++;
          if (_this.keyIndex === 5 ) {
            _this.keySuccess()
          }
      },
      // clear all key active classes
      clearActiveKeys : function() {
        let _this = this;

        [].forEach.call(_this.keys, function (div) {
          div.classList.remove('active')
        })

      },
      // key all success
      keySuccess : function() {

        console.log('success!')

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