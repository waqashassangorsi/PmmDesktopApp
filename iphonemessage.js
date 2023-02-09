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
const htmlPdf = require('html-pdf');
//const $=require('jquery');
window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".numbers_data").innerHTML = "";
    document.getElementById("upload").style.display = "none";
     checkfiles();
    
      var newrecord = "";
    function checkfiles() {
    const computerName = os.userInfo().homedir;

    //const db = new sqlite3.Database("Manifest.db");
    var link = computerName.replaceAll("\\", "/");
    const computerpath1 =
      link + "/AppData/Roaming/Apple Computer/MobileSync/Backup/";
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
              //console.log('newpath1',files21[i]);
              if (files211[s].length == 40) {
                pathdata = computerpath2 + files211[s] + "/" + "Manifest.db";
                computernew = computerpath2;
                path2 = files211[s];
                console.log("computerpath2", computerpath2);
                retriveiphonemsg(pathdata, path2, computernew);
                break;
                //console.log(pathdata);
              }
            }
          }
        });
      } else {
        for (var i = 0; i < files21.length; i++) {
          //console.log('newpath1',files21[i]);
          if (files21[i].length == 40) {
            pathdata = computerpath1 + files21[i] + "/" + "Manifest.db";
            console.log(pathdata);
            path2 = files21[i];
            computernew = computerpath1;
            //console.log(pathdata);
            console.log("computerpath1", computerpath1);
            retriveiphonemsg(pathdata, path2, computernew);
            break;
          }
        }
      }
    });
  }

  function retriveiphonemsg(pathdata, path2, computernew) {
    //console.log('path2',path2);
    const computerName = os.userInfo().homedir;
    var link = computerName.replaceAll("\\", "/");
    const db = new sqlite3.Database(pathdata);
    const query = "SELECT * FROM Files where relativePath='Library/SMS/sms.db'";
    // console.log(query);
    const store = new Store();
    //store.delete('row');
    db.serialize(() => {
      db.all(query, (err, row) => {
        if (err) {
          console.error("====>", err.message);
        }
        store.set("row", row);
        db.close();
      });
    });
    const data = store.get("row");
    const retrivedata = data[0].fileID;
    const newsubstring = retrivedata.substring(0, 2);
    // console.log(data);

    //getting second database file
    const newfile =
      computernew +
      path2 +
      "/" +
      newsubstring +
      "/3d0d7e5fb2ce288813306e4d4636395e047a3d28";

    console.log("second db complete path", newfile);
    const newdb = new sqlite3.Database(newfile);

    const query1 = "SELECT * FROM chat";
    //console.log(query1);
    newdb.serialize(() => {
      newdb.all(query1, (err, row) => {
        if (err) {
          console.error("====>", err.message);
        }
        store.set("row2", row);
        // newdb.close();
      });
    });
    const data2 = store.get("row2");
    //console.log("data2", data2);
    for (var sj = 0; sj < data2.length; sj++) {
      newrecord +=
        '<div class="data_p21" data-id="' +
        data2[sj].ROWID +
        '"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +
        data2[sj].chat_identifier +
        "</span></div>";
      document.querySelector(".numbers_data").innerHTML = newrecord;
      //console.log('sad',data2[sj].chat_identifier);
    }

    var elements = document.getElementsByClassName("data_p21");

    var myFunction = function () {
      newy = "";

      var attr = this.getAttribute("data-id");
      const query2 = "SELECT * FROM message where handle_id=" + attr + "";
      //console.log(query2);
      newdb.serialize(() => {
        newdb.all(query2, (err, row) => {
          // store.delete('row3');
          if (err) {
            console.error("====>", err.message);
          }
          store.set("row3", row);
          // newdb.close();
        });
      });
      const data3 = store.get("row3");
      //console.log('strigifiy',JSON.stringify(data3))
      for (var sj1 = 0; sj1 < data3.length; sj1++) {
        var date = data3[sj1].date / 1000;
        var newdate = Date("Y-m-d H:i:s", date);
        var dateString = new Date(newdate).toDateString();
        //var newdate=new Date(data3[sj1].date);
        if (data3[sj1].is_from_me != 0) {
          newy +=
            '<div class="right_msg"><p>' +
            data3[sj1].text +
            "</p><span>" +
            newdate +
            "</span> <span>11:04</span></div>";
        } else {
          newy +=
            '<div class="left_msg"><p>' +
            data3[sj1].text +
            "</p><span>" +
            newdate +
            "</span> <span>11:04</span></div>";
        }
      }
      document.querySelector(".demo").innerHTML = newy;
      document.getElementById("padfcontent").innerHTML=newy;
      var newhtml= document.getElementById("padfcontent");
      const imagePath = path.join(__dirname, 'images/newpmm.png');
            
      function getParentClassName(childNode){
        return childNode.parentNode.className;
      }
      console.log(getParentClassName(newhtml.getElementsByTagName('p')[0]));

      const pElements = newhtml.getElementsByTagName('p');
      //console.log('parentElement',pElements.parentNode.className)
      const padding = 100;
       const padding2 = 10;
const doc = new PDFDocument();
        let pText = '';
        let j=0;
        for (let i = 0; i < pElements.length; i++) {
          pText +='<body><h1 style="padding-left:30px">This is a Heading</h1></body>';
         // doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
          j++;
        }
      
      
        doc.pipe(fs.createWriteStream('output.pdf'));
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
doc.image(imagePath, x, y, {width: width, height: height, opacity: 0.75});
console.log("doc.page.length",doc.page.document._pageBufferStart)

doc.end(); 

    };

    for (var si = 0; si < elements.length; si++) {
      elements[si].addEventListener("click", myFunction, false);
    }

    const query3 = "SELECT * FROM message";

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
      
      document.getElementById("newpdfgenereate").addEventListener(
            "click",
            function () {
               var datanew= document.querySelector(".jsondata").value;
              //  var newhtml=document.getElementById("padfcontent").innerHTML;
              //   const datanew = newhtml.getElementsByTagName('p');
              // var datanew=  document.getElementById("padfcontent").innerHTML;
             //  var datanew1="hamza";

                 var request = new XMLHttpRequest();
    
                  // Instantiating the request object
                  request.open("POST", "http://messagewebsite.book2say.com/wp-json/whatsapp_template/v1/updatedpdf_api");
                  
                  // Defining event listener for readystatechange event
                  request.onreadystatechange = function() {
                      // Check if the request is compete and was successful
                     
                          // Inserting the response from server into an HTML element
                         // document.getElementById("result").innerHTML = this.responseText;
                      
                  };
                  
                  // Retrieving the form data
                  // var myForm = document.getElementById("myForm");
                  // var formData = new FormData(myForm);

                  // Sending the request to the server
                  request.send(JSON.stringify(datanew));
              // alert(datanew);
                  // $.ajax({
                  //     url:'http://messagewebsite.book2say.com/wp-json/whatsapp_template/v1/pdf_api',
                  //     type:'post',
                  //     data:{text:datanew},
                  //     dataType:'json',
                  //     success:function(html){
                            
                  //     }
                  // });
             // alert("123123");
             // createPDFFromHTML('index.html');
            },
            false
          );
  //     $('.export_pdf').click(function(){
  //      alert('123');
  //  });
});