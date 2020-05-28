class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");

    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hatAudio = document.querySelector(".hat-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.clapAudio = document.querySelector(".clap-sound");

    this.index = 0;
    this.bpm = 150;

    this.isPlaying = null;

    this.selects = document.querySelectorAll("select");
  }

  repeat() {
    let step = this.index % 10;
    const activeBars = document.querySelectorAll(`.b${step}`);

    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }

        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }

        if (bar.classList.contains("hat-pad")) {
          this.hatAudio.currentTime = 0;
          this.hatAudio.play();
        }

        if (bar.classList.contains("crash-pad")) {
          this.crashAudio.currentTime = 0;
          this.crashAudio.play();
        }

        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
      }
    });

    this.index++;
  }

  start() {
    console.log(this.index);
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  activePad() {
    this.classList.toggle("active");
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove("active");
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hat-select":
        this.hatAudio.src = selectionValue;
        break;
      case "crash-select":
        this.crashAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
    }
  }
}

const drumKit = new DrumKit();

// Event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playButton.addEventListener("click", function () {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
