import '@css/base.css';
import '@css/style.scss';
import data from './data.js';

function start() {
  if (document.querySelector('.J_modal').style.display == 'block') {
    return
  }
  const obj = document.querySelector('.J_shake_obj');
  if ([].slice.call(obj.classList).indexOf('shake') == -1) {
    obj.classList.add('shake')
    setTimeout(() => {
      obj.classList.remove('shake')
      if (Math.random() > 0.5) {
        getResult()
      } else {
        alert('没有摇出签哦~请更诚心一些!')
      }
    }, 3800);
  }
}

function getResult() {
  const id = ~~(Math.random() * 1000 % 100)
  const result = data[id]
  document.querySelector('.J_result_title').innerHTML = result.title.trim()
  document.querySelector('.J_result_word').innerHTML = result.word.replace('；', '；<br>').trim()
  document.querySelector('.J_result_resolve').innerHTML = ''
  document.querySelector('.J_result_mean').innerHTML = ''
  document.querySelector('.J_result_get_resolve').setAttribute('data-id', id)
  document.querySelector('.J_modal').style.display = 'block'
}

if (window.DeviceMotionEvent) {
  var speed = 20; // 用来判定的加速度阈值，太大了则很难触发
  var x, y, z, lastX, lastY, lastZ;
  x = y = z = lastX = lastY = lastZ = 0;

  window.addEventListener('devicemotion', function (event) {
    var acceleration = event.accelerationIncludingGravity;
    x = acceleration.x;
    y = acceleration.y;
    if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
      // 用户设备摇动了，触发响应操作
      // 此处的判断依据是用户设备的加速度大于我们设置的阈值
      start()
    }
    lastX = x;
    lastY = y;
  }, false);
} else {
  alert('您的设备不支持参加此活动');
}

document.querySelector('.J_result_get_resolve').addEventListener('click', function (event) {
  document.querySelector('.J_result_resolve').innerHTML = data[this.getAttribute('data-id')].resolve.trim()
  document.querySelector('.J_result_mean').innerHTML = data[this.getAttribute('data-id')].mean.trim()
  this.style.display = 'none'
  document.querySelector('.J_close').style.display = 'block'
})

document.querySelector('.J_close').addEventListener('click', function (event) {
  document.querySelector('.J_modal').style.display = 'none'
  this.style.display = 'none'
  document.querySelector('.J_result_get_resolve').style.display = 'block'
})