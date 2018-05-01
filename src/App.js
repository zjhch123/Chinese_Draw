import '@css/base.css';
import '@css/style.scss';

function start() {
  const obj = document.querySelector('.J_shake_obj');
  if ([].slice.call(obj.classList).indexOf('shake') == -1) {
    obj.classList.add('shake');
    setTimeout(() => {
      obj.classList.remove('shake');
    }, 1900);
  }
}

if (window.DeviceMotionEvent) {
  var speed = 30; // 用来判定的加速度阈值，太大了则很难触发
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
