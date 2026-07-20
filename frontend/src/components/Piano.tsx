import * as Tone from "tone";
import getKeys from "../data/keys";

// ponytail: module-level singleton — one piano on page, no per-instance sampler needed
const sampler = new Tone.Sampler({
  urls: {
    A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3",
    A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3",
    A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3",
    A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3",
    A4: "A4.mp3", C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3",
    A5: "A5.mp3", C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3",
    A6: "A6.mp3", C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3",
    A7: "A7.mp3", C8: "C8.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

async function playNote(note: string, octave: number) {
  await Tone.start(); // resumes AudioContext on first gesture, no-op after
  sampler.triggerAttackRelease(`${note}${octave}`, "8n");
}

function Piano({ octaveCount }: { octaveCount: number })
{
    const keys = getKeys(octaveCount);
  const whiteKeys = keys.filter((key) => !key.isBlack);
  const blackKeys = keys.filter((key) => key.isBlack);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        {whiteKeys.map((key) => (
          <div
            key={key.position}
            onMouseDown={() => playNote(key.note, key.octave)}
            style={{
              width: "48px",
              height: "180px",
              background: "white",
              border: "1px solid black",
            }}
          />
        ))}

        {blackKeys.map((key) => {
          const whiteKeysBefore = keys.filter(
            (k) => !k.isBlack && k.position < key.position,
          ).length;
          return (
            <div
              key={key.position}
              onMouseDown={() => playNote(key.note, key.octave)}
              style={{
                position: "absolute",
                left: `${whiteKeysBefore * 48 - 16}px`,
                width: "32px",
                height: "110px",
                background: "black",
                zIndex: 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Piano;
