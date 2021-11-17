import { interval, animationFrameScheduler, Subject } from 'rxjs';
import * as d3 from 'd3'

export const initVisualizer = () => {
  const waveData = new Subject();
  const audioCtx = new AudioContext();
  const audioElement = document.getElementById('audioElement') as HTMLAudioElement;

  //Canvas setup
  const canvas = document.querySelector('canvas');
  const canvasCtx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  //Web Audio API setup
  const audioSrc = audioCtx.createMediaElementSource(audioElement);
  const analyser = audioCtx.createAnalyser();

  analyser.fftSize = 1024;
  const bufferLength = analyser.frequencyBinCount;

  audioCtx.resume().then(() => {
    console.log('Playback resumed successfully');
  });

  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);

  // D3 Setup to draw the line
  const x = d3.scaleLinear()
    .domain([0, analyser.frequencyBinCount])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([-175, 175])
    .range([height, 175]);

  const line = d3.line()
    .x(function (d: number, i: number) { return x(i); } as any)
    .y(function (d: number) { return y(d); } as any)
    .context(canvasCtx);

  function renderFullLine(d: any) {
    canvasCtx.strokeStyle = '#FA0064';
    canvasCtx.beginPath();
    line(d);
    canvasCtx.stroke();
  }

  function renderLoop() {
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = '#eee';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    waveData.next(dataArray);
  }

  waveData.subscribe((d: number) => renderFullLine(d));
  interval(0, animationFrameScheduler).subscribe(renderLoop);
};
