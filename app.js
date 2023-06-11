const play=document.getElementById('play');
const song_thumb=document.getElementById('song_thumb');
const music=document.getElementById('music');
const forward=document.getElementById('forward');
const backward=document.getElementById('backward');

const musicCT=document.getElementById('mct');
const musicd=document.getElementById('md');
const track=document.getElementById('track');
const progressbar=document.querySelector('.progressbar');
const download=document.getElementById('download');

let path="media/music/";

// * music data
const musicData=[
    {
        audio:`${path}music1.mp3`
    },
    {
        audio:`${path}music2.mp3`
    },
    {
        audio:`${path}music3.mp3`
    },
    {
        audio:`${path}music4.mp3`
    },
    {
        audio:`${path}music5.mp3`
    },
    {
        audio:`${path}music6.mp3`
    },
    {
        audio:`${path}music7.mp3`
    },
    {
        audio:`${path}music8.mp3`
    },
    {
        audio:`${path}music9.mp3`
    },
    {
        audio:`${path}music10.mp3`
    },
]

// * for play and pause music
let onMusic=false;
const play_Music_pause=()=>{
    if(!onMusic){
        onMusic=true;
        play.classList.replace('fa-play','fa-pause');
        song_thumb.classList.add('animate');
        music.play();
    }
    else{
        onMusic=false;
        play.classList.replace('fa-pause','fa-play');
        song_thumb.classList.remove('animate');
        music.pause();
    }
}

// * for next song 
let loop=0;
const next=()=>{
    loop=(loop+1)%musicData.length;
    music.src=musicData[loop].audio;
    download.href=musicData[loop].audio;
    
    if(onMusic){
        onMusic=false;
        play_Music_pause();
    }
    else{
        onMusic=true;
        play_Music_pause();
    }
}
// * for previous song
const prev=()=>{
    loop=(loop-1+musicData.length)%musicData.length;
    music.src=musicData[loop].audio;
    download.href=musicData[loop].audio;

    if(onMusic){
        onMusic=false;
        play_Music_pause();
    }
    else{
        onMusic=true;
        play_Music_pause();
    }
}

// * command for play,pause ,next,previous song
play.addEventListener('click',play_Music_pause);
forward.addEventListener('click',next);
backward.addEventListener('click',prev);

// * after end of one song
music.addEventListener('ended',next);

// *time maintainer 
const timeMaintain=function(e){
    const musicCurrentTime=e.srcElement.currentTime;
    const musicDuration=e.srcElement.duration;
    musicCT.innerText=`${Math.floor(musicCurrentTime/60)}:${Math.floor(musicCurrentTime%60)}`
    musicd.innerText=`${Math.floor(musicDuration/60)}:${Math.floor(musicDuration%60)}`

    let progress =Math.floor((musicCurrentTime/musicDuration)*100);
    track.style.width=`${progress}%`
    
}

// *after every second it is update
music.addEventListener('timeupdate',timeMaintain);

// * change the time of  song
progressbar.addEventListener('click',function(e){
    const totalWidth=e.srcElement.clientWidth;
    const change=e.offsetX;
    let progress =Math.floor((change/totalWidth)*100);
    track.style.width=`${progress}%`
    music.currentTime=((music.duration *progress)/100)
})

