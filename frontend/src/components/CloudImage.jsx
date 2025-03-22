import React, { useState, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";

const CloudImage = ({ w, h, imageUrl }) => {
  const width = w || 1300;
  const height = h || 500;
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (imageUrl) {
      const img = new window.Image();
      img.src = imageUrl;
      img.crossOrigin = "Anonymous";
      img.onload = () => setImage(img);
    }
  }, [imageUrl]);

  const handleDragMove = (e) => {
    console.log("Dragging... Position:", e.target.x(), e.target.y());
  };

  const handleMouseEnter = () => {
    console.log("Mouse Entered the Image");
  };

  const handleMouseLeave = () => {
    console.log("Mouse Left the Image");
  };
  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const newScale = e.evt.deltaY > 0 ? scale / scaleBy : scale * scaleBy;
    setScale(Math.max(0.1, Math.min(newScale, 5)));
  };
  return (
    <Stage
      width={width}
      height={height}
      scaleX={scale}
      scaleY={scale}
      onWheel={handleWheel}
      draggable={false}
    >
      <Layer>
        {image && (
          <Image
            image={image}
            x={0}
            y={0}
            width={width}
            height={height}
            draggable
            onDragMove={handleDragMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default CloudImage;
