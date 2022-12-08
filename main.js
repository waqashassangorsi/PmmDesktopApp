const { app, BrowserWindow,dialog,ipcMain } = require('electron')
const fs = require("fs")
const path = require('path');
const usb = require('usb');
var formidable = require('formidable');
const Store = require("electron-store");
const Alert = require("electron-alert");
var FileReader = require('filereader')
Store.initRenderer();
let windows = [];

 
 


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
    icon: 'images/firecci.png' ,
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

