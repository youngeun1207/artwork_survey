import { participantsInfo } from "./getParticipationtsInfo.js";
import { index } from "./handleBtns.js";

export let userKey;

const firebaseConfig = {
  apiKey: "AIzaSyB_R5x52z6jfpOeMGq5rMUQN0QXnJ9MnWE",
  authDomain: "art-propensity-classification.firebaseapp.com",
  databaseURL: "https://art-propensity-classification-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "art-propensity-classification",
  storageBucket: "art-propensity-classification.appspot.com",
  messagingSenderId: "884162594619",
  appId: "1:884162594619:web:73c9cb5ab796718463191e",
  measurementId: "G-GLDKE5H9H7"
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.database(app);
const dbRef = db.ref();

export async function readDatabase() {
    const data = await dbRef.get();
    if (!data.val()) console.error("err");
    return data.val();
}

// 설문조사 결과 저장
export async function writeAnswer(answer) {
    db.ref('Done').push({
        artistName: answer.artist,
        label: answer.label 
    });
}

// 설문조사 참여자 정보 저장 (초기)
export async function writeParticipantsInfo() {
    userKey = db.ref('Participants').push({
        contact: participantsInfo.contact,
        major: participantsInfo.major,
        year: participantsInfo.year,
        userIndex: participantsInfo.userIndex
    });
}

// 설문조사 진행 index 저장 (임시저장)
export async function saveCurrentIndex() {
    dbRef.child('Participants').child(userKey).child(participantsInfo.contact).set({
        userIndex: index
    });
}
