const  { ipcRenderer}  = require("electron");
window.addEventListener("DOMContentLoaded", () => {
	  const whatsapp_back = document.getElementById('back_screen');
         whatsapp_back.addEventListener("click", function(){
			ipcRenderer.send('msgnew',"helwosaodsad");
	
	});
});

 
