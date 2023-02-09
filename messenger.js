const StreamZip = require("node-stream-zip");
const decompress = require("decompress");
const path = require("path");
const { ipcRenderer } = require("electron");
const fs = require("fs");
window.addEventListener("DOMContentLoaded", () => {

  // const whatsapp_back = document.getElementById('back_screen');
  //        whatsapp_back.addEventListener("click", function(){
	// 		ipcRenderer.send('facebookmsgnew',"helwosaodsad");
	
	// });

    document.getElementById("facebook_msg1").addEventListener(
    "click",
    function () {
      document.querySelector(".numbers_data").innerHTML = "";
      //document.getElementById("upload2").style.display = "block";
      // ipcRenderer.send('msg2',"helwosaodsad");
      var file = document.getElementById("upload2");
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
              // console.log('asdasd',newdata);
            decompress(newdata, "dist1").then((files) => {
               console.log('asdasxax',files);
              if (i == 0) {
                for (var j = 0; j < files.length; j++) {
               
                  if (files[j].path == "messages/inbox/") {
                    const newpath = 'dist1/'+files[j].path;
                    const directoryPath = path.join("dist1/messages/inbox/");
                     console.log('asdasd',newpath); 
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

    },
    false
  ); 

});