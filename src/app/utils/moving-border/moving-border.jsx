import React, { useEffect, useRef } from 'react';

const MovingBorder = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let borderX = 0;
    const borderWidth = 10;
    const canvasWidth = canvas.width;
    let speed = 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvas.height);

      // Update border position
      borderX += speed;

      // Check for border going off-screen
      if (borderX + borderWidth > canvasWidth || borderX < 0) {
        speed *= -1; // Reverse direction
      }

      // Draw the border
      ctx.fillStyle = 'blue';
      ctx.fillRect(borderX, 0, borderWidth, canvas.height);

      // Draw the children element on top of the border
      ctx.save(); // Save current context
      ctx.clip(); // Clip the drawing area to the border rectangle
      ctx.translate(borderX, 0); // Translate content based on border position
      {children} // Render the children element
      ctx.restore(); // Restore saved context

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} width={500} height={200} style={{ border: '1px solid black' }} />
      {children} {/* Render children outside the canvas */}
    </div>
  );
};

export default MovingBorder;
