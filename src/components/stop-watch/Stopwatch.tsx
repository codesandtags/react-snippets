import * as React from "react";
import { formatTime } from "./utils";

const Stopwatch: React.FC = () => {
  const [seconds, setSeconds] = React.useState<number>(0);
  const [running, setRunning] = React.useState<boolean>(false);
  const ref = React.useRef<number | null>(null);

  const handleClick = () => {
    console.log({
        seconds,
        running,
        ref: ref.current,
    })
    if (!running) {
      ref.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
      setRunning(true);
    } else {
      if (ref.current !== null) {
        window.clearInterval(ref.current);
      }
      setRunning(false);
    }
  };

  return (
    <main>
      <h1>{formatTime(seconds)}</h1>
      <button
        style={{ background: running ? "var(--red)" : "var(--green)" }}
        onClick={handleClick}
      >
        {running ? "Stop" : "Start"}
      </button>
    </main>
  );
};

export default Stopwatch;