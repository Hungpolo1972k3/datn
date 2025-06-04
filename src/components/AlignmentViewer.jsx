import React from "react";

// Global alignment: Needleman-Wunsch
function needlemanWunsch(
  q,
  s,
  matchScore = 1,
  mismatchScore = -1,
  gapPenalty = -2
) {
  const n = q.length;
  const m = s.length;
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(0));
  const trace = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(""));

  // Initialize
  for (let i = 0; i <= n; i++) {
    dp[i][0] = i * gapPenalty;
    trace[i][0] = "U"; // up
  }
  for (let j = 0; j <= m; j++) {
    dp[0][j] = j * gapPenalty;
    trace[0][j] = "L"; // left
  }
  trace[0][0] = "0";

  // Fill
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = q[i - 1] === s[j - 1] ? matchScore : mismatchScore;
      const diag = dp[i - 1][j - 1] + match;
      const up = dp[i - 1][j] + gapPenalty;
      const left = dp[i][j - 1] + gapPenalty;

      dp[i][j] = Math.max(diag, up, left);
      trace[i][j] = dp[i][j] === diag ? "D" : dp[i][j] === up ? "U" : "L";
    }
  }

  // Traceback
  let alignedQ = "";
  let alignedS = "";
  let i = n,
    j = m;
  while (i > 0 || j > 0) {
    if (trace[i][j] === "D") {
      alignedQ = q[i - 1] + alignedQ;
      alignedS = s[j - 1] + alignedS;
      i--;
      j--;
    } else if (trace[i][j] === "U") {
      alignedQ = q[i - 1] + alignedQ;
      alignedS = "-" + alignedS;
      i--;
    } else if (trace[i][j] === "L") {
      alignedQ = "-" + alignedQ;
      alignedS = s[j - 1] + alignedS;
      j--;
    }
  }

  return [alignedQ, alignedS];
}

const AlignmentViewer = ({
  query,
  subject,
  qStart = 1,
  sStart = 1,
  lineLength = 60,
}) => {
  const [alignedQuery, alignedSubject] = needlemanWunsch(query, subject);

  const renderAlignment = () => {
    const totalLength = alignedQuery.length;
    const blocks = [];
    let qPos = qStart;
    let sPos = sStart;

    for (let start = 0; start < totalLength; start += lineLength) {
      const qSlice = alignedQuery.slice(start, start + lineLength);
      const sSlice = alignedSubject.slice(start, start + lineLength);

      const matchLineSpans = [];
      for (let i = 0; i < qSlice.length; i++) {
        const matchChar =
          qSlice[i] === "-" || sSlice[i] === "-"
            ? " "
            : qSlice[i] === sSlice[i]
            ? "|"
            : "*";

        const color = matchChar === "*" ? "red" : "black";

        matchLineSpans.push(
          <span
            key={i}
            style={{
              color,
              fontFamily: "monospace",
              display: "inline-block",
              width: "1ch",
              textAlign: "center",
            }}
          >
            {matchChar}
          </span>
        );
      }

      let qLineStart = qPos;
      let sLineStart = sPos;
      let qLineEnd = qPos;
      let sLineEnd = sPos;

      for (let i = 0; i < qSlice.length; i++) {
        if (qSlice[i] !== "-") qLineEnd++;
        if (sSlice[i] !== "-") sLineEnd++;
      }

      const pad = (num) => num.toString().padStart(8, " ");

      blocks.push(
        <div
          key={start}
          style={{
            fontFamily: "monospace",
            whiteSpace: "pre",
            lineHeight: "1.4em",
            marginBottom: "1em",
          }}
        >
          {`Query    ${pad(qLineStart)} ${qSlice} ${qLineEnd - 1}`}
          <br />
          {`                  `}
          {matchLineSpans}
          <br />
          {`Subject  ${pad(sLineStart)} ${sSlice} ${sLineEnd - 1}`}
        </div>
      );

      qPos = qLineEnd;
      sPos = sLineEnd;
    }

    return blocks;
  };

  return <div>{renderAlignment()}</div>;
};

export default AlignmentViewer;
