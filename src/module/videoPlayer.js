export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal = document.querySelector('.video-time__total');
  const videoVolume = document.querySelector('.video-volume');
  const videoVolumeMute = document.querySelector('.fa-times');
  const videoFullscreen = document.querySelector('.video-fullscreen');

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };

  const togglePlay = (event) => {
    event.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
    toggleIcon();
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    toggleIcon();
  };

  const addZero = (n) => (n < 10 ? '0' + n : n);

  const changeVolumeValue = () => {
    const valueVolume = videoVolume.value;
    videoPlayer.volume = valueVolume / 100;
  };

  const muteValue = (event) => {
    event.preventDefault();
    if (videoVolume.value > 0) {
      videoVolume.value = 0;
      videoPlayer.volume = 0;
    } else {
      videoVolume.value = 20;
      videoPlayer.volume = 0.2;
    }
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(
      secondsPassed,
    )}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(
      secondsTotal,
    )}`;
  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;
    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoVolume.addEventListener('input', changeVolumeValue);
  videoVolumeMute.addEventListener('click', muteValue);
  // синхронизируем уровень звука на своем и встроенном плеере
  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = Math.round(videoPlayer.volume * 100);
  });

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });
  videoPlayer.addEventListener('fullscreenchange', () => {
    if (document.fullscreen) {
      videoPlayer.controls = true;
    } else {
      videoPlayer.controls = false;
    }
  });

  changeVolumeValue();

  videoPlayerInit.stop = () => {
    videoPlayer.pause();
    toggleIcon();
  };
};
