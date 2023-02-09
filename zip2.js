const StreamZip = require("node-stream-zip");
const { ipcRenderer,remote } = require("electron");
//const { remote } = require('electron');
const decompress = require("decompress");
const sqlite3 = require("sqlite3").verbose();
const Store = require("electron-store");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const os = require("os");
const Alert = require("electron-alert");
const newelectron = require("electron");
const { BrowserWindow } = require("@electron/remote");
const cheerio = require('cheerio');
const PDFDocument = require('pdfkit');
const { output } = require("pdfkit");
// const Alert = require("electron-alert");
// window.$ = window.jQuery = require('jquery');
window.addEventListener("DOMContentLoaded", () => {

  const src = path.join(__dirname, 'apkfolder');
  const newsrc = __dirname;
  const dest = path.join(__dirname, '../dest');
  const newdest = path.join(__dirname, '../');
  const newfiledr= path.join(__dirname, '../');
   const newfiledrnew= path.join(__dirname, '../dest');
  console.log('newpath',newfiledr);
  console.log('oldpath',__dirname);

 fs.readdirSync(__dirname).filter(function(file) {
                       console.log('projectfolderallfiles',file); 
                      //  if(file.indexOf(".apk")>-1){
                          // apkname=file;

                          //fs.readdirSync(newfiledrnew).filter(function(file) {
                              // fs.readdir(newfiledrnew, (err, files) => {
                              //   if (err) throw err;
                                

                              //   files.forEach((file) => {
                              //     const filePath = path.join(newfiledrnew, file);
                              //     const destPath = path.join(newfiledr, file);

                              //     fs.copyFile(filePath, destPath, (error) => {
                              //       if (error) throw error;
                              //     });
                              //   });
                              // }); 
                        // });
                      //  }
                      }); 

                      fs.readdirSync(newfiledr).filter(function(file) {
                       console.log('onepreviousprojectfolder',file); 
                        // if(file.indexOf(".apk")>-1){
                        //  // apkname=file;
                        // }
                      }); 

const copy = (src, dest) => {
  fs.readdir(src, (err, items) => {
    if (err) throw err;

    items.forEach((item) => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      fs.stat(srcPath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) throw err;
          });
        } else if (stats.isDirectory()) {
          fs.mkdir(destPath, { recursive: true }, (err) => {
            if (err) throw err;
            copy(srcPath, destPath);
          });
        }
      });
    });
  });
};
copy(src, dest);

