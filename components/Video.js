import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import styles from "../styles/Streamvideo.module.css";
import LoadStream from './LoadStream'

export default function StreamVideo() {
  const router = useRouter(),
        { id } = router.query
  useEffect(() => {
    if (document && id != undefined) {
      const faceMediaSource = new MediaSource();
      const screenMediaSource = new MediaSource();

      const faceurl = URL.createObjectURL(faceMediaSource);
      const screenurl = URL.createObjectURL(screenMediaSource);

      const face = document.getElementById("face_video");
      const screen = document.getElementById("screen_video");

      face.src = faceurl;
      screen.src = screenurl;

      faceMediaSource.addEventListener('sourceopen', function(){
      const sourceBufferForScreen = screenMediaSource.addSourceBuffer(
        'video/mp4; codecs="avc1.64001e"'
      );

      axios.get(`https://www.vp.up.railway.app/video`,{
        params:{
          id,type:"screen"
        },
        headers:{
          "Content-Type": "video/mp4"
        }
      })
      .then(function (response) {
        // The data has to be a JavaScript ArrayBuffer
        return response.arrayBuffer();
      })
      .then(function (audioData) {
        sourceBufferForScreen.appendBuffer(audioData);
      })
      .catch(err=>console.error(err))
      })


      screenMediaSource.addEventListener('sourceopen', function(){
        const sourceBufferForFace = faceMediaSource.addSourceBuffer(
          'video/mp4; codecs="avc1.64001e"'
        );

        axios.get(`https://www.vp.up.railway.app/video`,{
          params:{
            id,type:"face"
          },
          headers:{
            "Content-Type": "video/mp4"
          }
        })
        .then(function (response) {
          // The data has to be a JavaScript ArrayBuffer
          return response.arrayBuffer();
        })
        .then(function (audioData) {
          sourceBufferForFace.appendBuffer(audioData);
        })
        .catch(err=>console.error(err))
        })

      chokedar();
    }
  }, [id]);

  function chokedar() {
    const interval = setInterval(() => {
      var difference = function (a, b) {
        return Math.abs(a - b);
      };

      const face = document.getElementById("face_video");
      const screen = document.getElementById("screen_video");
      const timer = document.getElementById("video_time");
      const tracker = document.getElementById("video_meter");
      const button = document.getElementById("play_pause");

      if (difference(face.currentTime, screen.currentTime) > 1) {
        if (face.currentTime < screen.currentTime) {
          screen.currentTime = face.currentTime;
        } else {
          face.currentTime = screen.currentTime;
        }
      }
      if (
        face.currentTime == face.duration ||
        screen.currentTime == screen.duration
      ) {
        face.currentTime = face.duration;
        screen.currentTime = screen.duration;
        button.innerHTML = `<img src="/play.png" />`;
        tracker.value = 100;
      }

      if (face.duration <= screen.duration) {
        var currentMinutes = Math.floor(face.currentTime / 60),
          currentSeconds = Math.floor(
            face.currentTime - Math.floor(face.currentTime / 60) * 60
          ),
          totalMinutes = Math.floor(face.duration / 60),
          totalSeconds = Math.floor((face.duration / 60 - totalMinutes) * 60);
        timer.innerText = `${
          currentMinutes <= 9 ? `0${currentMinutes}` : currentMinutes
        }:${currentSeconds <= 9 ? `0${currentSeconds}` : currentSeconds} / ${
          totalMinutes <= 9 ? `0${totalMinutes}` : totalMinutes
        }:${totalSeconds <= 9 ? `0${totalSeconds}` : totalSeconds}`;
      } else {
        var currentMinutes = Math.floor(screen.currentTime / 60),
          currentSeconds = Math.floor(
            screen.currentTime - Math.floor(screen.currentTime / 60) * 60
          ),
          totalMinutes = Math.floor(screen.duration / 60),
          totalSeconds = Math.floor((screen.duration / 60 - totalMinutes) * 60);
        timer.innerText = `${
          currentMinutes <= 9 ? `0${currentMinutes}` : currentMinutes
        }:${currentSeconds <= 9 ? `0${currentSeconds}` : currentSeconds} / ${
          totalMinutes <= 9 ? `0${totalMinutes}` : totalMinutes
        }:${totalSeconds <= 9 ? `0${totalSeconds}` : totalSeconds}`;
      }

      if (face.paused == false || screen.paused == false) {
        tracker.value = (face.currentTime * 100) / face.duration;
      }
    }, 1000);
    return () => clearInterval(interval);
  }

  function firstStart() {
    const face = document.getElementById("face_video");
    const meter = document.getElementById("vol_meter");
    const button = document.getElementById("mute_unmute");
    if (meter.getAttribute("firstClicked") == "false") {
      meter.setAttribute("firstClicked", "true");
      meter.value = 10;
      setVol(10);
      face.muted = false;
      button.innerHTML = `<img src="/unmuted.png" />`;
    }
  }

  function playPause() {
    const face = document.getElementById("face_video");
    const screen = document.getElementById("screen_video");
    const button = document.getElementById("play_pause");

    firstStart();

    if ((face.paused || face.ended) && (screen.paused || screen.ended)) {
      face.play();
      screen.play();
    } else {
      face.pause();
      screen.pause();
    }
    button.innerHTML = `<img src="/${
      (face.paused || face.ended) && (screen.paused || screen.ended)
        ? "play"
        : "pause"
    }.png" />`;
  }
  function muteUnmute() {
    const face = document.getElementById("face_video");
    const button = document.getElementById("mute_unmute");

    if (face.muted) {
      face.muted = false;
      firstStart();
    } else {
      face.muted = true;
    }
    button.innerHTML = `<img src="/${face.muted ? "muted" : "unmuted"}.png" />`;
  }
  function setVol(e) {
    const button = document.getElementById("mute_unmute");
    const face = document.getElementById("face_video");
    if (e == 0) {
      button.innerHTML = `<img src="/muted.png" />`;
    } else {
      button.innerHTML = `<img src="/unmuted.png" />`;
    }
    face.volume = e / 100;
  }
  function setVed(e) {
    const face = document.getElementById("face_video");
    const screen = document.getElementById("screen_video");

    face.currentTime = (face.duration * e) / 100;
    screen.currentTime = (screen.duration * e) / 100;
  }

  if(router.isReady){
      return (
    <section className={styles.stream_sec}>
      <div className={styles.thumnail}>

      </div>
      <video
        // src={`https://www.vp.up.railway.app/video?id=${id}&type=screen`}
        width="800px"
        height="auto"
        className={styles.screen_video}
        id="screen_video"
        poster="/thumnail2.png"
        muted
      />
      <div className={styles.face_container}>
        <video
          // src={`https://www.vp.up.railway.app/video?id=${id}&type=face`}
          width="800px"
          height="auto"
          id="face_video"
          className={styles.face_video}
          poster="/me.png"
          muted
        />
      </div>
      <section className={styles.controls_sec}>
        <button id="play_pause" onClick={playPause}>
          <img src="/play.png" />
        </button>
        <button id="mute_unmute" onClick={muteUnmute}>
          <img src="/muted.png" />
        </button>
        <input
          type="range"
          onClick={(e) => setVol(e.target.value)}
          id="vol_meter"
          className={styles.vol_meter}
          defaultValue="0"
          firstClicked="false"
        />
        <input
          type="range"
          id="video_meter"
          onClick={(e) => setVed(e.target.value)}
          className={styles.video_meter}
          defaultValue="0"
        />
        <p id="video_time"></p>
      </section>
    </section>
  );
  }
  else{
    return <LoadStream/>
  }
}
