import React, { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Button = styled.button`
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  margin-top: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  object-fit: cover;
  height: auto;
`;

const ZoomZone = styled.svg`
  width: ${(props) => props.window || "200px"};
  height: ${(props) => props.window || "200px"};
  background-color: white;
  overflow: hidden;
  z-index: 10;
`;

export default function ImageZoom({
  imageUrl = "https://ik.imagekit.io/tudxtwork524/Picture1.png?updatedAt=1745764015404",
  window = 200,
}) {
  const [isZoomEnabled, setIsZoomEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isZoomEnabled || !imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setMousePos({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomEnabled(!isZoomEnabled);
  };

  return (
    <Container>
      <Button onClick={toggleZoom}>
        {isZoomEnabled ? "Tắt Phóng To" : "Bật Phóng To"}
      </Button>

      <ImageWrapper>
        <StyledImage
          src={imageUrl}
          ref={imgRef}
          onMouseMove={handleMouseMove}
        />
      </ImageWrapper>

      {isZoomEnabled && (
        <ZoomZone window={window} transform="scale">
          <defs>
            <clipPath id="circleView">
              <rect x={0} y={0} width={window} height={window} />
            </clipPath>
          </defs>

          <image
            href={imageUrl}
            x={-mousePos.x + window / 2}
            y={-mousePos.y + window / 2}
            width={imgRef.current?.naturalWidth || 0}
            height={imgRef.current?.naturalHeight || 0}
            clipPath="url(#circleView)"
          />
        </ZoomZone>
      )}
    </Container>
  );
}
