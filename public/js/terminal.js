const terminalOutput = document.getElementById("terminal-output");
const container = document.querySelector(".container");

const lines = [
  "[SYSTEM] Initializing H4ckronin blog…",
  "[ACCESS GRANTED] Welcome Operator"
];

const highlightMap = {
  "[SYSTEM]":"#7fdfff",
  "[STATUS]":"#7fdfff",
  "[INFO]":"#7fdfff",
  "[ACCESS GRANTED]":"#00FF41"
};

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function typeLine(line, delay=35){
  for(let i=0;i<line.length;i++){
    terminalOutput.innerHTML += line[i];
    await sleep(delay);
  }
  for(const key in highlightMap){
    terminalOutput.innerHTML = terminalOutput.innerHTML.replace(
      key, `<span style="color:${highlightMap[key]}">${key}</span>`
    );
  }
  terminalOutput.innerHTML += "\n";
}

async function runTerminal(){
  for(let line of lines){
    await typeLine(line);
    await sleep(120);
  }
  const cursor = document.createElement("span");
  cursor.className="cursor";
  cursor.textContent="█";
  terminalOutput.appendChild(cursor);

  await sleep(800);
  const loading = document.getElementById("loading-screen");
  loading.style.transition="opacity 0.8s";
  loading.style.opacity="0";
  setTimeout(()=>{
    loading.style.display="none";
    container.style.visibility="visible";
  },800);
}

runTerminal();
