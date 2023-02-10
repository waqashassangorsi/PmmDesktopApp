const { app, BrowserWindow,dialog,ipcMain,shell } = require('electron')
const fs = require("fs")
const path = require('path');
const usb = require('usb');
var formidable = require('formidable');
const Store = require("electron-store");
const Alert = require("electron-alert");
var FileReader = require('filereader')
const os = require("os");
const { electron } = require('process');
// const ipc=electron.ipcMain;
// const shell=electron.shell;
Store.initRenderer();
let windows = [];

// const directoryPath233 = path.join(__dirname+"/apkfolder/platform-tools/");
// const apkfolder = path.join(__dirname);
//console.log('apkfolder',apkfolder);
//const apkfolder = './tests/';
// var apkname = "";
// fs.readdirSync(apkfolder).filter(function(file) {
//     if(file.indexOf(".apk")>-1){
//         apkname=file;
//     }
// })
  //console.log('apk1',apkname);
// fs.readdir(apkfolder, (err, files) => {
//   for (var si = 0; si < files.length; si++) {	
//       if(files[si].length==1){
//           apkname=files[1];
//       }			
// 	 //console.log('newcomputer',files[1]);
//   }
// //   files.forEach(file => {
// //     console.log('asd',file);
// //   });
// });
 //console.log('asdasd',directoryPath233);
//  const exec = require('child_process').exec;

// function execute(command, callback) {
//     exec(command, (error, stdout, stderr) => { 
//         callback(stdout); 
//     });
// };

// // call the function
// execute('SETX path '+directoryPath233+'', (output) => {
//     //console.log("cmdcommand",output);
// });

// execute('adb install '+apkname+'', (output) => {
//     //console.log("cmdcommand2",'adb install '+apkname+'');
// });
// execute('SETX path "C:/Users/asad/Downloads/platform-tools_r33.0.3-windows/platform-tools"', (output) => {
//     console.log("cmdcommand",output);
// });
 
 


const webusb = new usb.WebUSB({
    allowAllDevices: true
});

