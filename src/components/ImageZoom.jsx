import React, { useRef, useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight, FiRefreshCw } from "react-icons/fi";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0066cc;
  }
`;
const ButtonReset = styled.button`
  position: absolute;
  right: -50px;
  top: -5px;
  padding: 8px;
  background-color: transparent;  
  border: none;                
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 1rem;
`;
const DropdownButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  background-color:rgb(72, 153, 234);
  color: #f8f9fa;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solidrgb(0, 73, 147);
  border-radius: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: rgb(17, 21, 235);
    transform: translateY(-1px);
  }

  svg {
    transition: transform 0.2s ease;
  }
`;

const FinalExport = ({ file_dist }) => {
  const [datasetsByLabel, setDatasetsByLabel] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(file_dist);
      const data = await response.json();

      const groupedData = {};

      data.project.forEach((datasetArray) => {
        const labeledDatasets = datasetArray.filter((d) => d.label);

        const antibiotics =
          datasetArray.find((d) => d.antibiotics)?.antibiotics || "Unknown";
        const genes = datasetArray.find((d) => d.genes)?.genes || [];

        if (!groupedData[antibiotics]) groupedData[antibiotics] = [];

        groupedData[antibiotics].push({
          genes,
          antibiotics,
          group: labeledDatasets,
        });
      });

      return groupedData;
    } catch (err) {
      console.error("Error fetching data:", err);
      return {};
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setDatasetsByLabel(data);
    };
    loadData();
  }, [file_dist]);

  const toggleDropdown = (label) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <Wrapper>
      {Object.entries(datasetsByLabel).map(([antibiotics, datasets]) => (
        <div key={antibiotics}>
          <DropdownButton onClick={() => toggleDropdown(antibiotics)}>
            {antibiotics.toUpperCase()}
            {openDropdowns[antibiotics] ? (
              <FiChevronDown size={20} />
            ) : (
              <FiChevronRight size={20} />
            )}
          </DropdownButton>

          {openDropdowns[antibiotics] &&
            datasets.map((dataset, index) => (
              <DatasetSVG
                datasets={dataset.group}
                genes={dataset.genes}
                antibiotics={dataset.antibiotics}
                key={index}
              />
            ))}
        </div>
      ))}
    </Wrapper>
  );
};

const DatasetSVG = ({ datasets, genes, antibiotics }) => {
  const { t } = useTranslation();
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
  const svgRef = useRef(null);
  const handleExportSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${antibiotics || "chart"}.svg`;
    link.click();
    URL.revokeObjectURL(url);
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
        {opacity === 0 ? t("finalExport.showPoint") : t("finalExport.hidePoint")}
      </Button>
      <Button style={{ right: 150 }} onClick={handleExportSVG}>
        {t("finalExport.exportSVG")}
      </Button>

      <svg
        width={width + 100}
        height={height + 140}
        viewBox={`0 0 ${width + 100} ${height}`}
        ref={svgRef}
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
              <text x={0} y={index * (height / 5) + 5}>
                {value}
              </text>
              <line
                x1={30}
                y1={index * (height / 5)}
                x2={25}
                y2={index * (height / 5)}
                stroke="black"
                strokeWidth="1"
              />
            </g>
          ) : (
            <g key={value}>
              <text x={0} y={index * (height / 5)}>
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
                strokeWidth="1"
                points={points.map((p) => `${p.x},${p.y}`).join(" ")}
              />
              {points.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={3}
                    fill={ds.color}
                    opacity={opacity}
                    onMouseOver={(e) =>
                      handleMouseOver(point.index, e.clientX, e.clientY)
                    }
                    onMouseOut={handleMouseOut}
                  />
                  <line
                    x1={point.x}
                    y1={height}
                    x2={point.x}
                    y2={height + 5}
                    stroke="#000"
                    strokeWidth="1"
                  />
                  <text
                    x={point.x + 5}
                    y={height + 10}
                    fontSize={10}
                    fontWeight="bold"
                    fill="#333"
                    textAnchor="end"
                    transform={`rotate(-90 ${point.x + 5} ${height + 10})`}
                  >
                    {genes[i + range.start]}
                  </text>
                </g>
              ))}
            </g>
          );
        })}

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
          height: "30px",
          marginLeft: "50px",
          position: "relative",
          background: "#eee",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <ButtonReset onClick={() => setRange({ start: 0, end: dataLength })} title={t("finalExport.reset")}>
          <FiRefreshCw size={20} color="#0066cc" />
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