import React, { useState, useRef } from 'react';

interface CubePreviewProps {
  length: number;
  width: number;
  height: number;
}

const CubePreview: React.FC<CubePreviewProps> = ({ length, width, height }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize dimensions for display
  const maxDim = Math.max(length, width, height, 1);
  const scaleFactor = 150 / maxDim; // 150 is the target max size in pixels
  
  const scaledWidth = width * scaleFactor;
  const scaledHeight = height * scaleFactor;
  const scaledLength = length * scaleFactor;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    setRotation(prev => ({
      x: prev.x - dy * 0.5,
      y: prev.y + dx * 0.5
    }));
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
    }
  };
  
  const handleMouseLeave = () => {
    if (isDragging) {
        setIsDragging(false);
        if (containerRef.current) {
            containerRef.current.style.cursor = 'grab';
        }
    }
  };

  // Don't render if dimensions are invalid or zero
  if (scaledWidth <= 0 || scaledHeight <= 0 || scaledLength <= 0) {
    return (
        <div className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 p-4 text-center">
            <p>Enter dimensions above to see a 3D preview</p>
        </div>
    );
  }

  const cubeStyle: React.CSSProperties = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    width: `${scaledWidth}px`,
    height: `${scaledHeight}px`,
    position: 'relative',
    transformStyle: 'preserve-3d',
  };

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    background: 'rgba(254, 203, 0, 0.8)', // brandYellow with some transparency
    boxSizing: 'border-box',
  };

  const frontBackStyle = { ...faceStyle, width: `${scaledWidth}px`, height: `${scaledHeight}px` };
  const leftRightStyle = { ...faceStyle, width: `${scaledLength}px`, height: `${scaledHeight}px`, left: `${(scaledWidth - scaledLength) / 2}px` };
  const topBottomStyle = { ...faceStyle, width: `${scaledWidth}px`, height: `${scaledLength}px`, top: `${(scaledHeight - scaledLength) / 2}px` };

  return (
    <div 
        className="h-64 w-full bg-slate-100 rounded-lg flex items-center justify-center cursor-grab"
        style={{ perspective: '800px', overflow: 'hidden' }}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
    >
      <div style={cubeStyle} className="transition-transform duration-75 ease-out">
        <div style={{ ...frontBackStyle, transform: `translateZ(${scaledLength / 2}px)` }}></div>
        <div style={{ ...frontBackStyle, transform: `rotateY(180deg) translateZ(${scaledLength / 2}px)` }}></div>
        <div style={{ ...leftRightStyle, transform: `rotateY(-90deg) translateZ(${scaledWidth / 2}px)` }}></div>
        <div style={{ ...leftRightStyle, transform: `rotateY(90deg) translateZ(${scaledWidth / 2}px)` }}></div>
        <div style={{ ...topBottomStyle, transform: `rotateX(90deg) translateZ(${scaledHeight / 2}px)` }}></div>
        <div style={{ ...topBottomStyle, transform: `rotateX(-90deg) translateZ(${scaledHeight / 2}px)` }}></div>
      </div>
    </div>
  );
};

export default CubePreview;