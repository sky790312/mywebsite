'use strict';

class keyboards {
  constructor() {

    // const keyControll = {
    this.setting = {
      keys      : document.getElementsByClassName('key'),
      secret    : [38, 37, 40, 39, 32],
      keyIndex  : 0,
      timer     : null
    }
    // this.bindKeypress();
    // this.bindClickKeys();
  }
  // bind key press
  bindKeypress() {
    let _this = this;

    document.addEventListener('keyup', function (event) {
      let helperShow = document.getElementsByClassName('show-helper').length;
      let boys = document.getElementById('key-background').childNodes.length;

      if(!helperShow || boys > 0 || event.which !== _this.setting.secret[_this.setting.keyIndex])
        return;

      _this.showkeyOutput();
      // _this.resetTimer();
    });
  }
  // bind click key
  bindClickKeys() {
    let _this = this;

    for(let i = 0, j = _this.setting.keys.length; i < j; i += 1){
      _this.setting.keys[i].addEventListener('click', function () {
        if(parseInt(this.dataset['keycode'], 10) !== _this.setting.secret[_this.setting.keyIndex])
          return;

        _this.showkeyOutput();
        // _this.resetTimer();
      });
    }
  }
  // show keycode ouput
  showkeyOutput() {
    let _this = this;

    _this.setting.keys[_this.setting.keyIndex].classList.add('active');
    _this.setting.keyIndex += 1;

    if (_this.setting.keyIndex === 5 ) {
      clearTimeout(_this.setting.timer);
      _this.keySuccess();
    } else {
      _this.resetTimer();
    }
  }
  // clear timer
  resetTimer() {
    let _this = this;

    clearTimeout(_this.setting.timer);

    _this.setting.timer = setTimeout(function() {
      _this.setting.keyIndex = 0;
      _this.clearActiveKeys();
    }, 800);
  }
  // clear all key active classes
  clearActiveKeys() {
    let _this = this;

    [].forEach.call(_this.setting.keys, function (div) {
      div.classList.remove('active')
    })
  }
  // key all success
  keySuccess() {
    let _this = this;
    let keyBackground = document.getElementById('key-background');
    let str = '';
    let singleBoy = '<div class="boys"><div class="head"><div class="eyes"></div></div><div class="feets"></div></div>';

    for(let i = 0; i < 5; i += 1) {
      str += '<div class="row">';
      for(let j = 0; j < 5; j += 1) {
        str += singleBoy;
      }
      str += '</div>';
    }
    keyBackground.innerHTML = str;
    keyBackground.classList.add('success');

    setTimeout(function() {
      clearTimeout(_this.setting.timer);
      _this.setting.keyIndex = 0;
      _this.clearActiveKeys();

      keyBackground.innerHTML = '';
      keyBackground.classList.remove('success');
    }, 5000)
  }
};

export default keyboards;