const showDevices = async () => {
    const devices = await webusb.getDevices();
    const text = devices.map(d => `${d.productName}`);
    text.unshift('Device Name\n-------------------------------------');

    windows.forEach(win => {
        if (win) {
            win.webContents.send('devices', text.join('\n'));
        }
    });
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
   // autoHideMenuBar: true,
    icon: 'images/newicon2.png' ,
     webPreferences: {
            //preload: path.join(__dirname, 'zip.js')
            preload: path.join(__dirname, 'zip2.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
             devTools: true
           // preload: path.join(__dirname, 'preload.js'),
            
        },
        
  })
    require("@electron/remote/main").initialize();
    require("@electron/remote/main").enable(win.webContents);
  win.loadFile('index.html')
    //win.loadFile('licensekeydata.html')
   windows.push(win);
    showDevices();
   
        // get whatsapp proceess from zip2.js
        ipcMain.on("msg",(event,data)=>{
            win.hide();  // close previous window
            const win1 = new BrowserWindow({ width: 800, height: 600, webPreferences: {
                    nodeIntegration: true,
                    contextIsolation:false,
                    webviewTag: true,
                    preload: path.join(__dirname, 'whatsapp.js'),
                }, })
                require("@electron/remote/main").enable(win1.webContents);
                 win1.loadFile('whatsapp.html')
                

                ipcMain.on("msgnew",(event,data)=>{
                win.show();  
                    win1.hide();
                });

           // win1.loadURL('https://book2say.com/whatsapp/');
        });

     

        ipcMain.on("facebookmsg",(event,data)=>{
           // win.hide();  // close previous window
            const win2 = new BrowserWindow({ width: 800, height: 600, webPreferences: {
                    nodeIntegration: true,
                    contextIsolation:false,
                    webviewTag: true,
                    preload: path.join(__dirname, 'messenger.js'),
                }, })
               // require("@electron/remote/main").enable(win1.webContents);
                 win2.loadFile('messenger.html')
                

                ipcMain.on("facebookmsgnew",(event,data)=>{
                    win.show();  
                    win2.hide();
                });

           // win1.loadURL('https://book2say.com/whatsapp/');
        });
     

        ipcMain.on("iphonemsg",(event,data)=>{
           // win.hide();  // close previous window
            const win3 = new BrowserWindow({ width: 800, height: 600, webPreferences: {
                    nodeIntegration: true,
                    contextIsolation:false,
                    webviewTag: true,
                    preload: path.join(__dirname, 'iphonemessage.js'),
                }, })
               // require("@electron/remote/main").enable(win1.webContents);
                 win3.loadFile('iphonemessage.html')
                

                // ipcMain.on("facebookmsgnew",(event,data)=>{
                //     win.show();  
                //     win2.hide();
                // });

           // win1.loadURL('https://book2say.com/whatsapp/');
        });

        ipcMain.on("iphonewhatsapp",(event,data)=>{
           // win.hide();  // close previous window
            const win3 = new BrowserWindow({ width: 800, height: 600, webPreferences: {
                    nodeIntegration: true,
                    contextIsolation:false,
                    webviewTag: true,
                    preload: path.join(__dirname, 'iphonewhatsapp.js'),
                }, })
               // require("@electron/remote/main").enable(win1.webContents);
                 win3.loadFile('iphonewhatsapp.html')
                

                // ipcMain.on("facebookmsgnew",(event,data)=>{
                //     win.show();  
                //     win2.hide();
                // });

           // win1.loadURL('https://book2say.com/whatsapp/');
        });

            ipcMain.on("licensekeydata",(event,data)=>{
            const win4 = new BrowserWindow({ width: 800, height: 600, webPreferences: {
                    nodeIntegration: true,
                    contextIsolation:false,
                    webviewTag: true,
                    preload: path.join(__dirname, 'licensekeydata.js'),
                }, })
                 win4.loadFile('licensekeydata.html')

                  ipcMain.on("msgnew2",(event,data)=>{
                      win4.hide();  
              });
        });

          ipcMain.on("print-to-pdf",(event,data)=>{
            const pdfPath=path.join(os.tmpdir(), 'some-ducking-pdf.pdf');
            const win=BrowserWindow.fromWebContents(event.sender);
              // console.log('newpath',pdfPath);
            win.webContents.printToPDF({}, (error,data)=>{
                if(error) return console.log(error.message);

                fs.writeFile(pdfPath, data,err=>{
                   if(err) return console.log(err.message);
                   shell.openExternal('file://' + pdfPath);
                   event.sender.send('wrote-pdf',pdfPath);
                });
            });
            // const win3 = new BrowserWindow({ width: 800, height: 600, webPreferences: {
            //         nodeIntegration: true,
            //         contextIsolation:false,
            //         webviewTag: true,
            //         preload: path.join(__dirname, 'iphonewhatsapp.js'),
            //     }, })
            //      win3.loadFile('iphonewhatsapp.html')
        });
     
     
         ipcMain.on("msg2",(event,data)=>{
//          //   win.hide();  // close previous window
             dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }).then(result => {
                console.log(result.canceled)
                console.log(result.filePaths)
                event.reply('filelink',result.filePaths)
                }).catch(err => {
                console.log(err)
                })

    //   let alert = new Alert();

    //     let swalOptions = {
    //        title: 'Select image',
    //         input: 'file',
    //         showCancelButton: true,
    //         inputAttributes: {
    //             id: "txt-note",
    //             'accept': '*',
    //             'aria-label': 'Upload your file',
    //         }
            
    //     };
    //      alert.fireWithFrame(swalOptions,null, null, false);
      
        win.webContents.executeJavaScript(`
        jQuery.noConflict();
          document.getElementById("exampleModal").modal("show");
      `)
     //document.getElementById("exampleModal").modal("show");
                
      });

}


app.whenReady().then(() => {
    webusb.addEventListener('connect', showDevices);
    webusb.addEventListener('disconnect', showDevices);
  createWindow()
   app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
   
 

})

app.on('window-all-closed', () => {
    webusb.removeEventListener('connect', showDevices);
    webusb.removeEventListener('disconnect', showDevices);
    app.quit();
});




//  const arrayOfFiles = fs.readdirSync("C:/Users/asad/Desktop/DesktopAppFerreci")
//   console.log(arrayOfFiles)

