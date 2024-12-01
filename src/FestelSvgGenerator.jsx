import React from "react";

export const FeistelSvgGenerator = ({ elem }) => {
  const blocks = [];
  // console.log(elem);
  const numBlocks = elem.Ki.length - 1;
  const svgHeight =
    numBlocks > 4 ? numBlocks * 140 + 230 : 220 + numBlocks * 145;

  for (let i = 0; i < numBlocks; i++) {
    const yOffset = 80 + i * 140; // Зсув вниз для кожного блоку
    blocks.push(
      <React.Fragment key={i}>
        {/* Блок шифрування */}
        <rect
          x="160"
          y={yOffset + 160 - 20}
          width="80"
          height="40"
          fill="yellow"
          stroke="black"
        />
        <text x="189" y={yOffset + 165} fontSize="12" fontWeight="bold">
          {elem.F}
        </text>

        {/* Блок ключа */}
        <rect
          x="170"
          y={yOffset + 85}
          width="60"
          height="30"
          fill="white"
          stroke="black"
        />
        <text x="198" y={yOffset + 104} fontSize="12">
          {elem.Ki[i + 1]}
        </text>

        {/* Стрілки та лінії */}

        <line
          x1="320"
          y1={yOffset + 35}
          x2="320"
          y2={yOffset + 60}
          stroke="black"
        />
        <line
          x1="80"
          y1={yOffset + 20}
          x2="80"
          y2={yOffset + 60}
          stroke="black"
        />
        <line
          x1="80"
          y1={yOffset + 60}
          x2="320"
          y2={yOffset + 85}
          stroke="black"
        />
        <line
          x1="80"
          y1={yOffset + 85}
          x2="320"
          y2={yOffset + 60}
          stroke="black"
        />
        <line
          x1="320"
          y1={yOffset + 85}
          x2="320"
          y2={yOffset + 160}
          stroke="black"
        />
        <line
          x1="80"
          y1={yOffset + 85}
          x2="80"
          y2={yOffset + 160}
          stroke="black"
        />
        <line
          x1="80"
          y1={yOffset + 160}
          x2="155"
          y2={yOffset + 160}
          stroke="black"
          markerEnd="url(#arrow)"
        />
        <line
          x1="240"
          y1={yOffset + 160}
          x2="300"
          y2={yOffset + 160}
          stroke="black"
          markerEnd="url(#arrow)"
        />
        <line
          x1="200"
          y1={yOffset + 115}
          x2="200"
          y2={yOffset + 135}
          stroke="black"
          markerEnd="url(#arrow)"
        />
        <text x="325" y={yOffset + 140} fontSize="18" fill="blue">
          {elem.Rn[i + 1]}
        </text>
        <text x="255" y={yOffset + 150} fontSize="18" fill="blue">
          {elem.F_value[i + 1]}
        </text>
        <text x="90" y={yOffset + 150} fontSize="18" fill="blue">
          {elem.Ln[i + 1]}
        </text>

        <circle cx="320" cy={yOffset + 160} r="15" fill="white" stroke="blue" />
        <text x="312" y={yOffset + 166} fontSize="24" fill="blue">
          +
        </text>
      </React.Fragment>
    );

    if (i == numBlocks - 1) {
      blocks.push(
        <React.Fragment key={Math.random()}>
          <line
            x1="320"
            y1={yOffset + 175}
            x2="320"
            y2={yOffset + 200}
            stroke="black"
          />
          <line
            x1="80"
            y1={yOffset + 160}
            x2="80"
            y2={yOffset + 200}
            stroke="black"
          />
          <rect
            x="50"
            y={yOffset + 200}
            width="60"
            height="40"
            fill="white"
            stroke="black"
          />
          <text x="66" y={yOffset + 200 + 25} fontSize="12" fontWeight="bold">
            {elem.Ln[elem.Ln.length - 1]}
          </text>
          <rect
            x="290"
            y={yOffset + 200}
            width="60"
            height="40"
            fill="white"
            stroke="black"
          />
          <text x="307" y={yOffset + 200 + 25} fontSize="12" fontWeight="bold">
            {elem.Rn[elem.Rn.length - 1]}
          </text>
        </React.Fragment>
      );
    }
  }

  return (
    <svg width="400" height={svgHeight} viewBox={`0 0 400 ${svgHeight}`}>
      <rect x="50" y="20" width="60" height="40" fill="white" stroke="black" />
      <text x="68" y="44" fontSize="12" fontWeight="bold">
        {elem.Ln[0]}
      </text>
      <rect x="290" y="20" width="60" height="40" fill="white" stroke="black" />
      <text x="308" y="44" fontSize="12" fontWeight="bold">
        {elem.Rn[0]}
      </text>
      <rect x="170" y="30" width="60" height="30" fill="white" stroke="black" />
      <text x="198" y="48" fontSize="12">
        {elem.Ki[0]}
      </text>
      {/* Перший блок шифрування */}
      <rect
        x="160"
        y="80"
        width="80"
        height="40"
        fill="yellow"
        stroke="black"
      />
      <text x="189" y="105" fontSize="12" fontWeight="bold">
        {elem.F}
      </text>
      {/* Стрілки */}
      <line x1="80" y1="60" x2="80" y2="100" stroke="black" />
      <line
        markerEnd="url(#arrow)"
        x1="80"
        y1="100"
        x2="156"
        y2="100"
        stroke="black"
      />
      <line x1="320" y1="60" x2="320" y2="90" stroke="black" />
      <line
        markerEnd="url(#arrow)"
        x1="240"
        y1="100"
        x2="300"
        y2="100"
        stroke="black"
      />
      <circle cx="320" cy="100" r="15" fill="white" stroke="blue" />
      <text x="312" y="106" fontSize="24" fill="blue">
        +
      </text>
      <line
        x1="200"
        y1="60"
        x2="200"
        y2="76"
        stroke="black"
        markerEnd="url(#arrow)"
      />
      <text x="250" y={91} fontSize="18" fill="blue">
        {elem.F_value[0]}
      </text>
      <text x="325" y={130} fontSize="18" fill="blue">
        {elem.Ln[1]}
      </text>
      {blocks}

      <text x="115" y={svgHeight - 10} fontSize="16" fontWeight="bold">
        {`${elem.type}` + ", блоку №" + `${elem.number}`}
      </text>
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="10"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
    </svg>
  );
};
