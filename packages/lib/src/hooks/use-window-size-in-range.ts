import { useEffect, useState } from "react";

export function useWindowSizeInRange(min: number, max = 1_000_000_000) {
  const [inRange, setInRange] = useState(min <= window.innerWidth && window.innerWidth < max);

  useEffect(() => {
    const onWindowResize = () => {
      setInRange(min <= window.innerWidth && window.innerWidth < max);
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return inRange;
}
