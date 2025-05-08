import React, { useRef, useEffect, useState } from "react";
import { data } from "react-router-dom";
import styled from "styled-components";
const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
const ButtonReset = styled.button`
  position: absolute;
  right: -80px;
  top: -3px;
  padding: 8px 10px;
  background-color: #6c757d; /* Gray */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a6268;
  }
`;

const FinalExport = ({ file_dist }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(file_dist);
      const data = await response.json();

      const datasetsGrouped = data.project.map((datasetArray) => {
        const genes = datasetArray.find((d) => d.genes)?.genes || [];
        const antibiotics =
          datasetArray.find((d) => d.antibiotics)?.antibiotics || "";

        const group = datasetArray.filter((d) => d.label);

        return {
          genes,
          antibiotics,
          group,
        };
      });
      return datasetsGrouped;
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  };

  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      if (data) {
        setDatasets(data);
      }
    };
    loadData();
  }, []);

  return datasets.map((group, index) => {
    return (
      <DatasetSVG
        key={index}
        datasets={group.group}
        genes={group.genes}
        antibiotics={group.antibiotics}
      />
    );
  });
};

const DatasetSVG = ({ datasets, genes, antibiotics }) => {
  const [range, setRange] = useState({ start: 0, end: 0 });
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const height = 500;
  const dataLength = datasets[0]?.data.length || 0;
  const [selecting, setSelecting] = useState(false);
  const [selectionStartX, setSelectionStartX] = useState(null);
  const [selectionEndX, setSelectionEndX] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverData, setHoverData] = useState([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: "",
  });

  useEffect(() => {
    setRange({ start: 0, end: dataLength });
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth - 100);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliceData = (data) => data.slice(range.start, range.end);

  const getPoints = (data, color) => {
    const visibleData = sliceData(data);
    const maxY = Math.max(...data);
    const minY = Math.min(...data);

    return visibleData.map((y, i) => {
      const x = (i / visibleData.length) * width;
      const normY = height - ((y - minY) / (maxY - minY)) * height;
      return { x: x + 50, y: normY, value: y, index: i + range.start, color };
    });
  };

  const handleMouseDown = (e) => {
    setSelecting(true);
    const startX = e.nativeEvent.offsetX;
    setSelectionStartX(startX);
    setSelectionEndX(startX);
  };

  const handleMouseMove = (e) => {
    if (selecting) {
      const currentX = e.nativeEvent.offsetX;
      setSelectionEndX(currentX);
    }
  };

  const handleMouseUp = () => {
    if (selecting && selectionStartX !== null && selectionEndX !== null) {
      const x1 = Math.min(selectionStartX, selectionEndX);
      const x2 = Math.max(selectionStartX, selectionEndX);

      const indexStart = Math.floor((x1 / width) * dataLength);
      const indexEnd = Math.ceil((x2 / width) * dataLength);

      if (indexEnd - indexStart > 1) {
        setRange({ start: indexStart, end: indexEnd });
      }

      setSelecting(false);
      setSelectionStartX(null);
      setSelectionEndX(null);
    }
  };

  const selectionWidth =
    selectionEndX !== null && selectionStartX !== null
      ? Math.abs(selectionEndX - selectionStartX)
      : 0;
  const selectionLeft =
    selectionStartX !== null && selectionEndX !== null
      ? Math.min(selectionStartX, selectionEndX)
      : 0;

  const handleMouseOver = (index, x, y) => {
    setHoverIndex(index);
    const gene = genes?.[index] || "Unknown Gene";

    const dataAtIndex = datasets.map((item) => ({
      label: item.label,
      color: item.color,
      value: item.data[index],
    }));

    const dataHTML = dataAtIndex
      .map(
        (item) => `
              <div style="font-size: 12px; color: ${item.color};">
                <strong>${item.label}:</strong> ${item.value.toFixed(2)}
              </div>
            `
      )
      .join("");

    setTooltip({
      visible: true,
      x,
      y,
      content: `
            <div>
              <strong style=" font-size: 14px;">Gene:</strong>
              <span style=" font-weight: bold;">${gene}</span>
            </div>
            <div style="margin-top: 6px;">
              ${dataHTML}
            </div>
          `,
    });
  };

  const handleMouseOut = () => {
    setHoverIndex(null);
    setHoverData([]);
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
  };

  const handleButtonClick = () => {
    setOpacity((prevOpacity) => (prevOpacity === 0 ? 1 : 0));
  };
  const values = [0, 20, 40, 60, 80, 100];
  return (
    <div
      ref={containerRef}
      style={{ width: "100%", position: "relative", marginBottom: "90px" }}
    >
      <Button onClick={handleButtonClick}>
        {opacity === 0 ? "Show Point" : "Hide Point"}
      </Button>

      <svg
        width={width + 100}
        height={height + 120}
        viewBox={`0 0 ${width + 100} ${height}`}
      >
        <text x={width / 2} y={-30} stroke="black" fontSize={20}>
          {antibiotics}
        </text>
        <line
          x1={30}
          y1={-20}
          x2={30}
          y2={height}
          stroke="black"
          strokeWidth="2"
        />

        {values.reverse().map((value, index) =>
          index !== values.length - 1 ? (
            <g key={value}>
              <text x={0} y={index * (height / 5) + 5} stroke="black">
                {value}
              </text>
              <line
                x1={30}
                y1={index * (height / 5)}
                x2={25}
                y2={index * (height / 5)}
                stroke="black"
                strokeWidth="2"
              />
            </g>
          ) : (
            <g key={value}>
              <text x={0} y={index * (height / 5)} stroke="black">
                {value}
              </text>
            </g>
          )
        )}

        {datasets.map((ds, idx) => {
          const points = getPoints(ds.data, ds.color);
          return (
            <g key={idx}>
              <polyline
                fill="none"
                stroke={ds.color}
                strokeWidth="2"
                points={points.map((p) => `${p.x},${p.y}`).join(" ")}
              />
              {points.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={4}
                    fill={ds.color}
                    opacity={opacity}
                    onMouseOver={(e) =>
                      handleMouseOver(point.index, e.clientX, e.clientY)
                    }
                    onMouseOut={handleMouseOut}
                  />
                </g>
              ))}
            </g>
          );
        })}
        {genes.map((item, i) => (
          <g key={i}>
            <line
              x1={(i / dataLength) * width + 50}
              y1={height}
              x2={(i / dataLength) * width + 50}
              y2={height + 5}
              stroke="#000"
              strokeWidth="1"
            />
            <text
              x={(i / dataLength) * width + 60}
              y={height + 20}
              fontSize="10"
              fill="#333"
              textAnchor="end"
              transform={`rotate(-90 ${(i / dataLength) * width + 50} ${
                height + 20
              })`}
            >
              {item}
            </text>
          </g>
        ))}

        <line
          x1={30}
          y1={height}
          x2={width + 70}
          y2={height}
          stroke="#000"
          strokeWidth="1"
        />
        <g transform={`translate(${width - 50}, 20)`}>
          <rect
            width={150}
            height={datasets.length * 20 + 10}
            fill="white"
            stroke="#ccc"
            rx={6}
          />
          {datasets.map((ds, idx) => (
            <text
              key={idx}
              x={10}
              y={20 + idx * 15}
              fontSize="12"
              fill={ds.color}
            >
              ● {ds.label || `Data ${idx + 1}`}
            </text>
          ))}
        </g>
      </svg>
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "18px",
            pointerEvents: "none",
            zIndex: 10,
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}

      <div
        style={{
          width: width,
          height: 30,
          marginLeft: 50,
          position: "relative",
          background: "#eee",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <ButtonReset
          onClick={(e) => {
            setRange({ start: 0, end: dataLength });
          }}
        >
          Reset
        </ButtonReset>
        {selecting && (
          <div
            style={{
              position: "absolute",
              left: selectionLeft,
              width: selectionWidth,
              height: "100%",
              backgroundColor: "rgba(0, 123, 255, 0.4)",
              border: "1px solid #007bff",
              pointerEvents: "none",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            left: `${(range.start / dataLength) * width}px`,
            width: `${((range.end - range.start) / dataLength) * width}px`,
            height: "100%",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            border: "1px dashed #007bff",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default FinalExport;
