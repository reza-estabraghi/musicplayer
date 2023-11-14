
const arrey = ['img/25.jpg', 'img/22.jpg', 'img/26.jpg', 'img/27.jpg', "img/17w.jpg", 'img/18.jpg', 'img/19.jpg', 'img/20.jpg', 'img/21.jpg', 'img/23.jpg', 'img/24.jpg', 'img/31.jpg', 'img/28.jpg', 'img/29.jpg', 'img/30.jpg', 'img/32.jpg']
let _icon = document.querySelectorAll(".icon>i");
const src = document.querySelectorAll(".box audio");
const _list = document.querySelectorAll('.list');
const img = document.querySelectorAll('.box img')
const name1 = document.querySelectorAll('.box h5');
let range = document.querySelector('.seek')
let start = document.querySelector('.start')
let end = document.querySelector('.end')
let _img = document.getElementById('img')
let volIcon = document.querySelector('.vol>i')
let volFlag = 0 
let p = 0;
let s = src[0];
let c = 0
let m = 0
let time = ''
let i = ''
let name2 = ''
let min = ''
let sec = ''
let volume1 = document.getElementById('vol')


// **************************************************************************************


// **********************play pause and stop****************************************

_list.forEach((val, index) => {
  val.addEventListener('click', (e) => {
    name2 = name1[index].innerHTML
    stop()
    p = index
    s = src[index]
    i = arrey[index]
    console.log(i);
    s.volume = '0.' + volume1.value
    _img.setAttribute('src', img[index].getAttribute('src'))
    discover()
    etime()
  })
})


_icon[3].addEventListener('click', (e) => {
  pause()
})
_icon[2].addEventListener('click', (e) => {
  play()
})
_icon[1].addEventListener('click', (e) => {
  stop()
})



function play() {
  s.play()
  time = setInterval((e) => {
    range.value = parseInt(s.currentTime)
    range.max = parseInt(s.duration)
    c = parseInt(s.currentTime%60)
    start.innerHTML = '0:0' + (c++)
    if (c >= 59) {
      c = 0
      start.innerHTML = (m++) + ':' + (c)
    } else if (m >= 0) {
      start.innerHTML = m + ':' + (c)
    }
    if (s.currentTime == s.duration) {
      stop()
      next()
      play()
    }
  }, 1000);
}
function pause() {
  s.pause()
  clearInterval(time)
}
function stop() {
  s.currentTime = 0
  m = 0
  c = 0
  clearInterval(time)
  s.pause()
}

// *********************end play pause and stop*******************************

// ****************************volume*********************************************
volume1.addEventListener('change', () => {
  s.volume = volume1.value / 100;
  if(s.volume == 0){
    volIcon.classList.remove('bi-volume-down-fill')
    volIcon.classList.add('bi-volume-mute-fill')
  }else{
    volIcon.classList.add('bi-volume-down-fill')
    volIcon.classList.remove('bi-volume-mute-fill')
  }
})
volIcon.addEventListener('click',()=>{
  if(volFlag == 0){
    s.volume = 0
    console.log('yes');
    volIcon.classList.remove('bi-volume-down-fill')
    volIcon.classList.add('bi-volume-mute-fill')
    volFlag++
  }else{
    s.volume = volume1.value / 100;
    console.log(volFlag);
    volIcon.classList.add('bi-volume-down-fill')
    volIcon.classList.remove('bi-volume-mute-fill')
    volFlag--
  }
})


// *************************Endvolume*******************************************



// **************************musicrange*******************************************


range.addEventListener('change', (e) => {
  let x = range.value
  console.log(x);
  m = parseInt(x / 60)
  c = x % 60
  s.currentTime = x
})


// ************************endmusicrange*********************************************



// ***********************next and previuse*****************************

_icon[4].addEventListener('click', (e) => {
  stop()
  next()
  play()
})

function next() {
  p++
  if (p >= 15) {
    p = 0
    console.log(p);
  }
  s = src[p];
  i = arrey[p]
  name2 = name1[p].innerHTML
  s.volume = '0.' + volume1.value
  _img.setAttribute('src', img[p].getAttribute('src'))
  discover()
  etime()

}


_icon[0].addEventListener('click', (e) => {
  stop()
  prev()
  play()
})
function prev() {
  p--
  s = src[p];
  i = arrey[p]
  name2 = name1[p].innerHTML
  console.log(p)
  s.volume = '0.' + volume1.value
  _img.setAttribute('src', img[p].getAttribute('src'))
  discover()
  etime()
  if (p <= 0) {
    p = 16
  }
}
// ****************************end next and previuse*************************
function discover() {
  document.getElementsByClassName('discover')[0].style.backgroundImage = 'url(' + i + ')'
  document.getElementById('h5').innerHTML = name2
}
function etime() {
  min = parseInt((s.duration) / 60)
  sec = (parseInt(s.duration) % 60)
  end.innerHTML = min + ':' + sec
}