import { writeAnswer } from "./firebase.js";
import { btnList, data, info, personnel, setDisplay, title, totalLength } from "./index.js";

export let label = {
    ei: null,
    ra: null,
    nd: null,
    cs: null
}
export let index = 0;
export let countProcess = 1;

export function setIndex(n){
    index = n;
}

export function showDescriptions(event) {
    const target = event.target.id;
    let info_text = '';
    let title_text = '';
    if(target == 'e'){
        title_text = "외부 세계(Extrovert)";
        info_text = "사회적, 역사적 이야기 등 외부 세계에 관한 주제를 시각 언어를 활용하여 객관적으로 전달하고 소통하는 데에 관심을 나타내는 성향"
    }
    else if(target == 'i'){
        title_text = "내면 세계(Introspective)";
        info_text = "독창적, 상징적 표현을 통해 감정과 감동을 전달하고 주제에 관한 주관적인 느낌과 생각을 표현하는 것을 선호하는 성향"
    }
    else if(target == 'r'){
        title_text= "재현적 성향(Representational)";
        info_text = "외양에서 보이는 특징을 있는 그대로 재현하여 관람자에게 대상이 구상적으로 지각되거나 경험되도록 하는 표상 형식을 선호하는 성향"
    }
    else if(target == 'a'){
        title_text = "추상적 성향(Abstract)";
        info_text = "사물의 본질적인 형태를 찾아 자신의 정신 작용을 통해 대상을 단순화하거나 개념적인 형상을 새롭게 창조하는 표상 형식을 선호하는 성향"
    }
    else if(target == 'n'){
        title_text = "자연주의적 성향(Naturalistic)";
        info_text = "주변 세계를 경험적으로 관찰하고 대상의 특징이나 아름다움을 있는 그대로, 비교적 정확하게 다시 그려내는 표현 양식을 선호하는 성향"
    }
    else if(target == 'd'){
        title_text = "장식적 성향(Decorative)";
        info_text = "대상의 조형적인 특징을 패턴화하여 화면을 평면적으로 구성하고 장식적 모티프를 통해 형상화하는 표현 양식에 관심을 두는 성향"
    }
    else if(target == 'c'){
        title_text = "인지적 성향(Cogitative)";
        info_text = "미술적 주제에 대한 사고와 사유 과정에 관심을 두고, 관람자에게 생각을 불러일으키는 작품을 선호하는 성향"
    }
    else if(target == 's'){
        title_text = "정서적 성향(Sensitive)";
        info_text = "자유롭고 즉흥적인 표현 방식을 즐기고, 관람자가 직관적으로 정서적인 교감을 할 수 있는 표현적인 작품을 선호하는 성향"
    }
    info.innerText = info_text;
    title.innerText = title_text;
}

export function handleEClick() {
    if (label.ei == 'i') {
        btnList.i.style.background = "white";
    }
    btnList.e.style.background = "rgb(255, 219, 85)";
    label.ei = 'e'
}
export function handleIClick() {
    if (label.ei == 'e') {
        btnList.e.style.background = "white";
    }
    btnList.i.style.background = "rgb(255, 219, 85)";
    label.ei = 'i'
}

export function handleRClick() {
    if (label.ra == 'a') {
        btnList.a.style.background = "white";
    }
    btnList.r.style.background = "rgb(255, 219, 85)";
    label.ra = 'r'
}
export function handleAClick() {
    if (label.ra == 'r') {
        btnList.r.style.background = "white";
    }
    btnList.a.style.background = "rgb(255, 219, 85)";
    label.ra = 'a'
}

export function handleNClick() {
    if (label.nd == 'd') {
        btnList.d.style.background = "white";
    }
    btnList.n.style.background = "rgb(255, 219, 85)";
    label.nd = 'n'
}

export function handleDClick() {
    if (label.nd == 'n') {
        btnList.n.style.background = "white";
    }
    btnList.d.style.background = "rgb(255, 219, 85)";
    label.nd = 'd'
}

export function handleCClick() {
    if (label.cs == 's') {
        btnList.s.style.background = "white";
    }
    btnList.c.style.background = "rgb(255, 219, 85)";
    label.cs = 'c'
}
export function handleSClick() {
    if (label.cs == 'c') {
        btnList.c.style.background = "white";
    }
    btnList.s.style.background = "rgb(255, 219, 85)";
    label.cs = 's'
}

export async function handleNextClick() {
    if (label.ei==null || label.ra==null || label.nd==null || label.cs==null) {
        await swal.fire({
            title: "4가지 성향을 모두 선택해주세요.",
            confirmButtonText: 'ok',
        });
        return;
    }
    const answer = {
        artist: data.Artist[index],
        label: label
    }
    console.log(answer);
    await writeAnswer(answer);
    index+=personnel;
    countProcess++;

    // 인당 question개의 작품
    if(index >= totalLength){
        await swal.fire({
            title: "수고하셨습니다",
            confirmButtonText: 'ok',
        });
        return;
    }
    setDisplay(index);
    initLabel();
}

export function preloading (src) {
    let img = new Image();
    img.src = src;
}

function initLabel() {
    label = {
        ei: null,
        ra: null,
        nd: null,
        cs: null
    }
    const buttons = Object.keys(btnList)

    for (let i = 0; i < buttons.length; i++) {
        btnList[buttons[i]].style.background = "white";
    }
}