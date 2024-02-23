"use client";
import { Annotation } from "@/types/Annotation.interface";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Image, Text, Rect } from "react-konva";
import useImage from "use-image";

const createMaskOverlay = (mask: any, width: any, height: any) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  const imageData = context!.createImageData(width, height);

  const mask2D = mask[0];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      if (mask2D[y][x] === 1) {
        imageData.data[index] = 0;
        imageData.data[index + 1] = 0;
        imageData.data[index + 2] = 255;
        imageData.data[index + 3] = 128;
      } else {
        imageData.data[index + 3] = 0;
      }
    }
  }

  context!.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
};

interface Props {
  imageUrl: string;
  annotations: Annotation[];
  onAnnotationsChange: (newAnnotations: Annotation[]) => void;
  activeLabel: string;
  maskOverlayUrls: any[];
  setMaskOverlayUrls: any;
  maskImages: any[];
  setMaskImages: any;
  samResult: boolean[][] | null;
  getSamResult: (args: any) => void;
}

const ImageCanvas: React.FC<Props> = ({
  imageUrl,
  annotations,
  onAnnotationsChange,
  activeLabel,
  maskOverlayUrls,
  setMaskOverlayUrls,
  maskImages,
  setMaskImages,
  samResult,
  getSamResult,
}) => {
  const [image, status] = useImage(imageUrl);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );

  const handleMouseDown = (event: any) => {
    const { x, y } = event.target.getStage().getPointerPosition();
    setCurrentAnnotation({
      x1: x,
      y1: y,
      x2: x,
      y2: y,
      width: 0,
      height: 0,
      centerX: x,
      centerY: y,
      label: activeLabel,
    });
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

    const x1 = Math.min(currentAnnotation.x1, currentAnnotation.x2);
    const y1 = Math.min(currentAnnotation.y1, currentAnnotation.y2);
    const x2 = Math.max(currentAnnotation.x1, currentAnnotation.x2);
    const y2 = Math.max(currentAnnotation.y1, currentAnnotation.y2);

    const width = x2 - x1;
    const height = y2 - y1;

    if (width < MIN_WIDTH && height < MIN_HEIGHT) {
      setCurrentAnnotation(null);
      return;
    }

    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;

    const finalAnnotation = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      width: width,
      height: height,
      centerX: centerX,
      centerY: centerY,
      label: currentAnnotation.label,
    };

    const newAnnotations = [...annotations, finalAnnotation];
    onAnnotationsChange(newAnnotations);
    setCurrentAnnotation(null);

    // [x1,y1,x2,y2]
    getSamResult({
      imageUrl,
      bbox: [x1, y1, x2, y2],
      // centerPoint: [centerX, centerY],
    });
  };

  const handleAnnotationClick = (index: number) => {
    const newAnnotations = annotations.filter((_, i) => i !== index);
    onAnnotationsChange(newAnnotations);
  };

  useEffect(() => {
    if (samResult && image) {
      const overlayUrl = createMaskOverlay(
        samResult,
        image.width,
        image.height
      );
      setMaskOverlayUrls((prev: any) => {
        return [...prev, overlayUrl];
      });
    }
  }, [samResult, image]);

  useEffect(() => {
    if (!maskOverlayUrls || !maskOverlayUrls.length) return;

    const image = new window.Image();
    image.src = maskOverlayUrls[maskOverlayUrls.length - 1];
    image.onload = () => {
      setMaskImages((prev: any) => [...prev, image]);
    };
  }, [maskOverlayUrls]);

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

  // console.log(maskOverlayUrl);

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

        {maskImages.map((maskImage, i) => (
          <Image
            key={i}
            image={maskImage}
            width={canvasSize.width}
            height={canvasSize.height}
          />
        ))}
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