const copynew = (newsrc, newdest) => {
  fs.readdir(newsrc, (err, items) => {
    if (err) throw err;

    items.forEach((item) => {
      const srcPath = path.join(newsrc, item);
      const destPath = path.join(newdest, item);

      fs.stat(srcPath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile()) {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) throw err;
          });
        }
        // } else if (stats.isDirectory()) {
        //   fs.mkdir(destPath, { recursive: true }, (err) => {
        //     if (err) throw err;
        //     copy(srcPath, destPath);
        //   });
        // }
      });
    });
  });
};
copynew(newsrc, newdest);
  // promise.then((result) => {
  // 	if (result.value) {
  // 		// confirmed
  // 	} else if (result.dismiss === Alert.DismissReason.cancel) {
  // 		// canceled
  // 	}
  // })

  
  var newrecord = "";

  // function checkfiles() {
  //   const computerName = os.userInfo().homedir;

  //   //const db = new sqlite3.Database("Manifest.db");
  //   var link = computerName.replaceAll("\\", "/");
  //   const computerpath1 =
  //     link + "/AppData/Roaming/Apple Computer/MobileSync/Backup/";
  //   const computerpath2 = link + "/Apple/MobileSync/Backup/";
  //   var pathdata = "";
  //   var path2 = "";
  //   var computernew = "";
  //   fs.readdir(computerpath1, function (err, files21) {
  //     //   console.log(files21.length);
  //     //   console.log(files21);
  //     //handling error
  //     if (files21.length == 1) {
  //       //	return console.log("Unable to scan directory: " + err);
  //       fs.readdir(computerpath2, function (err, files211) {
  //         //handling error
  //         if (err) {
  //           alert("No backup found.Please backup your iphone using itunes");
  //         } else {
  //           for (var s = 0; s < files211.length; s++) {
  //             //console.log('newpath1',files21[i]);
  //             if (files211[s].length == 40) {
  //               pathdata = computerpath2 + files211[s] + "/" + "Manifest.db";
  //               computernew = computerpath2;
  //               path2 = files211[s];
  //               console.log("computerpath2", computerpath2);
  //               retriveiphonemsg(pathdata, path2, computernew);
  //               break;
  //               //console.log(pathdata);
  //             }
  //           }
  //         }
  //       });
  //     } else {
  //       for (var i = 0; i < files21.length; i++) {
  //         //console.log('newpath1',files21[i]);
  //         if (files21[i].length == 40) {
  //           pathdata = computerpath1 + files21[i] + "/" + "Manifest.db";
  //           console.log(pathdata);
  //           path2 = files21[i];
  //           computernew = computerpath1;
  //           //console.log(pathdata);
  //           console.log("computerpath1", computerpath1);
  //           retriveiphonemsg(pathdata, path2, computernew);
  //           break;
  //         }
  //       }
  //     }
  //   });
  // }

  //  function iphonewhatsappmsg() {
  //   const computerName = os.userInfo().homedir;

  //   //const db = new sqlite3.Database("Manifest.db");
  //   var link = computerName.replaceAll("\\", "/");
  //   const computerpath1 =link + "/AppData/Roaming/Apple Computer/MobileSync/Backup/";
  //   const computerpath2 = link + "/Apple/MobileSync/Backup/";
  //   var pathdata = "";
  //   var path2 = "";
  //   var computernew = "";
  //   fs.readdir(computerpath1, function (err, files21) {
  //     //   console.log(files21.length);
  //     //   console.log(files21);
  //     //handling error
  //     if (files21.length == 1) {
  //       //	return console.log("Unable to scan directory: " + err);
  //       fs.readdir(computerpath2, function (err, files211) {
  //         //handling error
  //         if (err) {
  //           alert("No backup found.Please backup your iphone using itunes");
  //         } else {
  //           for (var s = 0; s < files211.length; s++) {
  //             console.log('newpath1123',files21[i]);
  //             if (files211[s].length == 40) {
  //               pathdata = computerpath2 + files211[s] + "/" + "Manifest.db";
  //               computernew = computerpath2;
  //               path2 = files211[s];
  //               console.log("computerpath2", computerpath2);
  //               retriveiphonewhatssappmsg(pathdata, path2, computernew);
  //               break;
  //               //console.log(pathdata);
  //             }
  //           }
  //         }
  //       });
  //     } else {
  //       for (var i = 0; i < files21.length; i++) {
  //         //console.log('newpath1',files21[i]);
  //           console.log('newpath1123',files21[i]);
  //         if (files21[i].length == 40) {
  //           pathdata = computerpath1 + files21[i] + "/" + "7c/7c7fba66680ef796b916b067077cc246adacf01d";
  //           console.log(pathdata);
  //           path2 = files21[i];
  //           computernew = computerpath1;
  //           //console.log(pathdata);
  //           console.log("computerpath1", computerpath1);
  //           retriveiphonewhatssappmsg(pathdata, path2, computernew);
  //           break;
  //         }
  //       }
  //     }
  //   });
  // }
  // console.log("pathnew", checkfiles());

//   function retriveiphonemsg(pathdata, path2, computernew) {
//     //console.log('path2',path2);
//     const computerName = os.userInfo().homedir;
//     var link = computerName.replaceAll("\\", "/");
//     const db = new sqlite3.Database(pathdata);
//     const query = "SELECT * FROM Files where relativePath='Library/SMS/sms.db'";
//     // console.log(query);
//     const store = new Store();
//     //store.delete('row');
//     db.serialize(() => {
//       db.all(query, (err, row) => {
//         if (err) {
//           console.error("====>", err.message);
//         }
//         store.set("row", row);
//         db.close();
//       });
//     });
//     const data = store.get("row");
//     const retrivedata = data[0].fileID;
//     const newsubstring = retrivedata.substring(0, 2);
//     // console.log(data);

//     //getting second database file
//     const newfile =
//       computernew +
//       path2 +
//       "/" +
//       newsubstring +
//       "/3d0d7e5fb2ce288813306e4d4636395e047a3d28";

//     console.log("second db complete path", newfile);
//     const newdb = new sqlite3.Database(newfile);

//     const query1 = "SELECT * FROM chat";
//     //console.log(query1);
//     newdb.serialize(() => {
//       newdb.all(query1, (err, row) => {
//         if (err) {
//           console.error("====>", err.message);
//         }
//         store.set("row2", row);
//         // newdb.close();
//       });
//     });
//     const data2 = store.get("row2");
//     //console.log("data2", data2);
//     for (var sj = 0; sj < data2.length; sj++) {
//       newrecord +=
//         '<div class="data_p21" data-id="' +
//         data2[sj].ROWID +
//         '"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +
//         data2[sj].chat_identifier +
//         "</span></div>";
//       document.querySelector(".numbers_data").innerHTML = newrecord;
//       //console.log('sad',data2[sj].chat_identifier);
//     }

//     var elements = document.getElementsByClassName("data_p21");

//     var myFunction = function () {
//       newy = "";

