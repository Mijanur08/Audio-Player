console.log("Welcome to spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterPlay');
let progressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('mastersong');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Faded", artist : "Alan Walker", coverPath : "covers/1.jpg", filepath : "songs/1.mp3", duration : "3:32"},
    {songName : "Sanam Teri Kasam", artist : "Ankit Tiwari", coverPath : "covers/2.jpg", filepath : "songs/2.mp3", duration : "5:14"},
    {songName : "Despachito", artist : "Luis Foncy", coverPath : "covers/3.jpg", filepath : "songs/3.mp3", duration : "3:48"},
    {songName : "Tera Zikr", artist : "Darshan Raval", coverPath : "covers/4.jpg", filepath : "songs/4.mp3", duration :"3:28"},
    {songName : "Let me Love You", artist : "Justin Biber", coverPath : "covers/5.jpg", filepath : "songs/5.mp3", duration :"3:26"},
    {songName : "Pal", artist : "Arijit Singh", coverPath : "covers/6.jpg", filepath : "songs/6.mp3", duration :"4:07"},
    {songName : "Tujhe kitna Chahne lage", artist : "Arijit Singh", coverPath : "covers/7.jpg", filepath : "songs/7.mp3", duration : "4:44"},
    {songName : "Pehli Dafa", artist : "Atif Aslam", coverPath : "covers/8.jpg", filepath : "songs/8.mp3", duration : "4:58"},
    {songName : "Wajah Tum Ho", artist : "Arman Malik", coverPath : "covers/9.jpg", filepath : "songs/9.mp3", duration : "5:57"},
    {songName : "Zaalima", artist : "Arijit Singh", coverPath : "covers/10.jpg", filepath : "songs/10.mp3", duration : "4:59"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('artist')[0].innerText = songs[i].artist;
    element.getElementsByClassName('timestamp')[0].innerText = songs[i].duration;
})
function playSong(){
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName + " - " +songs[songIndex].artist;
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
}
function pauseSong(){
    audioElement.pause();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    document.getElementById(songIndex).classList.remove('fa-pause-circle');
    document.getElementById(songIndex).classList.add('fa-play-circle');
}
masterplay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime==0){
        playSong();
    }
    else{
        pauseSong();
    }
})

audioElement.addEventListener('timeupdate',()=>{
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
})
progressbar.addEventListener('change',()=>{
    audioElement.currentTime = (progressbar.value*audioElement.duration/100);
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click',(e) =>{
        if(songIndex==parseInt(e.target.id)){
            if(audioElement.paused) playSong();
            else pauseSong();
        }
        else{
            document.getElementById(songIndex).classList.remove('fa-pause-circle');
            document.getElementById(songIndex).classList.add('fa-play-circle');
            songIndex = parseInt(e.target.id);
            audioElement.src = songs[songIndex].filepath;
            audioElement.currentTime = 0;
            playSong();
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(!audioElement.paused){
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-play-circle');
    }
    songIndex++;
    songIndex%=10;
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    playSong();
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(!audioElement.paused){
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-play-circle');
    }
    songIndex--;
    if(songIndex<0)
    songIndex=0;
    audioElement.src = songs[songIndex].filepath;
    audioElement.currentTime = 0;
    playSong();
})