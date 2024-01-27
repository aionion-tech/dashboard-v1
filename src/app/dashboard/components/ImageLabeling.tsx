"use client";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Image, Text, Rect } from "react-konva";
import useImage from "use-image";

export interface Annotation {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
}

interface Props {
  imageUrl: string;
  annotations: Annotation[];
  onAnnotationsChange: (newAnnotations: Annotation[]) => void;
  activeLabel: string;
}

const ImageCanvas: React.FC<Props> = ({
  imageUrl,
  annotations,
  onAnnotationsChange,
  activeLabel,
}) => {
  const [image, status] = useImage(imageUrl);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );

  const handleMouseDown = (event: any) => {
    const { x, y } = event.target.getStage().getPointerPosition();
    setCurrentAnnotation({ x1: x, y1: y, x2: x, y2: y, label: activeLabel });
  };

  const handleMouseMove = (event: any) => {
    if (!currentAnnotation) return;
    const { x, y } = event.target.getStage().getPointerPosition();
    setCurrentAnnotation({ ...currentAnnotation, x2: x, y2: y });
  };

  const handleMouseUp = () => {
    if (!currentAnnotation) return;
    const MIN_WIDTH = 10;
    const MIN_HEIGHT = 10;
    const width = Math.abs(currentAnnotation.x2 - currentAnnotation.x1);
    const height = Math.abs(currentAnnotation.y2 - currentAnnotation.y1);

    if (width < MIN_WIDTH && height < MIN_HEIGHT) {
      setCurrentAnnotation(null);
      return;
    }

    const finalAnnotation = {
      x1: Math.min(currentAnnotation.x1, currentAnnotation.x2),
      y1: Math.min(currentAnnotation.y1, currentAnnotation.y2),
      x2: Math.max(currentAnnotation.x1, currentAnnotation.x2),
      y2: Math.max(currentAnnotation.y1, currentAnnotation.y2),
      label: currentAnnotation.label,
    };

    const newAnnotations = [...annotations, finalAnnotation];
    onAnnotationsChange(newAnnotations);
    setCurrentAnnotation(null);
  };

  const handleAnnotationClick = (index: number) => {
    const newAnnotations = annotations.filter((_, i) => i !== index);
    onAnnotationsChange(newAnnotations);
  };

  useEffect(() => {
    const handleResize = () => {
      if (image && status === "loaded") {
        const aspectRatio = image.width / image.height;
        const height = window.innerHeight * 0.8;
        const width = height * aspectRatio;

        setCanvasSize({ width, height });
      }
    };

    if (status === "loaded") {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [image, status]);

  if (status !== "loaded") {
    return <div>Loading...</div>;
  }

  return (
    <Stage
      width={canvasSize.width}
      height={canvasSize.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        <Image
          image={image}
          width={canvasSize.width}
          height={canvasSize.height}
        />
        {annotations.map((annotation, i) => (
          <React.Fragment key={i}>
            <Rect
              key={i}
              x={Math.min(annotation.x1, annotation.x2)}
              y={Math.min(annotation.y1, annotation.y2)}
              width={Math.abs(annotation.x2 - annotation.x1)}
              height={Math.abs(annotation.y2 - annotation.y1)}
              stroke="red"
              fill="rgba(255, 0, 0, 0.08)"
              onClick={() => handleAnnotationClick(i)}
            />
            <Text
              x={annotation.x1}
              y={annotation.y1}
              text={`x1,y1: (${annotation.x1.toFixed(
                3
              )}, ${annotation.y1.toFixed(3)})`}
              fontSize={12}
              fill="white"
              fontStyle="bold"
              offsetY={20}
            />
            <Text
              x={annotation.x2}
              y={annotation.y2}
              text={`x2,y2: (${annotation.x2.toFixed(
                3
              )}, ${annotation.y2.toFixed(3)})`}
              fontSize={12}
              fill="white"
              fontStyle="bold"
              offsetX={130}
              offsetY={-10}
            />
            <Text
              x={(annotation.x1 + annotation.x2) / 2}
              y={(annotation.y1 + annotation.y2) / 2}
              text={annotation.label}
              fontSize={14}
              fill="white"
              fontStyle="bold"
              align="center"
              verticalAlign="middle"
              offsetX={(annotation.x2 - annotation.x1) / 7}
              offsetY={7}
              onClick={() => handleAnnotationClick(i)}
            />
          </React.Fragment>
        ))}
        {currentAnnotation && (
          <Rect
            x={Math.min(currentAnnotation.x1, currentAnnotation.x2)}
            y={Math.min(currentAnnotation.y1, currentAnnotation.y2)}
            width={Math.abs(currentAnnotation.x2 - currentAnnotation.x1)}
            height={Math.abs(currentAnnotation.y2 - currentAnnotation.y1)}
            stroke="green"
          />
        )}
      </Layer>
    </Stage>
  );
};

export default ImageCanvas;
