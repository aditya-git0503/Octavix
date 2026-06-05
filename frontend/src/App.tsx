import {useEffect, useState} from "react";

function App() {
    const[status, setStatus] = useState("Loading...");
    useEffect(() =>{
            fetch('/api/health')
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok") {
                        setStatus("backend OK");
                    }
                })
                .catch(() => setStatus("backend error"))
    }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight text-white">Octavix</h1>
      <p className="mt-3 text-zinc-400 text-lg">The most beautiful way to learn piano in your browser.</p>
        <p>{status}</p>
    </div>
  )
}

export default App
