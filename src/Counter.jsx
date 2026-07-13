import { useState, useEffect } from 'react';

function Counter({ target = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <>{count}</>;
}

export default Counter;