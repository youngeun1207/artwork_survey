import { writeParticipantsInfo } from "./firebase.js";
import { setIndex } from "./handleBtns.js";
import { data, question, totalLength } from "./index.js";

export let participantsInfo = {
    year: 5,
    major: 'artedu',
    contact: null,
    userIndex: null
}

export async function startForm(){
    const isFirst = await swal.fire({
        title: '처음 오셨나요?',
        confirmButtonText: '네',
        showCancelButton: true,
        cancelButtonText: '로그인'
    })
    if(isFirst.isConfirmed){
        await getParticipationtsInfo();
    }
    else{
        await getUserID();
    }
}

async function getUserID(){
    let key;
    const { value: contact } = await Swal.fire({
        title: '이전에 제출한 연락처를 기입해주세요',
        input: 'text',
        inputValidator: async (value) => {
            return new Promise(async (resolve) => {
                
                if (value.length != 11) {
                    resolve('전화번호 11자리를 정확히 입력해주세요.')
                } 
                else if(!(key = await findID(value))){
                    resolve('존재하지 않는 아이디입니다.')
                }
                else {
                    resolve();
                }
            })
        }
      }).then()

      if (contact) {
        const usrInfo = data.Participants[key]
        participantsInfo.major = usrInfo.major;
        participantsInfo.year = usrInfo.year;
        participantsInfo.contact= usrInfo.contact;
        participantsInfo.userIndex = usrInfo.userIndex;
        setIndex(participantsInfo.userIndex);
      }
}

async function findID(value){
    let isExist = false;
    if(data.Participants){
        const keyList = Object.keys(data.Participants)
        for(let i = 0; i < keyList.length; i++){
            console.log(data.Participants[keyList[i]]);
            if(data.Participants[keyList[i]].contact == value){
                isExist = keyList[i];
            }
        }
    }
    return isExist;
}

async function inputYear() {
    const isSuitable = await swal.fire({
        title: '설문조사 해당자 여부 확인',
        html: '본 설문은 고등교육기관(대학 이상)에서 <br>미술을 <b>2년</b> 이상 전공한 사람을 대상으로 하고있습니다.<br>해당하십니까?',
        showCancelButton: true,
        cancelButtonText: 'Exit'
    })
    if(isSuitable.isDismissed){
        location.replace("./end.html");
    }
    const { value: year } = await swal.fire({
        title: '미술을 전공한 햇수를 입력해주세요.',
        text: `10년 이상 전공한 경우 10으로 입력`,
        input: 'range',
        inputAttributes: {
            min: 2,
            max: 10,
            step: 1
        },
        inputValue: 5,
    })

    if (year) {
        participantsInfo.year = Number(year);
    }
}

async function inputMajor() {
    const { value: major } = await swal.fire({
        title: '전공을 선택해주세요',
        input: 'select',
        inputOptions: {
            fineArt: '순수미술(서양화, 동양화, 조소 등)',
            design: '디자인(시각, 산업, 패션 등)',
            crafts: '공예(금속, 도자, 섬유 등)',
            education: '미술교육',
            history: '미술사',
            aesthetics: '미학',
            etc: '기타'
        },
        inputPlaceholder: '전공 선택',
        showCancelButton: false,
        allowOutsideClick: false,
        inputValidator: (major) => {
            return new Promise((resolve) => {
                if (major != '') {
                    resolve()
                } else {
                    resolve('전공 선택은 필수입니다.')
                }
            })
        }
    }).then()

    if (major) {
        participantsInfo.major = major;
    }
}
async function inputContact(){
    const { value: contact } = await Swal.fire({
        title: '연락처를 기입해주세요',
        input: 'text',
        html: `입력한 번호는 로그인에 사용되며, 중간 저장 후 이어서 응답할 수 있습니다.<br>모든 개인정보는 데이터 수집 종료 후 폐기됩니다.<br>번호는 숫자만 입력해주세요. ex)01012345678`,
        inputValidator: async (value) => {
            // 중복 여부 확인
            return new Promise(async (resolve) => {
                if (value.length != 11) {
                    resolve('전화번호 11자리를 정확히 입력해주세요.')
                } 
                else if(await findID(value)){
                    resolve('이미 존재하는 아이디입니다. 로그인하세요.')
                }
                else {
                    resolve();
                }
            })
        }
      })
      if (contact) {
        participantsInfo.contact = contact;
        if(data.Participants){
            participantsInfo.userIndex = Object.keys(data.Participants).length;
        }
        else{
            participantsInfo.userIndex = 0;
        }
        setIndex(participantsInfo.userIndex);
      }
}

async function showNotifications() {
    const steps = ['1', '2', '3', '4']
    const Queue = Swal.mixin({
        progressSteps: steps,
        title: "NOTICE",
        confirmButtonText: '다음',
        // optional classes to avoid backdrop blinking between steps
        showClass: { backdrop: 'swal2-noanimation' },
        hideClass: { backdrop: 'swal2-noanimation' }
    })

    await Queue.fire({
        html: `본 설문은 약 ${Math.min(question, totalLength)}개의 문항으로 이루어져있습니다.<br>(개인차 존재)`,
        currentProgressStep: 0,
        showClass: { backdrop: 'swal2-noanimation' },
    })
    await Queue.fire({
        html: '제시되는 그림과 더 알맞은 키워드를 <br>각 영역(표현주제, 구성방식, 표현양식, 감정이입)별로 1가지씩 선택하세요.',
        currentProgressStep: 1
    })
    await Queue.fire({
        html: '각 키워드에 대한 설명은 버튼 위에 마우스를 올리면 확인할 수 있습니다.',
        currentProgressStep: 2
    })
    await Queue.fire({
        html: '설문조사 페이지를 중간에 이탈할 시 반드시 <b>저장<b> 버튼을 눌러주세요.',
        currentProgressStep: 3,
        confirmButtonText: 'OK',
        showClass: { backdrop: 'swal2-noanimation' },
    })
}

export async function getParticipationtsInfo() {
    await inputYear();
    await inputMajor();
    await inputContact();
    await showNotifications();
    await writeParticipantsInfo();
}
