import { useState } from "react";

import "./App.css";
import SwimmerSession from "./components/SwimmerSession";
import { Howl } from "howler";
import beep from "./components/beep-02.mp3";

function App() {
  const [numSwimmers, setNumSwimmers] = useState(0);
  const [swimTimes, setSwimTimes] = useState(0); // in seconds
  const [pools, setPools] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const sound = new Howl({
    src: [beep],
  });
  const startPractice = () => {
    setIsRunning(true);
  };

  const clearPractice = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1>Swimmer App</h1>
      <label>
        Number of Swimmers:
        <input
          type="number"
          value={numSwimmers}
          disabled={isRunning}
          onChange={(e) => setNumSwimmers(+e.target.value)}
        />
      </label>
      <br />
      <label>
        Swim Times (in seconds):
        <input
          type="number"
          value={swimTimes}
          disabled={isRunning}
          onChange={(e) => setSwimTimes(+e.target.value)}
        />
      </label>
      <br />
      <label>
        Number of Pools:
        <input
          type="number"
          value={pools}
          disabled={isRunning}
          onChange={(e) => setPools(+e.target.value)}
        />
      </label>
      <br />
      <button onClick={startPractice} disabled={isRunning}>
        Start
      </button>
      <button onClick={clearPractice} disabled={!isRunning}>
        Clear
      </button>

      <hr />
      <h2>Swimmer Sessions</h2>

      {isRunning &&
        Array.from({ length: numSwimmers }).map((_, index) => (
          <SwimmerSession
            key={index}
            name={`Swimmer ${index + 1}`}
            swimTime={swimTimes}
            pools={pools}
            index={index + 1}
            sound={sound}
          />
        ))}
    </div>
  );
}
export default App;
