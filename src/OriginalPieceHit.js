import React from 'react'

const OriginalPieceHit = (
  {instrument, 
    time, 
    xRoot, yRoot, 
    staffWidth,
    lineGap, staffGap}) => {
  
  // Calculate the x position of the hit
  let x = xRoot + ((time % 5) / 5) * staffWidth
  
  // Calculate the y position of the hit
  let y = yRoot + (Math.floor(time / 5) * (lineGap))

  // Adjust y position based on instrument
  y += (instrument === "hihat") ? 0 : 
        (instrument === "snare") ? staffGap : (staffGap * 2)

  return (
    <svg>
      <rect 
      x={x} y={y}
      width="3" height="15" 
      fill="black" fill-opacity="0.6" />
    </svg>
  )
}

export default OriginalPieceHit