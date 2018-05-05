import '@css/base.css';
import '@css/style.scss';
import data from './data.js';


function start() {
  document.querySelector('.J_tip').classList.remove('f-yyy');
  if (document.querySelector('.J_modal').style.display == 'block') {
    return
  }
  const obj = document.querySelector('.J_shake_obj');
  if ([].slice.call(obj.classList).indexOf('shake') == -1) {
    obj.classList.add('shake')
    setTimeout(() => {
      // if (Math.random() > 0.3) {
        getResult()
      // } else {
      //   document.querySelector('.J_shake_obj').classList.remove('shake')
      //   alert('没有摇出签哦~请更诚心一些!')
      // }
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
function draw(id) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  const result = data[id]
  const title = result.title.trim()
  const content1 = result.word.split('；')[0] + '；'
  const content2 = result.word.split('；')[1]
  const mean = result.mean
  const resolve = result.resolve
  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = '25px 宋体'
    ctx.textAlign = "center"
    ctx.fillStyle = 'red'
    ctx.fillText(title, canvas.width / 2 + 10, 100);
    ctx.fillStyle = 'black'
    ctx.font = '24px 宋体'
    ctx.textAlign = "left"
    ctx.fillText(content1, 140, 140);
    ctx.fillText(content2, 140, 175);
    ctx.font = '20px 宋体'
    ctx.textAlign = "center"
    ctx.fillText(mean, canvas.width / 2 + 10, 230);
    ctx.fillText(resolve, canvas.width / 2 + 10, 260);
    document.querySelector('.J_save_pic').src = canvas.toDataURL('image / jpeg ', 0.8);
    document.querySelector('.J_modal2').style.display = 'block'
  }
  img.src = require('./assets/label4.png')
}
function launch() {
  if (window.DeviceMotionEvent) {
    var speed = 20; // 用来判定的加速度阈值，太大了则很难触发
    var x, y, z, lastX, lastY, lastZ;
    x = y = z = lastX = lastY = lastZ = 0;

    window.addEventListener('devicemotion', function (event) {
      var acceleration = event.accelerationIncludingGravity;
      x = acceleration.x;
      y = acceleration.y;
      if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
        start()
      }
      lastX = x;
      lastY = y;
    }, false);
  } else {
    alert('您的设备不支持参加此活动');
  }
}

document.querySelector('.J_result_get_resolve').addEventListener('click', function (event) {
  document.querySelector('.J_result_resolve').innerHTML = data[this.getAttribute('data-id')].resolve.trim()
  document.querySelector('.J_result_mean').innerHTML = data[this.getAttribute('data-id')].mean.trim()
  document.querySelector('.J_result_get_resolve').style.display = 'none'
  document.querySelector('.J_op').style.display = 'block'
})

document.querySelector('.J_close').addEventListener('click', function (event) {
  document.querySelector('.J_modal').style.display = 'none'
  document.querySelector('.J_op').style.display = 'none'
  document.querySelector('.J_result_get_resolve').style.display = 'block'
  document.querySelector('.J_shake_obj').classList.remove('shake')
})

document.querySelector('.J_save').addEventListener('click', function (event) {
  document.querySelector('.J_modal').style.display = 'none'
  document.querySelector('.J_op').style.display = 'none'
  document.querySelector('.J_result_get_resolve').style.display = 'block'
  document.querySelector('.J_shake_obj').classList.remove('shake')
  draw(document.querySelector('.J_result_get_resolve').getAttribute('data-id'))
})

document.querySelector('.J_close2').addEventListener('click', function (event) {
  document.querySelector('.J_modal2').style.display = 'none'
})

launch()
