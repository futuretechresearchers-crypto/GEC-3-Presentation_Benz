import {expect,it} from 'vitest';
import {createPresentationPdf,explanations} from './pdf';
import {questions} from './quiz';

it('exports the presentation with explanations and references, excluding assessment content',()=>{
  const doc=createPresentationPdf();
  const contents=doc.output();
  expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(20);
  expect(explanations).toHaveLength(19);
  expect(contents).toContain('Simple explanation');
  expect(contents).toContain('US$38.341 billion');
  expect(contents).toContain('www.un.org');
  expect(contents).not.toMatch(/quiz|answer key|submit|knowledge check/i);
  for(const question of questions)expect(contents).not.toContain(question.question);
});
