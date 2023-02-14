
import OriginalPieceHit from './OriginalPieceHit';
import UserPieceHit from './UserPieceHit';
import './App.css';
import Staffs from './Staffs';

// import sampleDrumHits from './sampleDrumHits';
import sampleDrumHits from './sampleDrumHits';


function SheetDisplay() {

  // preprocess the sampleDrumHits, add artificial timeDiff
  for (let [drum, times] of Object.entries(sampleDrumHits)) {
    sampleDrumHits[drum]["user"] = times["user"].map(time => time + Math.random() - 0.5)
  }

  console.log(sampleDrumHits)

  function getMaxTime(drumHits) {
    let userMax = Object.keys(drumHits).map(drum => {
      Math.max(...drumHits[drum]["user"])
    })

    let originalMax = Object.keys(drumHits).map(drum => {
      Math.max(drumHits[drum]["original"])
    })

    return Math.max(...userMax, ...originalMax)
  }

  console.log("max: " + getMaxTime(sampleDrumHits))


  return (
    <div className="App">
      Hello there
      <div className="canvas">
        <svg height="1500" width="600">
          <Staffs 
            numLines={4} 
            x={50} 
            y={100}
            width={500}
            lineGap={180}
            staffGap={40}  />

          <OriginalPieceHit
            instrument="hihat"
            time={13}
            xRoot={50}
            yRoot={100}
            staffWidth={500}
            lineGap={180}
            staffGap={40}
          />

          <UserPieceHit
            instrument="hihat"
            time={13}
            timeDiff={0.01}
            xRoot={50}
            yRoot={100}
            staffWidth={500}
            lineGap={180}
            staffGap={40}
          />

        </svg>
      </div>
    </div>
  );
}

export default SheetDisplay;
