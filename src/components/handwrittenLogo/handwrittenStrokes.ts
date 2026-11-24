type Point = readonly [x: number, y: number];
type Cubic = readonly [control1: Point, control2: Point, end: Point];

export type Stroke = {
    name: string;
    start: Point;
    delay: number;
    duration: number;
    segments: readonly {
        until: number;
        left: Cubic;
        right: Cubic;
    }[];
};

// Paired Bézier edges traced from the reference, in pen travel order.
export const strokes: readonly Stroke[] = [
    {
        name: "left stem",
        start: [63.7, 55.2],
        delay: 0.08,
        duration: 0.44,
        segments: [
            {
                until: 0.12,
                left: [[68.4, 54.6], [70.5, 58.7], [68.8, 65.3]],
                right: [[59.4, 55.2], [56.3, 58.1], [57.6, 64.5]],
            },
            {
                until: 0.84,
                left: [[66.3, 81], [62.8, 104.4], [65.1, 125.8]],
                right: [[58, 81.1], [53.2, 104.2], [58.6, 126.1]],
            },
            {
                until: 1,
                left: [[65.8, 132], [68.1, 139.5], [65.3, 139.5]],
                right: [[60.2, 133], [63.3, 139.6], [65.3, 139.5]],
            },
        ],
    },
    {
        name: "right stem",
        start: [111.9, 6.1],
        delay: 0.58,
        duration: 0.6,
        segments: [
            {
                until: 0.12,
                left: [[117.4, 4.5], [116.3, 11.5], [114.1, 22.7]],
                right: [[106.6, 6.7], [102.3, 11.1], [103.3, 20.7]],
            },
            {
                until: 0.84,
                left: [[111.5, 41], [108.4, 94.8], [107.1, 117.6]],
                right: [[102.7, 44.1], [99, 88.6], [99.7, 117.2]],
            },
            {
                until: 1,
                left: [[106.7, 128.5], [104.9, 138.4], [102.1, 139.5]],
                right: [[99.7, 128.9], [99.4, 139.3], [102.1, 139.5]],
            },
        ],
    },
    {
        name: "cross stroke",
        start: [5.3, 138],
        delay: 1.24,
        duration: 0.56,
        segments: [
            {
                until: 0.29,
                left: [[0, 133.6], [9.6, 121.7], [32, 109.6]],
                right: [[11, 143], [13.9, 130.1], [35.5, 117]],
            },
            {
                until: 0.76,
                left: [[53.3, 98.1], [79.7, 86.2], [103, 79.6]],
                right: [[56.4, 104.3], [82.3, 92], [104, 85]],
            },
            {
                until: 1,
                left: [[122.3, 74.1], [138.5, 71.4], [141.4, 73.5]],
                right: [[124.4, 78.3], [138.7, 76.8], [141.4, 73.5]],
            },
        ],
    },
];

function interpolate(from: Point, to: Point, fraction: number): Point {
    return [from[0] + (to[0] - from[0]) * fraction, from[1] + (to[1] - from[1]) * fraction];
}

// Split a Bézier at the pen position and keep its drawn portion.
function trimCurve(start: Point, curve: Cubic, fraction: number): Cubic {
    if (fraction === 1) return curve;

    const [control1, control2, end] = curve;
    const first = interpolate(start, control1, fraction);
    const middle = interpolate(control1, control2, fraction);
    const last = interpolate(control2, end, fraction);
    const second = interpolate(first, middle, fraction);

    return [first, second, interpolate(second, interpolate(middle, last, fraction), fraction)];
}

export function drawStroke(stroke: Stroke, progress: number): string {
    if (progress <= 0) return "";

    let leftTip = stroke.start;
    let rightTip = stroke.start;
    let drawn = 0;
    let forward = `M ${stroke.start}`;
    let backward = "";

    for (const segment of stroke.segments) {
        const fraction = Math.min(1, (progress - drawn) / (segment.until - drawn));
        const [leftControl1, leftControl2, leftEnd] = trimCurve(leftTip, segment.left, fraction);
        const [rightControl1, rightControl2, rightEnd] = trimCurve(rightTip, segment.right, fraction);

        forward += ` C ${leftControl1} ${leftControl2} ${leftEnd}`;
        backward = ` C ${rightControl2} ${rightControl1} ${rightTip}${backward}`;
        leftTip = leftEnd;
        rightTip = rightEnd;
        drawn = segment.until;

        if (progress <= drawn) break;
    }

    // Round the moving pen tip using the width between the two edges.
    const tipX = (leftTip[0] + rightTip[0]) / 2 - (leftTip[1] - rightTip[1]) * 0.5;
    const tipY = (leftTip[1] + rightTip[1]) / 2 + (leftTip[0] - rightTip[0]) * 0.5;

    return `${forward} Q ${tipX},${tipY} ${rightTip}${backward} Z`;
}
