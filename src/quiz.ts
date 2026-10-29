import questions from './questions.json';
const key = [1,2,3,0,1,2,3,0,2,1];
export {questions};
export function score(answers:(number|null)[]) { return questions.reduce((total,_,i)=>total+(answers[i]===key[i]?1:0),0); }
