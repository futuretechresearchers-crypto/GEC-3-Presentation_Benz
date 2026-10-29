import {describe,it,expect} from 'vitest';
import {questions,score} from './quiz';
describe('quiz contract',()=>{it('has exactly ten questions with four distinct choices',()=>{expect(questions).toHaveLength(10);for(const q of questions){expect(q.options).toHaveLength(4);expect(new Set(q.options).size).toBe(4)}});it('scores complete, empty and partial responses',()=>{const selections=[1,2,3,0,1,2,3,0,2,1];expect(score(selections)).toBe(10);expect(score(Array(10).fill(null))).toBe(0);expect(score(selections.map((v,i)=>i<8?v:null))).toBe(8);expect(score(selections.map(v=>(v+1)%4))).toBe(0)})});
