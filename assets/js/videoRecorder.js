const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  console.log(videoRecorder);
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "🐱‍🐉Start recording";
};

const startRecording = () => {
  //console.log(streamObject);
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  //videoRecorder.start(1000);
  // recording정보는 record가 끝나야 얻을 수 있음. 그래서 1초간격으로 정보를 얻기위해 저렇게 해줄 수 있음.
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  console.log(videoRecorder);
  recordBtn.addEventListener("click", stopRecording);
};

//mdn - getusermedia
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "🐱‍🐉Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "🐱‍🐉Can't record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}
if (recorderContainer) {
  init();
}
