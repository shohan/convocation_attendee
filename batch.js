/**
 * @name sust cse 03 batch convocation list
 *
 * @desc puppeteer run on node.js
 *
 */
const puppeteer = require('puppeteer');
const fs = require('fs');

var fullResponse = [];
var completeRegs = [];
(async () => {
const browser = await puppeteer.launch()
const page = await browser.newPage()
 
var registeredCount = 0;
 
var regRange = ['2003331001', '2003331002','2003331003','2003331004','2003331005','2003331006','2003331007','2003331008','2003331009','2003331010','2003331011','2003331012','2003331013','2003331014','2003331015','2003331016','2003331017','2003331018','2003331019','2003331020','2003331021','2003331022','2003331023','2003331024','2003331025','2003331026','2003331027','2003331028','2003331029','2003331030','2003331031','2003331032','2003331033','2003331034','2003331035','2003331036','2003331037','2003331038','2003331039','2003331040','2003331041','2003331042','2003331043','2003331044','2003331045','2003331046','2003331047','2003331048','2003331049','2003331050','2003331051','2003331052','2003331053','2003331054','2003331055','2003331056','2003331057','2003331058','2003331059','2003331060','2003331061','2003331062','2003331063','2003331064','2003331065','2003331066','2003331067','2003331068','2003331069','2003331070','2003331071','2003331072','2003331073','2003331074','2003331075','2003331076','2003331077','2003331078','2003331079','2003331080','2003331081','2003331082','2003331083','2003331084','2003331085','2003331086','2003331087','2003331088','2003331089','2003331090','2003331091','2003331092','2003331093','2003331094','2003331095','2003331096','2003331097','2003331098','2003331099','2003331100','2003331101','2003331102','2003331103','2003331104','2003331105','2003331106','2003331107','2003331108','2003331109','2003331110','2003331111','2003331112','2003331113','2003331114','2003331115','2003331116','2003331117','2003331118','2003331119','2003331120','2003331121'];
for( i = 0; i< 121; i++) {
  
  await page.goto('https://sustconvocation.com/registration/status/form');
  await page.waitForSelector("#reg");
  
  await page.type("input[name=reg]", regRange[i]);
  await page.click("#statusBtn");

  await page.waitForSelector("body > section > div > div > div > div > section > div > div > div > h2");
  var reg = await page.$$eval("body > section > div > div > div > div > section > div > div > div > h2", (regNo)=> $(regNo).text());
  var successStatus = await page.$$eval("body > section > div > div > div > div > section > div > div > div > h2> i", (status)=> $(status).hasClass("text-success"));
  var msg = await page.$$eval("body > section > div > div > div > div > section > div > div > div > h4", (statusMsg)=> $(statusMsg).text());

  if(successStatus) {
    registeredCount ++;
    completeRegs.push(reg);
  }
 
  fullResponse.push({"regNo": reg, "status": successStatus, "statusMsg": msg });
}

fs.writeFile('reg03.json', JSON.stringify(fullResponse), function (err) {
  if (err) throw err;
  console.log('Full Saved!');
});

fs.writeFile('completeReg.json', JSON.stringify(completeRegs), function (err) {
  if (err) throw err;
  console.log('Complete registraion no Saved!');
});
 
console.log(registeredCount);
   
await browser.close()
})()
