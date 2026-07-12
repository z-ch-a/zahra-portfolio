export function createIntroScreen() {
  return `
    <div class="intro-screen" id="intro-screen">
      <div class="intro-content">

        <button class="boot-button" id="boot-button">
          INITIALIZE
        </button>

        <div class="terminal" id="terminal"></div>

        <div class="continue-area" id="continue-area">
          <button
            class="continue-button"
            id="continue-button"
            disabled
          >
            PRESS TO CONTINUE
          </button>

          <p class="continue-hint" id="continue-hint">
            CLICK OR PRESS ENTER
          </p>
        </div>

      </div>
    </div>
  `;
}

export function startIntroScreen() {
  const introScreen = document.querySelector("#intro-screen");
  const bootButton = document.querySelector("#boot-button");
  const terminal = document.querySelector("#terminal");
  const continueArea = document.querySelector("#continue-area");
  const continueButton = document.querySelector("#continue-button");

  if (
    !introScreen ||
    !bootButton ||
    !terminal ||
    !continueArea ||
    !continueButton
  ) {
    return;
  }

  const lines = [
    "> Hi.",
    "> Welcome to my portfolio.",
    "> Initializing environment...",
    "> Ready.",
  ];

  let audioContext = null;
  let bootStarted = false;
  let bootFinished = false;
  let websiteEntered = false;

  function wait(milliseconds) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, milliseconds);
    });
  }

  function createMechanicalKeySound(character) {
    if (!audioContext || character === " ") return;

    const now = audioContext.currentTime;

    // Main mechanical click
    const oscillator = audioContext.createOscillator();
    const oscillatorGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(
      120 + Math.random() * 90,
      now
    );

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(
      900 + Math.random() * 500,
      now
    );

    filter.Q.setValueAtTime(1.4, now);

    oscillatorGain.gain.setValueAtTime(
      0.045 + Math.random() * 0.025,
      now
    );

    oscillatorGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.045
    );

    oscillator.connect(filter);
    filter.connect(oscillatorGain);
    oscillatorGain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.05);

    // Short noise layer, similar to a physical key switch
    const bufferSize = Math.floor(audioContext.sampleRate * 0.035);
    const noiseBuffer = audioContext.createBuffer(
      1,
      bufferSize,
      audioContext.sampleRate
    );

    const noiseData = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = audioContext.createBufferSource();
    const noiseGain = audioContext.createGain();
    const noiseFilter = audioContext.createBiquadFilter();

    noiseSource.buffer = noiseBuffer;

    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(
      1200 + Math.random() * 600,
      now
    );

    noiseGain.gain.setValueAtTime(
      0.028 + Math.random() * 0.018,
      now
    );

    noiseGain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.03
    );

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioContext.destination);

    noiseSource.start(now);
  }

  async function typeLine(text) {
    const line = document.createElement("div");
    line.className = "terminal-line";

    const textElement = document.createElement("span");
    textElement.className = "terminal-text";

    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "█";

    line.appendChild(textElement);
    line.appendChild(cursor);
    terminal.appendChild(line);

    for (const character of text) {
      textElement.textContent += character;
      createMechanicalKeySound(character);

      let typingDelay = 35 + Math.random() * 10;

      if (character === ",") {
        typingDelay = 300;
      }

      if (character === ".") {
        typingDelay = 480;
      }

      await wait(typingDelay);
    }

    cursor.remove();
    await wait(700);
  }

  async function startBootSequence() {
    if (bootStarted) return;

    bootStarted = true;

    const AudioContextClass =
      window.AudioContext || window.webkitAudioContext;

    if (AudioContextClass) {
      audioContext = new AudioContextClass();

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    }

    bootButton.classList.add("boot-button--hidden");
    terminal.classList.add("terminal--visible");

    for (const line of lines) {
      await typeLine(line);
    }

    bootFinished = true;

    continueButton.disabled = false;
    continueArea.classList.add("continue-area--visible");
  }

  function enterWebsite() {
    if (!bootFinished || websiteEntered) return;

    websiteEntered = true;
    introScreen.classList.add("intro-screen--hidden");

    window.setTimeout(() => {
      introScreen.remove();

      if (audioContext) {
        audioContext.close();
      }
    }, 900);
  }

  bootButton.addEventListener("click", startBootSequence);
  continueButton.addEventListener("click", enterWebsite);

  window.addEventListener("keydown", (event) => {
    const activationKey =
      event.key === "Enter" || event.key === " ";

    if (!activationKey) return;

    event.preventDefault();

    if (!bootStarted) {
      startBootSequence();
      return;
    }

    if (bootFinished) {
      enterWebsite();
    }
  });
}