//       var attr = this.getAttribute("data-id");
//       const query2 = "SELECT * FROM message where handle_id=" + attr + "";
//       //console.log(query2);
//       newdb.serialize(() => {
//         newdb.all(query2, (err, row) => {
//           // store.delete('row3');
//           if (err) {
//             console.error("====>", err.message);
//           }
//           store.set("row3", row);
//           // newdb.close();
//         });
//       });
//       const data3 = store.get("row3");
//       //console.log('strigifiy',JSON.stringify(data3))
//       for (var sj1 = 0; sj1 < data3.length; sj1++) {
//         var date = data3[sj1].date / 1000;
//         var newdate = Date("Y-m-d H:i:s", date);
//         var dateString = new Date(newdate).toDateString();
//         //var newdate=new Date(data3[sj1].date);
//         if (data3[sj1].is_from_me != 0) {
//           newy +=
//             '<div class="right_msg"><p>' +
//             data3[sj1].text +
//             "</p><span>" +
//             newdate +
//             "</span> <span>11:04</span></div>";
//         } else {
//           newy +=
//             '<div class="left_msg"><p>' +
//             data3[sj1].text +
//             "</p><span>" +
//             newdate +
//             "</span> <span>11:04</span></div>";
//         }
//       }
//       document.querySelector(".demo").innerHTML = newy;
//       document.getElementById("padfcontent").innerHTML=newy;
//       var newhtml= document.getElementById("padfcontent");
//       const imagePath = path.join(__dirname, 'images/newpmm.png');

//       const pElements = newhtml.getElementsByTagName('p');
//       //console.log('parentElement',pElements.parentNode.className)
//       const padding = 100;
//        const padding2 = 10;
// const doc = new PDFDocument();
//         let pText = '';
//         let j=0;
//         for (let i = 0; i < pElements.length; i++) {
//           pText +='<p>My Name is Hamza</p><p style="margin-left:400px">My Name is Hamza</p>\n'+pElements[i].textContent + '\n';
//          // doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
//           j++;
//         }
      
      
//         doc.pipe(fs.createWriteStream('output.pdf'));
//         const html = pText;
//         // const html=newy;

//         const $ = cheerio.load(html);
        
//         const text = $.text();
//          console.log('sad',text);
         
//         doc.fillColor('black').text(text);


//         // Set the watermark image path
// //doc.addPage();

// // Set the image position and size
//   var x = doc.page.width / 2-120;
//  // var y = doc.page.height / 2;
//  var y = doc.page.margins.top;
//   var width = 500;
//   var height = 300;
// doc.rotate(20);
// doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
// console.log("doc.page.length",doc.page.document._pageBufferStart)

// doc.end(); 
// // doc.on('pageAdded', function() {
// //   doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
// //   // doc.fillColor('gray')
// //   //    .text('Confidential', doc.page.width / 2, doc.page.height / 2, { align: 'center', angle: 45 });
// // });
// // Add the watermark to the first page only
// //doc.addPage();
       

// // for (var s = 1; s <= doc.page.document._pageBufferStart; s++) {
// //    // doc.switchToPage(s);
// //   // doc.image(image, doc.page.width / 2, doc.page.height / 2, { align: 'center', width: 200 });
// //    doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
// // }

 
//     };

//     for (var si = 0; si < elements.length; si++) {
//       elements[si].addEventListener("click", myFunction, false);
//     }

//     const query3 = "SELECT * FROM message";

//     // console.log(query3);
//     newdb.serialize(() => {
//       newdb.all(query3, (err, row) => {
//         // store.delete('row3');
//         if (err) {
//           console.error("====>", err.message);
//         }
//         store.set("row4", row);
//         // newdb.close();
//       });
//     });
//     const data4 = store.get("row4");
//     // console.log("data4", data4);
//     var arr = [];
//     for (var sj12 = 0; sj12 < data4.length; sj12++) {
//       arr.push({
//         date: data4[sj12].date,
//         type: data4[sj12].is_from_me,
//         address: "asdasd",
//         body: data4[sj12].text,
//         newdate: data4[sj12].date,
//       });
//       // arr['date']=data4[sj12].date;
//       // arr['type']=data4[sj12].is_from_me;
//       // arr['address']='asdasd';
//       // arr['body']=data4[sj12].text;
//       // arr['newdate']=data4[sj12].date;
//     }
//     var jsondata = JSON.stringify(arr);
//     document.querySelector(".jsondata").value = jsondata;
//     console.log("json", jsondata);
//     //     console.log('check',pathdata);
//   }

//    function retriveiphonewhatssappmsg(pathdata, path2, computernew) {
//     console.log('pathdata',pathdata);
//      console.log('path2',path2);
//       console.log('computernew',computernew);
//     const computerName = os.userInfo().homedir;
//     var link = computerName.replaceAll("\\", "/");
//     const db = new sqlite3.Database(pathdata);
//     //const query = "SELECT * FROM Files where relativePath='Library/SMS/sms.db'";
//      console.log('db',db);
//     const store = new Store();
//     //store.delete('row');
//     // db.serialize(() => {
//     //   db.all(query, (err, row) => {
//     //     if (err) {
//     //       console.error("====>", err.message);
//     //     }
//     //     store.set("row", row);
//     //     db.close();
//     //   });
//     // });
//     // const data = store.get("row");
//     // const retrivedata = data[0].fileID;
//     // const newsubstring = retrivedata.substring(0, 2);
//     // console.log(data);

