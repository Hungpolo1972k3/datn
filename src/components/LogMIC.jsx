const data = [
  { name: "ampicillin/sulbactam", values: [298, 86, 289] },
  { name: "cefepime", values: [0, 2, 77] },
  { name: "ceftazidime", values: [100, 98, 501] },
  { name: "ciprofloxacin", values: [86, 7, 629] },
  { name: "imipenem", values: [472, 27, 200] },
  { name: "meropenem", values: [159, 37, 152] },
  { name: "piperacillin/tazobactam", values: [0, 0, 64] },
];

const LogMIC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "20px",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {data.map((item, index) => (
        <MIC key={index} title={item.name} values={item.values} />
      ))}
    </div>
  );
};
const MIC = ({ title, values }) => {
  const width = 300;
  const height = 200;
  const barWidth = 40;
  const spacing = 20;
  const chartLeftPadding = 40;

  const maxValue = Math.max(...values);

  const getTickStep = (max) => {
    if (max <= 100) return 10;
    if (max <= 200) return 20;
    if (max <= 500) return 50;
    return 100;
  };

  const tickStep = getTickStep(maxValue);
  const max = Math.ceil(maxValue / tickStep) * tickStep;

  const scaleY = (val) => (val / max) * (height - 40);
  const yTicks = Array.from(
    { length: Math.floor(max / tickStep) + 1 },
    (_, i) => i * tickStep
  );

  return (
    <svg width={width} height={height + 30}>
      <text x={width / 2} y={15} textAnchor="middle" fontSize="12">
        {title}
      </text>

      {yTicks.map((tick, i) => {
        const y = height - scaleY(tick);
        return (
          <g key={i}>
            {i != 0 && (
              <line
                x1={chartLeftPadding - 5}
                x2={width}
                y1={y}
                y2={y}
                stroke="#ccc"
                strokeDasharray="2,2"
              />
            )}
            {i == 0 && (
              <line
                x1={chartLeftPadding - 5}
                x2={width}
                y1={y}
                y2={y}
                stroke="#000000"
              />
            )}
            <text
              x={chartLeftPadding - 10}
              y={y + 4}
              fontSize="10"
              textAnchor="end"
            >
              {tick}
            </text>
          </g>
        );
      })}

      {values.map((val, i) => {
        const h = scaleY(val);
        return (
          <g key={i}>
            <rect
              x={chartLeftPadding + i * (barWidth + spacing) + 50}
              y={height - h}
              width={barWidth}
              height={h}
              fill="#4A90E2"
            />
            <text
              x={
                chartLeftPadding + i * (barWidth + spacing) + barWidth / 2 + 50
              }
              y={height + 12}
              fontSize="10"
              textAnchor="middle"
            >
              {i}.00
            </text>
            <text
              x={
                chartLeftPadding + i * (barWidth + spacing) + barWidth / 2 + 50
              }
              y={height - h - 5}
              fontSize="10"
              textAnchor="middle"
            >
              {val}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default LogMIC;