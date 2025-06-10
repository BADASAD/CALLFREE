
let peer;
let call;

function setupPeer() {
  const id = localStorage.getItem("my-id") || document.getElementById("my-id").value;
  if (!id) {
    alert("Please enter your permanent ID");
    return;
  }
  localStorage.setItem("my-id", id);
  peer = new Peer(id);
  peer.on("open", () => console.log("Connected with ID:", id));
  peer.on("call", (incomingCall) => {
    const acceptCall = confirm("Incoming call from " + incomingCall.peer + ". Accept?");
    if (acceptCall) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          let audio = new Audio();
          audio.srcObject = remoteStream;
          audio.play();
        });
      });
    }
  });
}

function startVoiceCall() {
  setupPeer();
  const peerId = document.getElementById("peer-id").value;
  if (!peerId) return alert("Enter peer ID to call");

  navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
    call = peer.call(peerId, stream);
    call.on("stream", (remoteStream) => {
      let audio = new Audio();
      audio.srcObject = remoteStream;
      audio.play();
    });
  });
}

function startVideoCall() {
  // Similar to voice, to be added in the video call page
}
