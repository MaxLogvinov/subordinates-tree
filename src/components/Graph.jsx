import { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import './Graph.css';

const myTreeData = {
  name: 'CEO',
  children: [
    {
      name: 'Development',
      children: [{ name: 'Senior' }, { name: 'Middle' }, { name: 'Junior' }]
    },
    {
      name: 'QA',
      children: [{ name: 'Senior' }, { name: 'Middle' }, { name: 'Junior' }]
    },
    {
      name: 'DevOps',
      children: [{ name: 'Senior' }, { name: 'Middle' }, { name: 'Junior' }]
    }
  ]
};
const CustomNode = ({ nodeDatum, toggleNode }) => {
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

const Graph = () => {
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      adjustTreeSize(offsetWidth, offsetHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    //eslint-disable-next-line
  }, []);

  const handleResize = () => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      adjustTreeSize(offsetWidth, offsetHeight);
    }
  };

  const adjustTreeSize = (width, height) => {
    const isMobile = width < 768;
    const nodeWidth = 160;
    const padding = 60;

    const maxDepth = 3;
    const requiredWidth = maxDepth * (nodeWidth + padding);
    const requiredHeight = height * 0.8;

    const scaleFactor = Math.min(width / requiredWidth, height / requiredHeight, 1);

    setTranslate({
      x: isMobile ? width * 0.2 : width * 0.35,
      y: height / 2
    });

    setScale(scaleFactor);
  };

  return (
    <div ref={treeContainer} className="graph__container">
      <Tree
        data={myTreeData}
        orientation="horizontal"
        translate={translate}
        collapsible={true}
        pathFunc="diagonal"
        separation={{ siblings: 0.7, nonSiblings: 0.7 }}
        nodeSize={{ x: 180, y: 100 }}
        zoomable={true}
        scaleExtent={{ min: 0.5, max: 2 }}
        zoom={scale}
        renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
          <CustomNode nodeDatum={nodeDatum} toggleNode={toggleNode} />
        )}
        transitionDuration={500}
        enableLegacyTransitions={true}
      />
    </div>
  );
};

export default Graph;
