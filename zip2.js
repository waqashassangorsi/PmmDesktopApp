const StreamZip = require("node-stream-zip");
const { ipcRenderer, remote } = require("electron");
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
const cheerio = require("cheerio");
const PDFDocument = require("pdfkit");
const { output } = require("pdfkit");
// const Alert = require("electron-alert");
// window.$ = window.jQuery = require('jquery');
window.addEventListener("DOMContentLoaded", () => {
  const src = path.join(__dirname, "apkfolder");
  const newsrc = __dirname;
  const dest = path.join(__dirname, "../dest");
  const newdest = path.join(__dirname, "../");
  const newfiledr = path.join(__dirname, "../");
  const newfiledrnew = path.join(__dirname, "../dest");
  console.log("newpath", newfiledr);
  console.log("oldpath", __dirname);

  fs.readdirSync(__dirname).filter(function (file) {
    console.log("projectfolderallfiles", file);
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

  fs.readdirSync(newfiledr).filter(function (file) {
    console.log("onepreviousprojectfolder", file);
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
  const exec = require("child_process").exec;
  function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
      callback(stdout);
    });
  }

  function downloadapk() {
    const directoryPath233 = path.join(__dirname, "../dest/platform-tools");
    console.log("abdfolder", directoryPath233);
    // const apkfolder = path.join(__dirname);
    //const apkfolder =("C:/Users/asad/Desktop/PmmDesktopApp");
    const apkfolder = path.join(__dirname, "../");
    console.log("apkfolder", apkfolder);
    var apkname = "";
    fs.readdirSync(apkfolder).filter(function (file) {
      if (file.indexOf(".apk") > -1) {
        apkname = file;
      }
    });
    // call the function

    try {
      // execute('cd../', (output) => {

      // execute("SETX path " + directoryPath233 + "", (output) => {
      //   console.log("cmdcommand1", output);
      // });

      execute("adb install app-release.apk", (output, err) => {
        console.log("cmdcommand2APK", apknoutputame, err);
      });

      execute("adb version", (output) => {
        console.log("myadbversion", output);
        var newresponse = output.includes("Android");
      });

      //});
    } catch (error) {
      alert(error);
    }
  }

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

  function newpdf() {
    const html = "<h1>Hello World!</h1>";
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("output.pdf"));
    //const html = '<h1>Hello World!</h1>';
    //const html=document.getElementById("newgeneratedata");
    //const $ = cheerio.load(html);
    //const text = $.text();
    doc.create(html, {
      align: "center",
      width: 410,
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
