const StreamZip = require("node-stream-zip");
const decompress = require("decompress");
const path = require("path");
const { ipcRenderer } = require("electron");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const os = require("os");
const Store = require("electron-store");
const cheerio = require('cheerio');
const PDFDocument = require('pdfkit');
window.addEventListener("DOMContentLoaded", () => {
      document.querySelector(".numbers_data2").innerHTML = "";
    document.getElementById("upload").style.display = "none";
    iphonewhatsappmsg();
 var newrecord = "";
       function iphonewhatsappmsg() {
    const computerName = os.userInfo().homedir;

    //const db = new sqlite3.Database("Manifest.db");
    var link = computerName.replaceAll("\\", "/");
    const computerpath1 =link + "/AppData/Roaming/Apple Computer/MobileSync/Backup/";
    const computerpath2 = link + "/Apple/MobileSync/Backup/";
    var pathdata = "";
    var path2 = "";
    var computernew = "";
    fs.readdir(computerpath1, function (err, files21) {
      //   console.log(files21.length);
      //   console.log(files21);
      //handling error
      if (files21.length == 1) {
        //	return console.log("Unable to scan directory: " + err);
        fs.readdir(computerpath2, function (err, files211) {
          //handling error
          if (err) {
            alert("No backup found.Please backup your iphone using itunes");
          } else {
            for (var s = 0; s < files211.length; s++) {
              console.log('newpath1123',files21[i]);
              if (files211[s].length == 40) {
                pathdata = computerpath2 + files211[s] + "/" + "Manifest.db";
                computernew = computerpath2;
                path2 = files211[s];
                console.log("computerpath2", computerpath2);
                retriveiphonewhatssappmsg(pathdata, path2, computernew);
                break;
                //console.log(pathdata);
              }
            }
          }
        });
      } else {
        for (var i = 0; i < files21.length; i++) {
          //console.log('newpath1',files21[i]);
            console.log('newpath1123',files21[i]);
          if (files21[i].length == 40) {
            pathdata = computerpath1 + files21[i] + "/" + "7c/7c7fba66680ef796b916b067077cc246adacf01d";
            console.log(pathdata);
            path2 = files21[i];
            computernew = computerpath1;
            //console.log(pathdata);
            console.log("computerpath1", computerpath1);
            retriveiphonewhatssappmsg(pathdata, path2, computernew);
            break;
          }
        }
      }
    });
  }
   
    function retriveiphonewhatssappmsg(pathdata, path2, computernew) {
    console.log('pathdata',pathdata);
     console.log('path2',path2);
      console.log('computernew',computernew);
    const computerName = os.userInfo().homedir;
    var link = computerName.replaceAll("\\", "/");
    const db = new sqlite3.Database(pathdata);
    //const query = "SELECT * FROM Files where relativePath='Library/SMS/sms.db'";
     console.log('db',db);
    const store = new Store();
   

    //getting second database file
    const newfile =
      computernew +
      path2 +
      "/7c/7c7fba66680ef796b916b067077cc246adacf01d";

    console.log("second db complete path", newfile);
    const newdb = new sqlite3.Database(newfile);

    const query1 = "SELECT * FROM ZWACHATSESSION";
    //console.log(query1);
    newdb.serialize(() => {
      newdb.all(query1, (err, row) => {
        if (err) {
          console.error("====>", err.message);
        }
        store.set("row23", row);
        // newdb.close();
      });
    });
    const data2 = store.get("row23");
    console.log("data2", data2.length);
    for (var sj = 0; sj < data2.length; sj++) {
        console.log('newrecord',data2);
      newrecord +=
        '<div class="data_p212" data-id="' +
        data2[sj].Z_PK+
        '"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +
        data2[sj].ZPARTNERNAME +
        "</span></div>";
      document.querySelector(".numbers_data2").innerHTML = newrecord;
      console.log('sad',data2[sj].ZPARTNERNAME);
    }

    var elements = document.getElementsByClassName("data_p212");

    var myFunctionnew = function () {
      newy = "";

      var attr = this.getAttribute("data-id");
      const query2 = "SELECT * FROM ZWAMESSAGE where Z_OPT=" + attr + "";
      //console.log(query2);
      newdb.serialize(() => {
        newdb.all(query2, (err, row) => {
          // store.delete('row3');
          if (err) {
            console.error("====>", err.message);
          }
          store.set("row33", row);
          // newdb.close();
        });
      });
      const data3 = store.get("row33");
      //console.log('strigifiy',JSON.stringify(data3))
      for (var sj1 = 0; sj1 < data3.length; sj1++) {
       // var date = data3[sj1].date / 1000;
       // var newdate = Date("Y-m-d H:i:s", date);
       // var dateString = new Date(newdate).toDateString();
        //var newdate=new Date(data3[sj1].date);
         var newdate = Date("Y-m-d H:i:s");
       // if (data3[sj1].is_from_me != 0) {
          newy +=
            '<div class="right_msg"><p>' +
            data3[sj1].ZTEXT +
            "</p><span>" +
            newdate +
            "</span> <span>11:04</span></div>";
       // } else {
          newy +=
            '<div class="left_msg"><p>' +
            data3[sj1].ZTEXT +
            "</p><span>" +
            newdate +
            "</span> <span>11:04</span></div>";
       // }
      }
      document.querySelector(".demo").innerHTML = newy;
      document.getElementById("padfcontent").innerHTML=newy;
      var newhtml= document.getElementById("padfcontent");
      const imagePath = path.join(__dirname, 'images/newpmm.png');

      const pElements = newhtml.getElementsByTagName('p');
      //console.log('parentElement',pElements.parentNode.className)
      const padding = 100;
       const padding2 = 10;
const doc = new PDFDocument();
        let pText = '';
        let j=0;
        for (let i = 0; i < pElements.length; i++) {
          pText +='\n'+pElements[i].textContent + '\n';
         // doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
          j++;
        }
      
       

        doc.pipe(fs.createWriteStream('output2.pdf'));
        const html = pText;
        // const html=newy;

        const $ = cheerio.load(html);
        
        const text = $.text();
         console.log('sad',text);
         
        doc.fillColor('black').text(text);


        // Set the watermark image path
//doc.addPage();

// Set the image position and size
  var x = doc.page.width / 2-120;
 // var y = doc.page.height / 2;
 var y = doc.page.margins.top;
  var width = 500;
  var height = 300;
doc.rotate(20);
//doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
console.log("doc.page.length",doc.page.document._pageBufferStart)

        doc.end(); 

for (var s = 1; s <= doc.page.document._pageBufferStart; s++) {
   // doc.switchToPage(s);
  // doc.image(image, doc.page.width / 2, doc.page.height / 2, { align: 'center', width: 200 });
   doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
}
    };

    for (var si = 0; si < elements.length; si++) {
      elements[si].addEventListener("click", myFunctionnew, false);
    }

    const query3 = "SELECT * FROM ZWAMESSAGE";

    // console.log(query3);
    newdb.serialize(() => {
      newdb.all(query3, (err, row) => {
        // store.delete('row3');
        if (err) {
          console.error("====>", err.message);
        }
        store.set("row4", row);
        // newdb.close();
      });
    });
    const data4 = store.get("row4");
    // console.log("data4", data4);
    var arr = [];
    for (var sj12 = 0; sj12 < data4.length; sj12++) {
      arr.push({
        date: data4[sj12].date,
        type: data4[sj12].is_from_me,
        address: "asdasd",
        body: data4[sj12].text,
        newdate: data4[sj12].date,
      });
      // arr['date']=data4[sj12].date;
      // arr['type']=data4[sj12].is_from_me;
      // arr['address']='asdasd';
      // arr['body']=data4[sj12].text;
      // arr['newdate']=data4[sj12].date;
    }
    var jsondata = JSON.stringify(arr);
    document.querySelector(".jsondata").value = jsondata;
    console.log("json", jsondata);
    //     console.log('check',pathdata);
  }

});