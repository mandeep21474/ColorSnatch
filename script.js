let button = document.querySelector("#button");
let uli= document.querySelector(".chosen_colors");
let clear= document.querySelector(".forclear");

let pickedcolors=JSON.parse(localStorage.getItem("pickedcolors")||"[]");


function  displayselectedcolor(){

    let li_tag=pickedcolors.map(color=>
                        `<li class="color">
                    <span class="shade" style="background: ${color}"></span>
                    <span class="hexcode">${color}</span>
                </li>`).join("");
                
                uli.innerHTML=li_tag;
                document.querySelector(".result").classList.remove("erase");
}
let func = async () => {

    try {

       
        // Create an EyeDropper instance and open it
        let eyeDropper = new EyeDropper();
        let result = await eyeDropper.open();
        let sRGBHex = result.sRGBHex;





        // Write the color to the clipboard
        await navigator.clipboard.writeText(sRGBHex);
       

        // Read the clipboard content to verify
        let clipboardText = await navigator.clipboard.readText();
        let colorpresent=false;
        for(let i =0;i<pickedcolors.length;i++){
            if(pickedcolors[i]===clipboardText){
                colorpresent=true;
                break;
            }
        }
        if(colorpresent===false){
        pickedcolors.push(clipboardText);
        //store in browser local storage{key,value}
        localStorage.setItem("slected_col",JSON.stringify(pickedcolors));
        displayselectedcolor();}
    } catch (error) {
        console.error('Error:', error);
        
    }
   
   
};
function erase_all(){
    pickedcolors.length=0;
    localStorage.setItem("slected_col",JSON.stringify(pickedcolors));
    document.querySelector(".result").classList.add("erase");
}
clear.addEventListener("click", erase_all);
button.addEventListener("click", func);
