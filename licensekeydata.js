const  { ipcRenderer}  = require("electron");
const Store = require("electron-store");
window.addEventListener("DOMContentLoaded", () => {
  const store = new Store();
   
         document.getElementById("licensekeybtn").addEventListener(
            "click",
            function () {
             var licensekey=document.getElementById("licensekeynew").value;
              var formData = new FormData(document.getElementById("licensekeyform"));
              formData.append('licensekey',licensekey);

           
             fetch("http://messagewebsite.book2say.com/wp-json/whatsapp_template/v1/licensekey", {
                method: 'post',
                body: formData,
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // }
            }).then((response) => {
                return response.json()
             
            }).then((res) => {
                   //alert(res.message)
                   if(res.status==false){
                     alert(res.message);
                   }else{
                    ipcRenderer.send('msgnew2',"helwosaodsad");
                    store.set("userlicensekey", res.data);
                   }
                // if (res.status === 201) {
                //     console.log("Post successfully created!")
                // }
            }).catch((error) => {
                console.log(error)
            })
            //   let postObj = { 
            //         licensekey: licensekey,
            //     }
            //     let post = JSON.stringify({"licensekey": licensekey})
            //     const url = "http://messagewebsite.book2say.com/wp-json/whatsapp_template/v1/licensekey"
            //     let xhr = new XMLHttpRequest()
            //     xhr.open('POST', url, true)
            //     xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            //     xhr.send(post);
            //     xhr.onload = function () {
            //         if(xhr.status === 201) {
            //             console.log("Post successfully created!") 
            //         }
            //     }
            console.log('userlices',store.get("userlicensekey"));
            },
            false
          );
          
});