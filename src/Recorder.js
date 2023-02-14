import React, { useState, useRef } from 'react';
import audioBufferToWav from 'audiobuffer-to-wav';

const Recorder = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
        mediaRecorderRef.current.start();
        setRecording(true);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleDataAvailable = e => {
    if (e.data.size > 0) {
      audioChunksRef.current.push(e.data);
    }
  };

  const handleUpload = () => {
    const audioBuffer = audioCtx.createBuffer(1, audioChunksRef.current.length, audioCtx.sampleRate);
    audioBuffer.getChannelData(0).set(audioChunksRef.current);

    // Convert the AudioBuffer to a WAV file
    const wavData = audioBufferToWav(audioBuffer);

      // Send the .wav file to the server using an HTTP request
      fetch('http://localhost:5000/audio-upload', {
        method: 'POST',
        body: wavData.buffer,
        headers: {
          'Content-Type': 'audio/wav'
        }
      }).then(response => response.text()).then(data => {
        console.log(data);
        }).catch(err => {
            console.log(err);
        });

  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
      <button onClick={handleUpload} disabled={audioChunksRef.current.length === 0}>Upload Audio</button>
    </div>
  );
};

export default Recorder;
