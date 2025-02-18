export const CustomNode = ({ nodeDatum, toggleNode }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <g className="graph__node" onClick={() => toggleNode()}>
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="turquoise" stopOpacity="0.5" />
          <stop offset="100%" stopColor="lightblue" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect
        className="graph__node_rect"
        width={isMobile ? 110 : 140}
        height={isMobile ? 30 : 40}
        x={isMobile ? -55 : -70}
        y={isMobile ? -12 : -25}
        rx={15}
        ry={15}
      />
      <text className="graph__node_text" x={0} y={isMobile ? 2 : 0}>
        {nodeDatum.name}
      </text>
    </g>
  );
};

export default CustomNode;
