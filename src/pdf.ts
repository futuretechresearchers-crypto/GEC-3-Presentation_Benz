import {jsPDF} from 'jspdf';
import {slides, sources, culturalDetails} from './data';

// Handout explanations deliberately omit presenter instructions and assessment content.
export const explanations = [
  'When people move to another country, they bring experiences and traditions that can connect their old and new communities.',
  'Migration is part of human history. People share culture through everyday life, while also learning from the communities they join.',
  'Understanding migration means looking at why people move, how they move, and what their movement means for communities.',
  'A single journey can be described from different perspectives: leaving the origin country and entering the destination country.',
  'One person can belong to several categories at once, such as an international migrant who moves temporarily for work.',
  'Push factors encourage people to leave, while pull factors attract them elsewhere. Resources and migration rules also shape their choices.',
  'Human mobility has connected societies for a long time, but people have not always moved freely. Forced movement must be distinguished from chosen journeys.',
  'These figures describe people living outside their country of origin at a particular time. They do not count all journeys or arrivals during the year.',
  'Cultural exchange works in both directions. People can maintain their traditions while adopting and sharing new influences.',
  'Shared food, languages and celebrations can build understanding. People should be able to participate without giving up their identities.',
  'Migration can benefit both origin and destination communities, especially when migrants have fair opportunities and protection.',
  'Moving can bring opportunities and difficulties together. Welcoming communities and fair treatment can help people adjust safely.',
  'Origin and destination economies are connected by work, money and skills. Benefits and costs depend on local conditions and policies.',
  'Southeast Asian countries are connected through work, education and family networks. Moving or working across borders still requires following national rules.',
  'Overseas employment can support Filipino families financially, but maintaining relationships across distance also takes effort. Personal remittances are broader than OFW cash transfers alone.',
  'Filipinos abroad can preserve and share culture through daily life and community activities. Traditions differ across regions, families and individuals.',
  'People who leave because of danger may need protection. Refugees cross international borders, while internally displaced people remain in their own country.',
  'Future movement will depend on environmental conditions, jobs, technology and policy choices. Cooperation can help protect people without assuming a single future outcome.',
  'Migration connects people and cultures. Respect for rights and dignity helps communities manage change and learn from one another.',
];

const plain = (value:string) => value
  .replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-')
  .replace(/·/g,' / ').replace(/↗/g,'').replace(/…/g,'...');

export function createPresentationPdf() {
  const doc = new jsPDF({unit:'mm',format:'a4'});
  doc.setProperties({title:'Global Migration - Presentation Handout',subject:'GEC 3 - Migration of Cultures Around the World',author:'GEC 3 Presentation'});
  const width = 170;
  let y = 0;
  const text = (value:string, size=11, bold=false, color='#24354a') => {
    doc.setFont('helvetica',bold?'bold':'normal');
    doc.setFontSize(size);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(plain(value),width) as string[];
    const lineHeight = size * 0.46;
    for (const line of lines) {
      if(y+lineHeight>272){doc.addPage();y=24;}
      doc.text(line,20,y);
      y += lineHeight;
    }
    y += 4;
  };
  for (let index=0;index<slides.length;index++) {
    if(index)doc.addPage();
    y=22;
    text('GEC 3 / THE CONTEMPORARY WORLD / ASEAN STUDIES',9,true,'#1769aa');
    text(`${String(index+1).padStart(2,'0')} / ${index===19?'References':slides[index].title}`,23,true,'#101d35');
    if(index===19){
      text('Sources supporting the presentation content.',12);
      for(const source of sources){
        text(source.name,12,true);
        text(source.detail,10);
        text(source.url,9,false,'#1769aa');
      }
      text('Sources consulted 29 October 2026. Statistics retain their stated historical years.',9);
      continue;
    }
    text(slides[index].intro,13);
    for(const [heading,body] of slides[index].items){
      text(heading,12,true);
      text(body);
    }
    text('Simple explanation',12,true,'#1769aa');
    text(explanations[index]);
    if(index===8){
      text('Everyday examples',12,true,'#1769aa');
      for(const [heading,body] of Object.entries(culturalDetails))text(`${heading}: ${body}`,10);
    }
    if(slides[index].source){
      text('Sources: '+slides[index].source!.map(n=>sources[n].name).join('; '),9,false,'#526475');
    }
  }
  const pages = doc.getNumberOfPages();
  for(let page=1;page<=pages;page++){
    doc.setPage(page);
    doc.setDrawColor('#d9e1e7');doc.line(20,281,190,281);
    doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor('#526475');
    doc.text('Global Migration / Presentation Handout',20,287);
    doc.text(`${page} / ${pages}`,190,287,{align:'right'});
  }
  return doc;
}

export function downloadPresentationPdf(){
  createPresentationPdf().save('Global-Migration-Presentation.pdf');
}
