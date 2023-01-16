import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import styles from "../styles/Streamvideo.module.css";
import LoadStream from './LoadStream'

export default function StreamVideo({ videoLink }) {

  useEffect(() => {
    if (document) chokedar();
  }, []);

  function chokedar() {
    const interval = setInterval(() => {

      const video = document.getElementById("video");
      const timer = document.getElementById("video_time");
      const tracker = document.getElementById("video_meter");
      const button = document.getElementById("play_pause");

      if (video.currentTime == video.duration) {
        button.innerHTML = `<img src="/play.png" />`;
        tracker.value = 100;
      }

      if (video.paused == false) {
        tracker.value = (video.currentTime * 100) / video.duration;
        var
        currentMinutes = Math.floor(video.currentTime / 60),
        currentSeconds = Math.floor(video.currentTime - Math.floor(video.currentTime / 60) * 60),
        totalMinutes = Math.floor(video.duration / 60),
        totalSeconds = Math.floor((video.duration / 60 - totalMinutes) * 60);

      timer.innerText = `${currentMinutes <= 9 ? `0${currentMinutes}` : currentMinutes
        }:${currentSeconds <= 9 ? `0${currentSeconds}` : currentSeconds} / ${totalMinutes <= 9 ? `0${totalMinutes}` : totalMinutes
        }:${totalSeconds <= 9 ? `0${totalSeconds}` : totalSeconds}`;
      }

    }, 1000);
    return () => clearInterval(interval);
  }

  function firstStart() {
    const meter = document.getElementById("vol_meter");
    const button = document.getElementById("mute_unmute");

    if (meter.getAttribute("firstClicked") == "false") {
      meter.setAttribute("firstClicked", "true");
      meter.value = 10;
      setVol(10);
      button.innerHTML = `<img src="/unmuted.png" />`;
    }
  }

  function playPause() {
    const video = document.getElementById("video");
    const button = document.getElementById("play_pause");

    firstStart();

    if (video.paused || video.ended)
      video.play();
    else
      video.pause();

    button.innerHTML = `<img src="/${(video.paused || video.ended)
      ? "play"
      : "pause"
      }.png" />`;
  }
  function muteUnmute() {
    const video = document.getElementById("video");
    const button = document.getElementById("mute_unmute");

    if (video.muted) {
      video.muted = false;
      firstStart();
    } else {
      video.muted = true;
    }
    button.innerHTML = `<img src="/${video.muted ? "muted" : "unmuted"}.png" />`;
  }

  function setVol(e) {
    const button = document.getElementById("mute_unmute");
    const video = document.getElementById("video");
    if (e == 0) {
      button.innerHTML = `<img src="/muted.png" />`;
    } else {
      if (video.muted == true)
      video.muted = false
      button.innerHTML = `<img src="/unmuted.png" />`;
    }
    video.volume = e / 100;
  }

  function setVed(e) {
    const video = document.getElementById("video");
    video.currentTime = (video.duration * e) / 100;
  }

  return (
    <section className={styles.stream_sec}>
      <video
        src={videoLink}
        width="800px"
        height="auto"
        className={styles.screen_video}
        id="video"
        onClick={playPause}
        poster="/thumnail.png"
      />
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
