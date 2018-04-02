$(document).ready(function(){
    var videos = 7; // total videos
    var video = document.querySelector(".sidebar__video--full-height");
    var source = document.createElement("source");
    var i = 1;
    source.setAttribute("src", "./assets/video/splash" + i + ".mp4");
    // console.log("./assets/video/splash" + i + ".mp4");
    video.appendChild(source);
    video.play();
    i++;
    video.onended = function(){
        if(i > videos) i = 1;
        video.src = "./assets/video/splash" + i + ".mp4";
        // console.log("./assets/video/splash" + i + ".mp4");
        video.load();
        video.play();
        i++;
    }
});