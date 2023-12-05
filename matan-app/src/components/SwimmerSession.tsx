// SwimmerSession.tsx
import React, { useState, useEffect } from "react";

interface SwimmerSessionProps {
  name: string;
  swimTime: number; // in seconds
  pools: number;
  index: number;
  sound: Howl;
}

function delay(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const SwimmerSession: React.FC<SwimmerSessionProps> = ({
  name,
  swimTime,
  pools,
  index,
  sound,
}) => {
  const [whistleCount, setWhistleCount] = useState(0);

  const [isLastRound, setIsLastRound] = useState("");

  useEffect(() => {
    (async () => {
      await delay(index * 5);

      setWhistleCount((prev) => prev + 1);
      pools === 1 && setIsLastRound("Last Exist");
      sound.play();
      if (pools > 1) {
        const intervalId = setInterval(() => {
          console.log(`index ${index}`);
          setWhistleCount((prevCount) => {
            if (prevCount >= pools - 1) {
              setIsLastRound("Last Exist");
              clearInterval(intervalId);
              console.log(`dying ${index}`);
            }
            sound.play();
            return prevCount + 1;
          });
        }, swimTime * 1000);
      }
    })();
  }, []);

  return (
    <div>
      <p>{`${name} - Whistle Count: ${whistleCount} - ${isLastRound} `}</p>
    </div>
  );
};

export default SwimmerSession;
