const StreamZip = require('node-stream-zip');
const electron = require('electron');
const decompress = require('decompress');
const fs = require("fs");
const path = require('path');
window.addEventListener('DOMContentLoaded', () => {
     var file = document.getElementById("upload");
      file.addEventListener("change", function() {
          document.querySelector(".demo1").innerHTML='';
         console.log(this.files[0].path);
const zip = new StreamZip({ file: this.files[0].path});
zip.on('ready', () => {
    console.log('Entries read: ' + zip.entriesCount);
    for (const entry of Object.values(zip.entries())) {
        const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
        const data=`${entry.name}`;
        document.querySelector(".demo1").insertAdjacentHTML('beforeend',"<li>"+data+"</li>");
         const newdata=this.files[0].path;
         const newfile= newdata.substring(0, newdata.lastIndexOf('.'));
        // console.log(newfile);
        var x ="",j;
        var  i=0;
       decompress(newdata, 'dist1').then(files => {
           if(i==0){
           for (var j = 0; j < files.length; j++) {
               if(files[j].path=="messages/inbox/"){
                  const newpath=files[j].path;
                const directoryPath = path.join('messages/inbox/');

                fs.readdir(directoryPath, function (err, files2) {
                    //handling error
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    } 
                    //listing all files using forEach
                    files2.forEach(function (file3) {
                        const data1 = fs.readFileSync(newpath+'/'+file3+'/'+'message_1.json', 'utf8');
                         const stringify_data=JSON.parse(data1);
                       // const stripslahes=stringify_data.replace(new RegExp("\\\\", "g"), "");
                         // console.log(stringify_data['participants'][0]['name']);

                        x+='<div class="data_p2"><img class="msg_img" src="images/person_new.png"><span class="messages_export phone_number">'+stringify_data['participants'][0]['name']+'</span></div>';
                        document.querySelector(".numbers_data").innerHTML = x;

                          var messages=stringify_data['messages'];
                           for (var s = 0; s < messages.length; s++) {
                                console.log('sad',messages[s].content);
                           }
                        
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
        });
        //const data1 = fs.readFileSync(newfile+'/messages/inbox/amirsohail_xeg78ezmeg/message_1.json', 'utf8');
// const data1 = fs.readFileSync('C:/Users/asad/Downloads/facebook-100083403366483/messages/inbox/amirsohail_xeg78ezmeg/message_1.json', 'utf8');
  //console.log(data1);
        //document.getElementById("demo1").innerHTML=zip.entriesCount;  
        //console.log(`Entry ${entry.name}: ${desc}`);
    }
    // Do not forget to close the file once you're done
    zip.close();
  });
 }, false);
});