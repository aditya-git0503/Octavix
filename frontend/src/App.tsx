import { useEffect, useState } from "react";
import Piano from "./components/Piano";

function App() {
  const [octaveCount, setOctaveCount] = useState(2);
  const [status, setStatus] = useState("Loading...");
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setStatus("backend OK");
        }
      })
      .catch(() => setStatus("backend error"));
  }, []);

  return (
    <div>
      <button onClick={() => setOctaveCount(1)}>Octave : 1</button>
      <button onClick={() => setOctaveCount(2)}>Octaves : 2</button>
      <button onClick={() => setOctaveCount(3)}>Octaves : 3</button>
      <Piano octaveCount={octaveCount} />
    </div>
  );
}

export default App;