//     //getting second database file
//     const newfile =
//       computernew +
//       path2 +
//       "/7c/7c7fba66680ef796b916b067077cc246adacf01d";

//     console.log("second db complete path", newfile);
//     const newdb = new sqlite3.Database(newfile);

//     const query1 = "SELECT * FROM ZWACHATSESSION";
//     //console.log(query1);
//     newdb.serialize(() => {
//       newdb.all(query1, (err, row) => {
//         if (err) {
//           console.error("====>", err.message);
//         }
//         store.set("row2", row);
//         // newdb.close();
//       });
//     });
//     const data2 = store.get("row2");
//     //console.log("data2", data2);
//     for (var sj = 0; sj < data2.length; sj++) {
//       newrecord +=
//         '<div class="data_p212" data-id="' +
//         data2[sj].Z_PK+
//         '"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +
//         data2[sj].ZPARTNERNAME +
//         "</span></div>";
//       document.querySelector(".numbers_data").innerHTML = newrecord;
//       console.log('sad',data2[sj].ZPARTNERNAME);
//     }

//     var elements = document.getElementsByClassName("data_p212");

//     var myFunctionnew = function () {
//       newy = "";

//       var attr = this.getAttribute("data-id");
//       const query2 = "SELECT * FROM ZWAMMESSAGE where Z_OPT=" + attr + "";
//       //console.log(query2);
//       newdb.serialize(() => {
//         newdb.all(query2, (err, row) => {
//           // store.delete('row3');
//           if (err) {
//             console.error("====>", err.message);
//           }
//           store.set("row3", row);
//           // newdb.close();
//         });
//       });
//       const data3 = store.get("row3");
//       //console.log('strigifiy',JSON.stringify(data3))
//       for (var sj1 = 0; sj1 < data3.length; sj1++) {
//        // var date = data3[sj1].date / 1000;
//        // var newdate = Date("Y-m-d H:i:s", date);
//        // var dateString = new Date(newdate).toDateString();
//         //var newdate=new Date(data3[sj1].date);
//          var newdate = Date("Y-m-d H:i:s");
//        // if (data3[sj1].is_from_me != 0) {
//           newy +=
//             '<div class="right_msg"><p>' +
//             data3[sj1].ZTEXT +
//             "</p><span>" +
//             newdate +
//             "</span> <span>11:04</span></div>";
//        // } else {
//           newy +=
//             '<div class="left_msg"><p>' +
//             data3[sj1].ZTEXT +
//             "</p><span>" +
//             newdate +
//             "</span> <span>11:04</span></div>";
//        // }
//       }
//       document.querySelector(".demo").innerHTML = newy;
//       document.getElementById("padfcontent").innerHTML=newy;
//       var newhtml= document.getElementById("padfcontent");
//       const imagePath = path.join(__dirname, 'images/newpmm.png');

//       const pElements = newhtml.getElementsByTagName('p');
//       //console.log('parentElement',pElements.parentNode.className)
//       const padding = 100;
//        const padding2 = 10;
// const doc = new PDFDocument();
//         let pText = '';
//         let j=0;
//         for (let i = 0; i < pElements.length; i++) {
//           pText +='\n'+pElements[i].textContent + '\n';
//          // doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
//           j++;
//         }
      
       
       
//       //  doc.on('pageAdded', function() {
//       //   doc.image(imagePath, doc.page.width / 2, doc.page.height / 2, { align: 'center', opacity: 0.5 });
//       // });
//       // doc.fillColor('blue')
//       //   .text(pText, padding2, 100);

//       // doc.fillColor('red')
//       //   .text(pText, doc.page.width - doc.widthOfString('This is another text.') - padding, 100);
//         // doc.image(imagePath, doc.page.width / 2, doc.page.height / 2, { align: 'center', opacity: 0.5 });
       
//       //  doc.on('pageAdded', function() {
//       //     doc.fillColor('gray')
//       //       .text('Confidential', doc.page.width / 2, doc.page.height / 2, { align: 'center', angle: 45 });
//       //   });
//         doc.pipe(fs.createWriteStream('output.pdf'));
//         const html = pText;
//         // const html=newy;

//         const $ = cheerio.load(html);
        
//         const text = $.text();
//          console.log('sad',text);
         
//         doc.fillColor('black').text(text);


//         // Set the watermark image path
// //doc.addPage();

// // Set the image position and size
//   var x = doc.page.width / 2-120;
//  // var y = doc.page.height / 2;
//  var y = doc.page.margins.top;
//   var width = 500;
//   var height = 300;
// doc.rotate(20);
// //doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
// console.log("doc.page.length",doc.page.document._pageBufferStart)


