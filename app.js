class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.colorButton = document.querySelector(".color");

    this.currentKick = "./allSounds/kick-classic.wav";
    this.currentSnare = "./allSounds/snare-brute.wav";
    this.currentHat = "./allSounds/hihat-acoustic02.wav";
    this.currentCrash = "./allSounds/crash-808.wav";
    this.currentClap = "./allSounds/clap-slapper.wav";

    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hatAudio = document.querySelector(".hat-sound");
    this.crashAudio = document.querySelector(".crash-sound");
    this.clapAudio = document.querySelector(".clap-sound");

    this.index = 0;
    this.bpm = 150;

    this.isPlaying = null;

    this.selects = document.querySelectorAll("select");

    this.muteButtons = document.querySelectorAll(".mute");

    this.tempoSlider = document.querySelector(".tempo-slider");

    this.colorHead = document.querySelector("h2");
    this.isRandomColoring = null;

    this.volumeSliders = document.querySelectorAll(".volume-slide");
  }

  repeat() {
    let step = this.index % 8;
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

    if (this.colorButton.classList.contains("active")) {
      this.changeTitleColor();
    }

    this.index++;
  }

  start() {
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

  changeVolume(e) {
    console.log("change volume");
    var dict = {
      0: this.kickAudio,
      1: this.snareAudio,
      2: this.hatAudio,
      3: this.crashAudio,
      4: this.clapAudio,
    };

    const changeIndex = e.target.getAttribute("data-track");

    dict[changeIndex].volume = e.target.value;
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");

    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hatAudio.volume = 0;
          break;
        case "3":
          this.crashAudio.volume = 0;
          break;
        case "4":
          this.clapAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hatAudio.volume = 1;
          break;
        case "3":
          this.crashAudio.volume = 1;
          break;
        case "4":
          this.clapAudio.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
    }
  }

  detectContrast(hexcolor) {
    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === "#") {
      hexcolor = hexcolor.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
      hexcolor = hexcolor
        .split("")
        .map(function (hex) {
          return hex + hex;
        })
        .join("");
    }

    // Convert to RGB value
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;

    // Check contrast
    return yiq >= 128 ? "black" : "white";
  }

  RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;

    return "#" + r + g + b;
  }

  changeTitleColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.colorHead.style.background = "#" + randomColor;

    this.colorHead.style.color = this.detectContrast(
      this.RGBToHex(this.colorHead.style.background)
    );
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

drumKit.colorButton.addEventListener("click", () => {
  drumKit.colorButton.classList.toggle("active");
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo();
});

drumKit.volumeSliders.forEach((slider) => {
  slider.addEventListener("input", function (e) {
    drumKit.changeVolume(e);
  });
});
