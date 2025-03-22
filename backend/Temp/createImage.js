export const FetchData = async (id) => {
  try {
    const res = await fetch(`http://localhost:7777/jobs/get/${id}`);
    console.log(res);
  } catch (error) {}
};
export const Images = () => {};
const nucleotideArray = [];
const nuclMap = { A: 797, T: 1074, G: 743, C: 692 };

const width = 1080;
const height = 720;

const scaleFactor = 1;
const container = document.getElementById("container");
const circleRadius = 300;
const centerX = width / 2;
const centerY = height / 2;
const totalNucleotides = nucleotideArray.length;
const segmentSize = 5;
const totalSegments = Math.ceil(totalNucleotides / segmentSize);
const points = [];
const GCSkew = [];
const inCircle = [];
const rect = [];
const insertions = [];
const onCircle = [];

function checkIntersection(p1, p2) {
  const x1 = Math.round(p1.x),
    y1 = Math.round(p1.y);
  const x2 = Math.round(p2.x),
    y2 = Math.round(p2.y);

  const dx = x2 - x1;
  const dy = y2 - y1;
  const A = dx * dx + dy * dy;
  const B = 2 * (dx * (x1 - centerX) + dy * (y1 - centerY));
  const C =
    (x1 - centerX) * (x1 - centerX) +
    (y1 - centerY) * (y1 - centerY) -
    circleRadius * circleRadius;

  const discriminant = B * B - 4 * A * C;

  if (discriminant < 0) {
    return -1;
  }

  const sqrtDiscriminant = Math.sqrt(discriminant);
  const t1 = (-B - sqrtDiscriminant) / (2 * A);
  const t2 = (-B + sqrtDiscriminant) / (2 * A);

  const intersections = [];
  if (t1 >= 0 && t1 <= 1)
    intersections.push({
      x: Math.round(x1 + t1 * dx),
      y: Math.round(y1 + t1 * dy),
    });
  if (t2 >= 0 && t2 <= 1)
    intersections.push({
      x: Math.round(x1 + t2 * dx),
      y: Math.round(y1 + t2 * dy),
    });

  return intersections.length === 0 ? -1 : intersections;
}
const angleOne = (2 * Math.PI) / totalSegments;
for (let i = 0; i < totalSegments; i++) {
  const angle = angleOne * (i - 1);
  rect.push(angle);
  const segment = nucleotideArray.slice(i, i + segmentSize);
  var G = 0;
  var C = 0;
  segment.forEach((item) => {
    if (item == "G") {
      G += 1;
    } else if (item == "C") {
      C += 1;
    }
  });
  const gc = Math.floor(((G - C) / (G + C)) * 100) / 100;
  GCSkew.push(gc);
  const x = Math.ceil(
    centerX + Math.cos(angle) * (circleRadius + (gc * circleRadius) / 10)
  );
  const y = Math.ceil(
    centerY + Math.sin(angle) * (circleRadius + (gc * circleRadius) / 10)
  );

  points.push({ x, y });
}

ctx.beginPath();
ctx.fillStyle = "red";

ctx.globalCompositeOperation = "source-over";
for (let i = 0; i < points.length - 1; i++) {
  const intersection = checkIntersection(points[i], points[i + 1]);
  ctx.arc(points[i].x, points[i].y, 0, 0, 2 * Math.PI);
  onCircle.push(checkOnCircle(points[i]));

  if (intersection !== -1) {
    insertions.push(...intersection);
  } else {
    insertions.push(-1);
  }
}
ctx.fill();
ctx.closePath();
ctx.beginPath();
ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();
ctx.closePath();
ctx.save();
function checkInCircle(a) {
  return (
    (a.x - centerX) * (a.x - centerX) + (a.y - centerY) * (a.y - centerY) <
    circleRadius * circleRadius
  );
}
function checkOnCircle(a) {
  return (
    (a.x - centerX) * (a.x - centerX) + (a.y - centerY) * (a.y - centerY) ==
    circleRadius * circleRadius
  );
}