// // doc.on('pageAdded', function() {
// //   doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
// //   // doc.fillColor('gray')
// //   //    .text('Confidential', doc.page.width / 2, doc.page.height / 2, { align: 'center', angle: 45 });
// // });
// // Add the watermark to the first page only
// //doc.addPage();
//         doc.end(); 

// for (var s = 1; s <= doc.page.document._pageBufferStart; s++) {
//    // doc.switchToPage(s);
//   // doc.image(image, doc.page.width / 2, doc.page.height / 2, { align: 'center', width: 200 });
//    doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
// }
//     };

//     for (var si = 0; si < elements.length; si++) {
//       elements[si].addEventListener("click", myFunctionnew, false);
//     }

//     const query3 = "SELECT * FROM ZWAMESSAGE";

//     // console.log(query3);
//     newdb.serialize(() => {
//       newdb.all(query3, (err, row) => {
//         // store.delete('row3');
//         if (err) {
//           console.error("====>", err.message);
//         }
//         store.set("row4", row);
//         // newdb.close();
//       });
//     });
//     const data4 = store.get("row4");
//     // console.log("data4", data4);
//     var arr = [];
//     for (var sj12 = 0; sj12 < data4.length; sj12++) {
//       arr.push({
//         date: data4[sj12].date,
//         type: data4[sj12].is_from_me,
//         address: "asdasd",
//         body: data4[sj12].text,
//         newdate: data4[sj12].date,
//       });
//       // arr['date']=data4[sj12].date;
//       // arr['type']=data4[sj12].is_from_me;
//       // arr['address']='asdasd';
//       // arr['body']=data4[sj12].text;
//       // arr['newdate']=data4[sj12].date;
//     }
//     var jsondata = JSON.stringify(arr);
//     document.querySelector(".jsondata").value = jsondata;
//     console.log("json", jsondata);
//     //     console.log('check',pathdata);
//   }

  // function get_db() {

  // }

          document.getElementById("text_messages").addEventListener(
            "click",
            function () {
              document.querySelector(".numbers_data").innerHTML = "";
              document.getElementById("upload").style.display = "none";
              ipcRenderer.send("iphonemsg", "helwosaodsad");
              //get_db();
              //checkfiles();
        //<<<<<<< HEAD
            },
            false
          );

          

        document.getElementById("andorid_messages").addEventListener(
          "click",
          function () {
                downloadapk();
          },
          false
        );

        
          document.getElementById("iphonewhtasapp_messages").addEventListener(
            "click",
            function () {
              // document.querySelector(".numbers_data2").innerHTML = "";
              // document.getElementById("upload").style.display = "none";
               ipcRenderer.send("iphonewhatsapp", "helwosaodsad");
              //get_db();
              //iphonewhatsappmsg();
        //<<<<<<< HEAD
            },
            false
          );
        const exec = require('child_process').exec;
      function execute(command, callback) {
            exec(command, (error, stdout, stderr) => { 
              callback(stdout); 
            });
          };

	function downloadapk(){

 
// const src = 'C:/Users/asad/Desktop/PmmDesktopApp/apkfolder';
// const dest = 'C:/newchek2/';

// fs.readdir(src, (err, files) => {
//   if (err) throw err;

//   files.forEach((file) => {
//     const srcPath = path.join(src, file);
//     const destPath = path.join(dest, file);
//     const readStream = fs.createReadStream(srcPath);
//     const writeStream = fs.createWriteStream(destPath);

//     readStream.on('error', (err) => {
//       throw err;
//     });

//     writeStream.on('error', (err) => {
//       throw err;
//     });

//     readStream.pipe(writeStream);
//   });
// });



    // const src = path.join(__dirname, 'apkfolder/platform-tools');
    // const dest = 'C:/newchek/';

    // fs.mkdir(dest, 0o755, (err) => {
    //   if (err) throw err;
       
    //   // copy files from src to dest
    // });
    // const fs = require('fs');
    // const sourceFolder = 'C:/Users/asad/Desktop/PmmDesktopApp/apkfolder';
    // const targetFolder = 'C:/newchek/';

    // fs.copyFileSync(sourceFolder, targetFolder, {recursive: true});
      
                  // const directoryPath233 = ("C:/Users/asad/Desktop/PmmDesktopApp/apkfolder/platform-tools");
                 // const newfiledr1= path.join(__dirname, '../dest/');
                    const directoryPath233=path.join(__dirname, '../dest/platform-tools');
                     console.log("abdfolder",directoryPath233);
                        // const apkfolder = path.join(__dirname);
                        //const apkfolder =("C:/Users/asad/Desktop/PmmDesktopApp");
                        const apkfolder =path.join(__dirname, '../');
                         console.log("apkfolder",apkfolder);
                      var apkname = "";
                      fs.readdirSync(apkfolder).filter(function(file) {
                        if(file.indexOf(".apk")>-1){
                          apkname=file;
                        }
                      }); 
                      // call the function

                      try {


                             // execute('cd../', (output) => {

                              execute('SETX path '+directoryPath233+'', (output) => {
                                console.log("cmdcommand1",output);
                              });

                            var executedata= execute('adb version', (output) => {
                                  var newresponse=output.includes("Android");
                                  execute('adb install app-release.apk', (output) => {
                                    console.log("cmdcommand2APK",apkname);
                                  });
                            });

                        //});  
                      } catch (error) {
                        alert(error)
                      }
                      // execute('SETX path '+directoryPath233+'', (output) => {
                      //   console.log("cmdcommand1",output);
                      // });
                      
                      // var executedata= execute('adb version', (output) => {
                      //     var newresponse=output.includes("Android");
                      //     execute('adb install ../dest/app-release.apk', (output) => {
                      //        console.log("cmdcommand2APK",apkname);
                      //     });
                      //     // execute('adb install '+apkname+'', (output) => {
                      //     //    console.log("cmdcommand2APK",apkname);
                      //     // });
                      //   //  if(newresponse==true){
                      //   //     console.log(output);
                      //   //  }else{
                      //   //    execute('adb install '+apkname+'', (output) => {
                      //   //     console.log("cmdcommand2APK",apkname);
                      //   //   });
                      //   //  }
                      // });
                     
                   //  console.log("executedata",executedata);
                      // execute('adb install '+apkname+'', (output) => {
                      //   //console.log("cmdcommand2",'adb install '+apkname+'');
                      // });
              
      
       
	}
	// const computerName = os.userInfo().homedir;
	// console.log('computername',computerName);
