import './App.css';
import axios from "axios";
import Recorder from 'recorder-js';

let gumStream = null;
let recorder = null;
let audioContext = null;

function RecorderJSDemo() {


    const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
    console.log("sample rate: " + audioContext.sampleRate);

    const recorder = new Recorder(audioContext, {
    })
    
    const constraints = {
        audio: true
    }

    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => recorder.init(stream))
    .catch(err => console.log('Uh oh... unable to get stream...', err));

    const startRecording = () => {
        console.log("startButton clicked");

        recorder.start().then(() => {
            console.log("Recording started");
        }).catch((e) => {
            console.error(e);
        });

    }

    const stopRecording = () => {
        console.log("stopButton clicked");

        recorder.stop()
            .then(({blob, buffer}) => {
                console.log("Recording stopped");
                Recorder.download(blob, 'testt');
                onStop(blob);
            }).catch((e) => {
                console.error(e);
            })
    }

    const onStop = (blob) => {
        console.log("uploading...");

        let data = new FormData();

        data.append('text', "this is the transcription of the audio file");
        data.append('wavfile', blob, "recording.wav");

        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }
        axios.post('http://localhost:5000/audio-upload', data, config);
    }

    return (
        <div>
            <button onClick={startRecording} type="button">Start</button>
            <button onClick={stopRecording} type="button">Stop</button>
        </div>
    );
}

export default RecorderJSDemo;