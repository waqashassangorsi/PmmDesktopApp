const StreamZip = require("node-stream-zip");
const { ipcRenderer } = require("electron");
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
// const Alert = require("electron-alert");
// window.$ = window.jQuery = require('jquery');
window.addEventListener("DOMContentLoaded", () => {
  // promise.then((result) => {
  // 	if (result.value) {
  // 		// confirmed
  // 	} else if (result.dismiss === Alert.DismissReason.cancel) {
  // 		// canceled
  // 	}
  // })
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
  // console.log("pathnew", checkfiles());

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

  // function get_db() {

  // }

  document.getElementById("text_messages").addEventListener(
    "click",
    function () {
      document.querySelector(".numbers_data").innerHTML = "";
      document.getElementById("upload").style.display = "none";
      //get_db();
      checkfiles();
    },
    false
  );
  // const computerName = os.userInfo().homedir;
  // console.log('computername',computerName);

  //messenger code

  document.getElementById("facebook_msg").addEventListener(
    "click",
    function () {
      document.querySelector(".numbers_data").innerHTML = "";
      document.getElementById("upload").style.display = "block";
      // ipcRenderer.send('msg2',"helwosaodsad");
      var file = document.getElementById("upload");
      //var file = document.getElementById("txt-note");
      ipcRenderer.send("msg2", "helwosaodsad");

      ipcRenderer.on("filelink", (event, data1) => {
        document.querySelector(".demo1").innerHTML = "";
        console.log("filelink", data1);
        const zip = new StreamZip({ file: data1[0] });

        zip.on("ready", () => {
          console.log("Entries read: " + zip.entriesCount);
          for (const entry of Object.values(zip.entries())) {
            const desc = entry.isDirectory
              ? "directory"
              : `${entry.size} bytes`;
            const data = `${entry.name}`;
            //document.querySelector(".demo1").insertAdjacentHTML("beforeend", "<li>" + data + "</li>");
            const newdata = data1[0];
            const newfile = newdata.substring(0, newdata.lastIndexOf("."));
            // console.log(newfile);
            var x = "",
              j,
              y = "";

            var i = 0;
            decompress(newdata, "dist1").then((files) => {
              if (i == 0) {
                for (var j = 0; j < files.length; j++) {
                  if (files[j].path == "messages/inbox/") {
                    const newpath = files[j].path;
                    const directoryPath = path.join("messages/inbox/");

                    fs.readdir(directoryPath, function (err, files2) {
                      //handling error
                      if (err) {
                        return console.log("Unable to scan directory: " + err);
                      }
                      //listing all files using forEach
                      files2.forEach(function (file3) {
                        const data1 = fs.readFileSync(
                          newpath + "/" + file3 + "/" + "message_1.json",
                          "utf8"
                        );
                        const stringify_data = JSON.parse(data1);
                        // const stripslahes=stringify_data.replace(new RegExp("\\\\", "g"), "");
                        console.log(",stringfiy", stringify_data);

                        x +=
                          '<div class="data_p2" data-id="' +
                          newpath +
                          file3 +
                          "/" +
                          "message_1.json" +
                          '"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +
                          stringify_data["participants"][0]["name"] +
                          "</span></div>";
                        document.querySelector(".numbers_data").innerHTML = x;

                        // file23.addEventListener("click", function() {
                        //         alert('sdfsdf');
                        //     },false);

                        // var messages = stringify_data["messages"];
                        //    var newarr = [];
                        // for (var s = 0; s < messages.length; s++) {
                        // 	newarr.push({
                        // 		content: messages[s].content,
                        // 	});
                        //   //	console.log("sad", messages[s].content);
                        // }

                        // Do whatever you want to do with the file
                        // console.log('nwew',file3);
                      });
                    });
                  }
                  //console.log(files[j]);
                }

                // console.log(files);
              }
              i++;

              //getting specific messages of messenger
              var file23 = document.getElementsByClassName("data_p2");
              for (var sj1 = 0; sj1 < file23.length; sj1++) {
                //alert(newarr);
                file23[sj1].addEventListener(
                  "click",
                  function () {
                    var messagefile = this.getAttribute("data-id");

                    const data12 = fs.readFileSync(messagefile, "utf8");

                    const stringify_data1 = JSON.parse(data12);

                    const participantsname = stringify_data1.participants;
                    const displayparticipantsname = participantsname[1].name;
                    const newmessages = stringify_data1.messages;
                    var saaa = "";
                    //console.log('asd',newmessages);
                    for (var sss = 0; sss < newmessages.length; sss++) {
                      //console.log('asdasd',newmessages[sss].content);
                      var newtime = newmessages[sss].timestamp_ms;
                      var newchattime = new Date(newtime);
                      //console.log('newtime',newchattime);
                      if (
                        displayparticipantsname == newmessages[sss].sender_name
                      ) {
                        saaa +=
                          '<div class="right_msg"><p>' +
                          newmessages[sss].content +
                          "</p><span>" +
                          newchattime.toLocaleString() +
                          "</span></div>";
                      } else {
                        saaa +=
                          '<div class="left_msg"><p>' +
                          newmessages[sss].content +
                          "</p><span>" +
                          newchattime.toLocaleString() +
                          "</span></div>";
                      }

                      document.querySelector(".demo").innerHTML = saaa;
                    }
                  },
                  false
                );
              }
            });
          }
          // Do not forget to close the file once you're done
          zip.close();
        });
      });

      // file.addEventListener("change",function () {
      // 		document.querySelector(".demo1").innerHTML = "";
      // 		console.log('fsadasd',this.files[0].path);
      // 		const zip = new StreamZip({ file: this.files[0].path });
      // 		zip.on("ready", () => {
      // 			console.log("Entries read: " + zip.entriesCount);
      // 			for (const entry of Object.values(zip.entries())) {
      // 				const desc = entry.isDirectory ? "directory" : `${entry.size} bytes`;
      // 				const data = `${entry.name}`;
      // 				//document.querySelector(".demo1").insertAdjacentHTML("beforeend", "<li>" + data + "</li>");
      // 				const newdata = this.files[0].path;
      // 				const newfile = newdata.substring(0, newdata.lastIndexOf("."));
      // 				// console.log(newfile);
      // 				var x = "",
      // 					j,
      // 					y = "";

      // 				var i = 0;
      // 				decompress(newdata, "dist1").then((files) => {
      // 					if (i == 0) {
      // 						for (var j = 0; j < files.length; j++) {
      // 							if (files[j].path == "messages/inbox/") {
      // 								const newpath = files[j].path;
      // 								const directoryPath = path.join("messages/inbox/");

      // 								fs.readdir(directoryPath, function (err, files2) {
      // 									//handling error
      // 									if (err) {
      // 										return console.log("Unable to scan directory: " + err);
      // 									}
      // 									//listing all files using forEach
      // 									files2.forEach(function (file3) {
      // 										const data1 = fs.readFileSync(
      // 											newpath + "/" + file3 + "/" + "message_1.json",
      // 											"utf8"
      // 										);
      // 										const stringify_data = JSON.parse(data1);
      // 										// const stripslahes=stringify_data.replace(new RegExp("\\\\", "g"), "");
      // 										 console.log(',stringfiy',stringify_data);

      // 										x +='<div class="data_p2" data-id="' +newpath + file3 + "/" + "message_1.json" +'"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">' +stringify_data["participants"][0]["name"] +"</span></div>";
      // 										document.querySelector(".numbers_data").innerHTML = x;

      // 										// file23.addEventListener("click", function() {
      // 										//         alert('sdfsdf');
      // 										//     },false);

      // 										// var messages = stringify_data["messages"];
      // 										//    var newarr = [];
      // 										// for (var s = 0; s < messages.length; s++) {
      // 										// 	newarr.push({
      // 										// 		content: messages[s].content,
      // 										// 	});
      // 										//   //	console.log("sad", messages[s].content);
      // 										// }

      // 										// Do whatever you want to do with the file
      // 										// console.log('nwew',file3);
      // 									});
      // 								});
      // 							}
      // 							//console.log(files[j]);
      // 						}

      // 						// console.log(files);
      // 					}
      // 					i++;

      // 				   //getting specific messages of messenger
      // 					var file23=document.getElementsByClassName("data_p2");
      // 						for (var sj1 = 0; sj1 < file23.length; sj1++) {
      // 							//alert(newarr);
      // 									file23[sj1].addEventListener("click", function(){
      // 									  var messagefile=this.getAttribute('data-id');

      // 									 const data12 = fs.readFileSync(
      // 											messagefile,
      // 											"utf8"
      // 										);

      // 										const stringify_data1 = JSON.parse(data12);

      // 										const participantsname =stringify_data1.participants;
      // 										 const displayparticipantsname=participantsname[1].name;
      // 										const newmessages=stringify_data1.messages;
      // 										  var saaa="";
      // 										//console.log('asd',newmessages);
      // 										for(var sss=0;sss<newmessages.length;sss++){
      // 											//console.log('asdasd',newmessages[sss].content);
      //                                              var newtime=newmessages[sss].timestamp_ms;
      //                                              var newchattime= new Date(newtime);
      // 											 	 //console.log('newtime',newchattime);
      // 											 if(displayparticipantsname==newmessages[sss].sender_name){
      // 											  saaa+='<div class="right_msg"><p>'+newmessages[sss].content+'</p><span>'+newchattime.toLocaleString()+'</span></div>';
      // 											 }else{
      // 											   saaa+='<div class="left_msg"><p>'+newmessages[sss].content+'</p><span>'+newchattime.toLocaleString()+'</span></div>';
      // 											 }

      // 											document.querySelector(".demo").innerHTML = saaa;
      // 										}

      // 									}, false);
      // 								}

      // 				});

      // 			}
      // 			// Do not forget to close the file once you're done
      // 			zip.close();
      // 		});

      // 	},
      // 	false
      // );
    },
    false
  );

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
});