//=======
  //   },
  //   false
  // );
  // const computerName = os.userInfo().homedir;
  // console.log('computername',computerName);
//>>>>>>> 8389dbae44c2e76257bf274d7da1d8753ab13c7c

  //messenger code

  // document.getElementById("facebook_msg").addEventListener(
  //   "click",
  //   function () {
  //     document.querySelector(".numbers_data").innerHTML = "";
  //     document.getElementById("upload").style.display = "block";
  //     // ipcRenderer.send('msg2',"helwosaodsad");
  //     var file = document.getElementById("upload");
  //     //var file = document.getElementById("txt-note");
  //     ipcRenderer.send("msg2", "helwosaodsad");

  //     ipcRenderer.on("filelink", (event, data1) => {
  //       document.querySelector(".demo1").innerHTML = "";
  //       console.log("filelink", data1);
  //       const zip = new StreamZip({ file: data1[0] });

  //       zip.on("ready", () => {
  //         console.log("Entries read: " + zip.entriesCount);
  //         for (const entry of Object.values(zip.entries())) {
  //           const desc = entry.isDirectory
  //             ? "directory"
  //             : `${entry.size} bytes`;
  //           const data = `${entry.name}`;
  //           //document.querySelector(".demo1").insertAdjacentHTML("beforeend", "<li>" + data + "</li>");
  //           const newdata = data1[0];
  //           const newfile = newdata.substring(0, newdata.lastIndexOf("."));
  //           // console.log(newfile);
  //           var x = "",
  //             j,
  //             y = "";

  //           var i = 0;
  //             // console.log('asdasd',newdata);
  //           decompress(newdata, "dist1").then((files) => {
  //              console.log('asdasxax',files);
  //             if (i == 0) {
  //               for (var j = 0; j < files.length; j++) {
               
  //                 if (files[j].path == "messages/inbox/") {
  //                   const newpath = 'dist1/'+files[j].path;
  //                   const directoryPath = path.join("dist1/messages/inbox/");
  //                    console.log('asdasd',newpath); 
  //                   fs.readdir(directoryPath, function (err, files2) {
  //                     //handling error
  //                     if (err) {
  //                       return console.log("Unable to scan directory: " + err);
  //                     }
  //                     //listing all files using forEach
  //                     files2.forEach(function (file3) {
  //                       const data1 = fs.readFileSync(
  //                         newpath + "/" + file3 + "/" + "message_1.json",
  //                         "utf8"
  //                       );
  //                       const stringify_data = JSON.parse(data1);
  //                       // const stripslahes=stringify_data.replace(new RegExp("\\\\", "g"), "");
  //                       console.log(",stringfiy", stringify_data);

  //                       x +=
  //                         '<div class="data_p2" data-id="' +
  //                         newpath +
  //                         file3 +
  //                         "/" +
  //                         "message_1.json" +
  //                         '"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +
  //                         stringify_data["participants"][0]["name"] +
  //                         "</span></div>";
  //                       document.querySelector(".numbers_data").innerHTML = x;

  //                       // file23.addEventListener("click", function() {
  //                       //         alert('sdfsdf');
  //                       //     },false);

  //                       // var messages = stringify_data["messages"];
  //                       //    var newarr = [];
  //                       // for (var s = 0; s < messages.length; s++) {
  //                       // 	newarr.push({
  //                       // 		content: messages[s].content,
  //                       // 	});
  //                       //   //	console.log("sad", messages[s].content);
  //                       // }

  //                       // Do whatever you want to do with the file
  //                       // console.log('nwew',file3);
  //                     });
  //                   });
  //                 }
  //                 //console.log(files[j]);
  //               }

  //               // console.log(files);
  //             }
  //             i++;

  //             //getting specific messages of messenger
  //             var file23 = document.getElementsByClassName("data_p2");
  //             for (var sj1 = 0; sj1 < file23.length; sj1++) {
  //               //alert(newarr);
  //               file23[sj1].addEventListener(
  //                 "click",
  //                 function () {
  //                   var messagefile = this.getAttribute("data-id");

  //                   const data12 = fs.readFileSync(messagefile, "utf8");

  //                   const stringify_data1 = JSON.parse(data12);

  //                   const participantsname = stringify_data1.participants;
  //                   const displayparticipantsname = participantsname[1].name;
  //                   const newmessages = stringify_data1.messages;
  //                   var saaa = "";
  //                   //console.log('asd',newmessages);
  //                   for (var sss = 0; sss < newmessages.length; sss++) {
  //                     //console.log('asdasd',newmessages[sss].content);
  //                     var newtime = newmessages[sss].timestamp_ms;
  //                     var newchattime = new Date(newtime);
  //                     //console.log('newtime',newchattime);
  //                     if (
  //                       displayparticipantsname == newmessages[sss].sender_name
  //                     ) {
  //                       saaa +=
  //                         '<div class="right_msg"><p>' +
  //                         newmessages[sss].content +
  //                         "</p><span>" +
  //                         newchattime.toLocaleString() +
  //                         "</span></div>";
  //                     } else {
  //                       saaa +=
  //                         '<div class="left_msg"><p>' +
  //                         newmessages[sss].content +
  //                         "</p><span>" +
  //                         newchattime.toLocaleString() +
  //                         "</span></div>";
  //                     }

  //                     document.querySelector(".demo").innerHTML = saaa;
  //                   }
  //                 },
  //                 false
  //               );
  //             }
  //           });
  //         }
  //         // Do not forget to close the file once you're done
  //         zip.close();
  //       });
  //     });

  //     // file.addEventListener("change",function () {
  //     // 		document.querySelector(".demo1").innerHTML = "";
  //     // 		console.log('fsadasd',this.files[0].path);
  //     // 		const zip = new StreamZip({ file: this.files[0].path });
  //     // 		zip.on("ready", () => {
  //     // 			console.log("Entries read: " + zip.entriesCount);
  //     // 			for (const entry of Object.values(zip.entries())) {
  //     // 				const desc = entry.isDirectory ? "directory" : `${entry.size} bytes`;
  //     // 				const data = `${entry.name}`;
  //     // 				//document.querySelector(".demo1").insertAdjacentHTML("beforeend", "<li>" + data + "</li>");
  //     // 				const newdata = this.files[0].path;
  //     // 				const newfile = newdata.substring(0, newdata.lastIndexOf("."));
  //     // 				// console.log(newfile);
  //     // 				var x = "",
  //     // 					j,
  //     // 					y = "";

  //     // 				var i = 0;
  //     // 				decompress(newdata, "dist1").then((files) => {
  //     // 					if (i == 0) {
  //     // 						for (var j = 0; j < files.length; j++) {
  //     // 							if (files[j].path == "messages/inbox/") {
  //     // 								const newpath = files[j].path;
  //     // 								const directoryPath = path.join("messages/inbox/");

  //     // 								fs.readdir(directoryPath, function (err, files2) {
  //     // 									//handling error
  //     // 									if (err) {
  //     // 										return console.log("Unable to scan directory: " + err);
  //     // 									}
  //     // 									//listing all files using forEach
  //     // 									files2.forEach(function (file3) {
  //     // 										const data1 = fs.readFileSync(
  //     // 											newpath + "/" + file3 + "/" + "message_1.json",
  //     // 											"utf8"
  //     // 										);
  //     // 										const stringify_data = JSON.parse(data1);
  //     // 										// const stripslahes=stringify_data.replace(new RegExp("\\\\", "g"), "");
  //     // 										 console.log(',stringfiy',stringify_data);

  //     // 										x +='<div class="data_p2" data-id="' +newpath + file3 + "/" + "message_1.json" +'"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +stringify_data["participants"][0]["name"] +"</span></div>";
  //     // 										document.querySelector(".numbers_data").innerHTML = x;

  //     // 										// file23.addEventListener("click", function() {
  //     // 										//         alert('sdfsdf');
  //     // 										//     },false);

  //     // 										// var messages = stringify_data["messages"];
  //     // 										//    var newarr = [];
  //     // 										// for (var s = 0; s < messages.length; s++) {
  //     // 										// 	newarr.push({
  //     // 										// 		content: messages[s].content,
  //     // 										// 	});
  //     // 										//   //	console.log("sad", messages[s].content);
  //     // 										// }

  //     // 										// Do whatever you want to do with the file
  //     // 										// console.log('nwew',file3);
  //     // 									});
  //     // 								});
  //     // 							}
  //     // 							//console.log(files[j]);
  //     // 						}

  //     // 						// console.log(files);
  //     // 					}
  //     // 					i++;

  //     // 				   //getting specific messages of messenger
  //     // 					var file23=document.getElementsByClassName("data_p2");
  //     // 						for (var sj1 = 0; sj1 < file23.length; sj1++) {
  //     // 							//alert(newarr);
  //     // 									file23[sj1].addEventListener("click", function(){
  //     // 									  var messagefile=this.getAttribute('data-id');

  //     // 									 const data12 = fs.readFileSync(
  //     // 											messagefile,
  //     // 											"utf8"
  //     // 										);

  //     // 										const stringify_data1 = JSON.parse(data12);

  //     // 										const participantsname =stringify_data1.participants;
  //     // 										 const displayparticipantsname=participantsname[1].name;
  //     // 										const newmessages=stringify_data1.messages;
  //     // 										  var saaa="";
  //     // 										//console.log('asd',newmessages);
  //     // 										for(var sss=0;sss<newmessages.length;sss++){
  //     // 											//console.log('asdasd',newmessages[sss].content);
  //     //                                              var newtime=newmessages[sss].timestamp_ms;
  //     //                                              var newchattime= new Date(newtime);
  //     // 											 	 //console.log('newtime',newchattime);
  //     // 											 if(displayparticipantsname==newmessages[sss].sender_name){
  //     // 											  saaa+='<div class="right_msg"><p>'+newmessages[sss].content+'</p><span>'+newchattime.toLocaleString()+'</span></div>';
  //     // 											 }else{
  //     // 											   saaa+='<div class="left_msg"><p>'+newmessages[sss].content+'</p><span>'+newchattime.toLocaleString()+'</span></div>';
  //     // 											 }

  //     // 											document.querySelector(".demo").innerHTML = saaa;
  //     // 										}

  //     // 									}, false);
  //     // 								}

  //     // 				});

  //     // 			}
  //     // 			// Do not forget to close the file once you're done
  //     // 			zip.close();
  //     // 		});

  //     // 	},
  //     // 	false
  //     // );
  //   },
  //   false
  // );


  // document.getElementById("facebook_msg").addEventListener(
  //   "click",
  //   function () {
  //         let win = new BrowserWindow({
  //           width: 1000,
  //         });

  //         win.loadFile('messenger.html');
  //          remote.getCurrentWindow().hide();
  //         },
  //   false
  // ); 
   const facebook_msg = document.getElementById("facebook_msg");
  facebook_msg.addEventListener("click", function () {
    ipcRenderer.send("facebookmsg", "helwosaodsad");
  });
  // call whatsapp in main process
  const whatsapp_line = document.getElementById("open_whatsapp");
  whatsapp_line.addEventListener("click", function () {
    ipcRenderer.send("msg", "helwosaodsad");

    // const win = new BrowserWindow({ width: 800, height: 600, webPreferences: {
    //         nodeIntegration: true,
    //         contextIsolation:false,

    //     }, });
    // win.loadURL('https://book2say.com/whatsapp/');
  });

  //   const whatsapp_back = document.getElementById('back_screen');
  //      whatsapp_back.addEventListener("click", function(){
  // 	//ipcRenderer.send('msg',"helwosaodsad");
  // 	alert('asdsad');
  // });
});

