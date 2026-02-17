const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

document.addEventListener("click", () => {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}, { once: true });


const notes = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.00,
  "G#": 415.30,
  A: 440.00,
  "A#": 466.16,
  B: 493.88
};

function playNote(freq) {
  const now = audioCtx.currentTime;

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc1.type = "triangle";
  osc2.type = "triangle";

  osc1.frequency.value = freq;
  osc2.frequency.value = freq * 1.01; // slight detune

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + 0.02);
  gain.gain.linearRampToValueAtTime(0.6, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

  osc1.start(now);
  osc2.start(now);

  osc1.stop(now + 1.2);
  osc2.stop(now + 1.2);
}

const filter = audioCtx.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 3000;




document.querySelectorAll("[data-note]").forEach(key => {
  key.addEventListener("click", () => {
    const note = key.dataset.note;
    playNote(notes[note]);
  });
});


const keyMap = {
  a: "C",
  w: "C#",
  s: "D",
  e: "D#",
  d: "E",
  f: "F",
  t: "F#",
  g: "G",
  y: "G#",
  h: "A",
  u: "A#",
  j: "B"
};

document.addEventListener("keydown", e => {
  const note = keyMap[e.key];
  if (note) {
    playNote(notes[note]);
  }
});


key.classList.add("bg-gray-300");
setTimeout(() => {
  key.classList.remove("bg-gray-300");
}, 100);

