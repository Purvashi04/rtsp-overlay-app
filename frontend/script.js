const container = document.getElementById("overlayContainer");

function loadStream() {
  const url = document.getElementById("rtspUrl").value;
  const video = document.getElementById("video");
  video.src = url;
}

function addOverlay() {
  const text = document.getElementById("overlayText").value;
  if (!text) {
    alert("Enter overlay text");
    return;
  }

const div = document.createElement("div");
div.className = "overlay";

div.innerHTML = `
  ${text}
  <span class="delete-btn"> X </span>
`;

div.querySelector(".delete-btn").onclick = () => {
  div.remove();
};


  makeDraggable(div);
  container.appendChild(div);
}

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0;

  el.onmousedown = (e) => {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;

    document.onmousemove = (e) => {
      el.style.left = e.clientX - offsetX + "px";
      el.style.top = e.clientY - offsetY + "px";
    };

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  };
}
