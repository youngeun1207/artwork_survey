import { readDatabase } from "./firebase.js";
import { participantsInfo, startForm } from "./getParticipationtsInfo.js";
import { countProcess, handleAClick, handleCClick, handleDClick, handleEClick, handleIClick, handleNClick, handleNextClick, handleRClick, handleSClick, index, preloading, showDescriptions } from "./handleBtns.js";

export const btnList = {
    e: document.getElementById("e"),
    i: document.getElementById("i"),
    r: document.getElementById("r"),
    a: document.getElementById("a"),
    n: document.getElementById("n"),
    d: document.getElementById("d"),
    c: document.getElementById("c"),
    s: document.getElementById("s")
}

export const btns = document.getElementById("btns");
export const artistInfo = document.getElementById("artist");
export const info = document.getElementById("detail-info");
export const title = document.getElementById("title");

export const next = document.getElementById("next");

// 설문 참여자 25명이라 가정 시 인당 37개 분류
export const personnel = 25;
export const question = parseInt(948/personnel); 

export const artwork = document.getElementById("artwork");

export const data = await readDatabase();

export const totalLength = data.Artist.length


export async function setDisplay(idx){
    artwork.src = data.Link[idx];
    artistInfo.innerText = `작가: ${data.Artist[idx]} (${countProcess}/${Math.min(question, totalLength)})`;
    if(idx+personnel < totalLength){
        preloading(data.Link[idx+personnel]);
    }
}

if (btnList.e) {
    btnList.e.addEventListener("click", handleEClick);
}
if (btnList.i) {
    btnList.i.addEventListener("click", handleIClick);
}
if (btnList.r) {
    btnList.r.addEventListener("click", handleRClick);
}
if (btnList.a) {
    btnList.a.addEventListener("click", handleAClick);
}
if (btnList.n) {
    btnList.n.addEventListener("click", handleNClick);
}
if (btnList.d) {
    btnList.d.addEventListener("click", handleDClick);
}
if (btnList.c) {
    btnList.c.addEventListener("click", handleCClick);
}
if (btnList.s) {
    btnList.s.addEventListener("click", handleSClick);
}
if(next) {
    next.addEventListener("click", handleNextClick);
}

if(btns) {
    btns.addEventListener("mouseover", showDescriptions);
}

await startForm();
await setDisplay(participantsInfo.userIndex);

