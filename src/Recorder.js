import React, { useState } from 'react';
import Recorder from 'recorder-js';

function App() {
  const [recorder, setRecorder] = useState(null);

  const handleStart = () => {
    const newRecorder = new Recorder({
      sampleRate: 44100,
      numChannels: 2,
    });
    newRecorder.start().then(() => {
      setRecorder(newRecorder);
    });
  };

  const handleStop = () => {
    recorder.stop();
  };
  const handleUpload = () => {
    recorder.stop();
    const audioBlob = recorder.getWAV();
  
    console.log('audioBlob', audioBlob);
  
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
  
    fetch('http://localhost:5000/audio-upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        console.log('response', response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to upload audio');
        }
      })
      .then(data => {
        console.log('data', data);
      })
      .catch(error => {
        console.error('Error uploading audio', error);
      });
  }

  return (
    <div>
      <button onClick={handleStart} disabled={recording}>Start Recording</button>
      <button onClick={handleStop} disabled={!recording}>Stop Recording</button>
      <button onClick={handleUpload} disabled={audioChunksRef.current.length === 0}>Upload Audio</button>
    </div>
  );
};

export default Recorder;
