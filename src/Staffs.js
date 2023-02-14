import React from 'react'

const Staffs = ({numLines, x, y, width, lineGap, staffGap}) => {

    let annotations = [
      <text textAnchor="middle" 
              x={x - 20} 
              y={y + 5}>Hihat</text>,
      <text textAnchor="middle" 
              x={x - 20} 
              y={y + 5 + staffGap}>Snare</text>,
      <text textAnchor="middle" 
              x={x - 20} 
              y={y + 5 + (staffGap * 2)}>Kick</text>
    ]
    let lines = []
    for (let i = 0; i < numLines; i++) {
        // Number of seconds indicator at right of each line block
        lines.push(
        <text textAnchor="middle" 
              x={x + width + 10} 
              y={y + i * lineGap - 5}>{5 * (i+1)}s</text>
        )
        // Draw the staff lines in each line block
        lines.push(
        <line x1={x} y1={y + i * lineGap} 
              x2={x + width} y2={y + i * lineGap} 
              stroke="black" strokeWidth="2" />)
        lines.push(
          <line x1={x} y1={y + (i * lineGap) + staffGap} 
                x2={x + width} y2={y + (i * lineGap) + staffGap} 
                stroke="black" strokeWidth="2" />)
        lines.push(
          <line x1={x} y1={y + (i * lineGap) + (staffGap * 2)} 
                x2={x + width} y2={y + (i * lineGap) + (staffGap * 2)} 
                stroke="black" strokeWidth="2" />)
    }

    // Calculate the height of the SVG element
    let height = numLines * (lineGap + staffGap * 2) 

  return (
    <svg height={height} width="600">
        {annotations}
        {lines}
    </svg>
  )
}

export default Staffs