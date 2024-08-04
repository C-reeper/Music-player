//Music array include all music information 
allMusic=[
  {
    name: "Faded",
    artist: "Alan Walker ",
    img: "assets/img/music1",
    src: "assets/song/music1",
  },
  {
    name: "Infinity",
    artist: "Jaymes Young",
    img: "assets/img/music2",
    src: "assets/song/music2",
  },
  {
    name: "Heatwave",
    artist: "Glass Animals",
    img: "assets/img/music3",
    src: "assets/song/music3",
  },
  {
    name: "Another love",
    artist: "Tob Odell",
    img: "assets/img/music4",
    src: "assets/song/music4",
  }
  ]
  
// important variables 
const mainImg=document.getElementById('mainimg');
const audio = document.getElementById('audio');
const songName=document.getElementById('songname');
const artist = document.getElementById('artist');
const progressBar = document.getElementById('progressbar');
const playPauseBtn = document.getElementById('play-pause');
const stepBackwardBtn = document.getElementById('step-backward');
const stepForwardBtn = document.getElementById('step-forward');
const shuffleBtn = document.getElementById('shuffle');
const heartElem=document.getElementById('heart');
const repeatElem=document.getElementById('repeat');
const playBgElem=document.getElementById('playbg');
const durationElem=document.getElementById('duration');
const currentTimeElem=document.getElementById('current-time');
const showlistnum=document.getElementById('tracklist');
const listLen = allMusic.length;
const favouriteSonglist = [];

//current musicNumber this is zero because of index but we show one on screen 
let musicNumber=0;
  
  


//make page according to current music 
function setPage(musicNumber) {
  artist.innerText = `${allMusic[musicNumber ].artist}`;
  songName.innerText = `${allMusic[musicNumber ].name}`;
  mainImg.src = `${allMusic[musicNumber].img}.jpg`;
  audio.src = `${allMusic[musicNumber ].src}.mp3`;
  playBgElem.src = `${allMusic[musicNumber ].img}.jpg`;
  
  if(playPauseBtn.src.includes('assets/buttons/circle-pause-solid.svg')){
    audio.play();
  }
  
  
  if(!favouriteSonglist.includes(musicNumber)){
    heartElem.src = '/assets/buttons/heart-regular.svg';
  } 
  else{
    heartElem.src = '/assets/buttons/heart-solid.svg'
  }
  
  
  
}

//format music current time to show on screen 
function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : "" }` + `${seconds}`;
}





// Set duration when according to music
audio.addEventListener('loadedmetadata', function(){
    durationElem.innerText = formatTime(audio.duration);
    progressbar.max = 99.9;//not hundred because when you use progress bar go to end then automatically music change to prevent this
    progressbar.value = 0;
  });
  
  
  // Update progress bar and current time on timeupdate
  audio.addEventListener('timeupdate', function() {
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    progressbar.value = progressPercentage;
    progressbar.style.background = `linear-gradient(90deg, white ${progressPercentage}%, grey 0%)`;
    currentTimeElem.innerText = formatTime(audio.currentTime);
  });
  
  
// Allow user to control music by using the progress bar
progressbar.addEventListener('input', function() {
    const newTime = (progressbar.value / 100) * audio.duration;
    audio.currentTime = newTime;
});
  
  
//main music control button play and pause music with
playPauseBtn.addEventListener('click', () => {
  
  if(audio.paused){
    audio.play();
    mainImg.style.transform='scale(1.03)'
    playPauseBtn.src='assets/buttons/circle-pause-solid.svg'
  }
  else{
    audio.pause();
    mainImg.style.transform='scale(1)'
    playPauseBtn.src='assets/buttons/circle-play-solid.svg'
  }
  
});


// go to next music increase music number 
stepForwardBtn.addEventListener('click',function () {
  
  musicNumber++;
  //making loop go to first music after music end
  if(musicNumber >= listLen){
    musicNumber=0;
  }
  
  setTrackList(musicNumber,listLen);
  setPage(musicNumber)
});


//go to previous music decrease music number
stepBackwardBtn.addEventListener('click',function () {
  musicNumber--;
  
  //previous music of first one is last one
  if(musicNumber < 0){
    musicNumber=listLen-1;
  }
  setTrackList(musicNumber, listLen);
  setPage(musicNumber)
  
});


// on and off shuffle switch but there is only switch main function is above 
let shuffleSwitch=false;

shuffleBtn.addEventListener('click',
()=>{
  
  shuffleSwitch = !shuffleSwitch;
  
  if(shuffleSwitch){
    
    shuffleBtn.src='/assets/buttons/shuffle.png';
  }
  else{
    shuffleBtn.src='/assets/buttons/change.png';
  }

});









// this function on and off loop switch but not repeat audio

let loop = false;
repeatElem.addEventListener('click', () => {
  loop = !loop;
  if(loop){
  repeatElem.src='/assets/buttons/repeat-1.png'
  }
  else{
    repeatElem.src='/assets/buttons/repeat.png'
  }
});




audio.addEventListener('ended', () => {
  // here is audio repet system according to loop 
  if (loop) {
    audio.play()
    
  }
  //here is main shuffling system playing random song after music end
  else if(shuffleSwitch){
    musicNumber=Math.floor(Math.random()*4);
    setPage(musicNumber);
    setTrackList(musicNumber,listLen);
  }
  else{
    musicNumber++;
    setTrackList(musicNumber,listLen);
    setPage(musicNumber);
  }
});


// heart toggle button 
heartElem.addEventListener('click', () => {
  
  if (heartElem.src.includes('heart-regular.svg')) {
    favouriteSonglist.push(musicNumber)
    heartElem.src = 'assets/buttons/heart-solid.svg';
  } else {
    
    let musicNumIndex=favouriteSonglist.indexOf(musicNumber);
    favouriteSonglist.splice(musicNumIndex,1);
    
    heartElem.src = 'assets/buttons/heart-regular.svg';
    
  }
  console.log(favouriteSonglist);
});




function setTrackList(musicNumber,listLen) {
 
  //+1 because music number is according to array index and array start with 0 
  tracklist.innerText=musicNumber+1+' of '+listLen;
}


setPage(musicNumber);
setTrackList(musicNumber,listLen);