//aatached devices name
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  ipcRenderer.on("devices", (_event, text) => replaceText("devices", text));

//  async function extractTextFromHTML(url) {
//   const { data } = await axios.get(url);
//   const $ = cheerio.load(data);
//   return $('body').text();
// }

//   async function createPDFFromHTML(url) {
//   const text = await extractTextFromHTML(url);

//   // create a new PDF document
//   const doc = new PDFDocument();

//   // pipe the document to a file
//   doc.pipe(fs.createWriteStream('output.pdf'));

//   // add content to the PDF
//   doc.fontSize(15).text(text, {
//     align: 'left',
//   });

//   // finalize the PDF and end the stream
//   doc.end();
// }

function newpdf(){
 
const html = '<h1>Hello World!</h1>';
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('output.pdf'));
//const html = '<h1>Hello World!</h1>';
//const html=document.getElementById("newgeneratedata");
//const $ = cheerio.load(html);
//const text = $.text();
doc.create(html, {
  align: 'center',
  width: 410
});

  // doc.html('<h1>Hello World!</h1>', {
  //   align: 'center',
  //   width: 410
  // });

doc.end();

}
  document.getElementById("newpdfgenereate").addEventListener(
            "click",
            function () {
             // alert("123123");
             // createPDFFromHTML('index.html');
             newpdf();
            },
            false
          );
});
