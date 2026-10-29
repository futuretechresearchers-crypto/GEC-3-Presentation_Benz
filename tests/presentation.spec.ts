import {test,expect} from '@playwright/test';
import {slides} from '../src/data';
test('slides, navigation, notes, quiz, offline and responsive layout',async({page,context})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByRole('heading',{name:'GLOBAL MIGRATION.'})).toBeVisible();
 await page.keyboard.press('ArrowRight');await expect(page.getByRole('heading',{name:'People move. Culture travels.'})).toBeVisible();
 await page.keyboard.press('ArrowLeft');await expect(page.getByText('01 / A world in motion')).toBeVisible();
 await page.getByRole('button',{name:'Explore slides'}).click();await expect(page.locator('.contents button')).toHaveCount(20);await page.keyboard.press('Escape');
 for(let i=0;i<20;i++){
  await expect(page.locator('main h1')).toHaveText(i===0?'GLOBALMIGRATION.':slides[i].title);
  if(i===8){await page.getByRole('button',{name:'Food',exact:true}).click();await expect(page.locator('.culture-panel p')).toContainText('family recipe');await expect(page.locator('.exchange-route')).toBeVisible()}
  if(i<19)await page.getByRole('button',{name:'Next slide',exact:true}).click();
 }
 await page.getByRole('button',{name:'Presenter notes',exact:true}).click();
 const [notes]=await Promise.all([context.waitForEvent('page'),page.getByRole('link',{name:'Open presenter view'}).click()]);await notes.waitForLoadState();await expect(notes.getByText('PRESENTER VIEW · KEEP ON YOUR PRIVATE SCREEN')).toBeVisible();await notes.close();await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'START QUIZ'}).click();
 const choices=[1,2,3,0,1,2,3,0,2,1];
 for(let i=0;i<10;i++){await expect(page.getByText(`Question ${i+1} of 10`,{exact:true})).toBeVisible();await expect(page.locator('.options button')).toHaveCount(4);await page.locator('.options button').nth(choices[i]).click();await expect(page.locator('.options .selected')).toHaveCount(1);if(i<9)await page.getByRole('button',{name:'Next',exact:true}).click()}
 await page.getByRole('button',{name:'Previous',exact:true}).click();await expect(page.locator('.options .selected')).toHaveCount(1);await page.getByRole('button',{name:'Next',exact:true}).click();
 await page.getByRole('button',{name:'Submit Quiz',exact:true}).click();await expect(page.getByRole('heading',{name:'Submit your quiz?'})).toBeVisible();await page.getByRole('button',{name:'Keep reviewing'}).click();await page.getByRole('button',{name:'Submit Quiz',exact:true}).click();await page.getByRole('button',{name:'Confirm submission'}).click();
 await expect(page.getByRole('heading',{name:'You scored 100%!'})).toBeVisible();await expect(page.locator('.options')).toHaveCount(0);await expect(page.locator('.result')).not.toContainText(/correct answer|incorrect|explanation/i);
 await page.getByRole('button',{name:'Retry Quiz'}).click();await expect(page.getByText('0 answered',{exact:true})).toBeVisible();await expect(page.locator('.options .selected')).toHaveCount(0);await page.locator('.options button').first().click();await page.getByRole('button',{name:'Next',exact:true}).click();await page.getByRole('button',{name:'Previous',exact:true}).click();await expect(page.locator('.options .selected')).toHaveCount(1);
 await page.keyboard.press('Escape');await page.getByRole('button',{name:'Home',exact:true}).first().click();
 await page.getByRole('button',{name:'Fullscreen',exact:true}).click();await page.waitForTimeout(300);expect(await page.evaluate(()=>!!document.fullscreenElement)).toBe(true);await page.evaluate(()=>document.exitFullscreen());
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'test-results/mobile.png',fullPage:true,animations:'disabled'});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'test-results/desktop.png',fullPage:true,animations:'disabled'});
 await page.evaluate(async()=>{await navigator.serviceWorker.ready});await page.waitForTimeout(1000);await page.reload();await page.waitForTimeout(500);await context.setOffline(true);await page.reload();await expect(page.getByRole('heading',{name:'GLOBAL MIGRATION.'})).toBeVisible();await page.getByRole('button',{name:'Quiz ↗'}).click();await expect(page.locator('.options button')).toHaveCount(4);await context.setOffline(false);
 expect(errors).toEqual([]);
});
