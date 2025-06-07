let editing = false;

const getIdea = JSON.parse(sessionStorage.getItem("currentIdea"));
console.log(getIdea);
if(getIdea != null){
    displayIdeaElements();
}
else{
    window.location.href = "index.html";
    //history.back();
};



function displayIdeaElements(){

    document.getElementById("idea-title").textContent = getIdea.title;
    const detailContainer = document.getElementById("detail-container");
    const detailDescContainer = document.getElementById("detailed-desc-container");
    document.getElementById("detailed-desc").textContent = getIdea.detail;

    const backBtn = document.getElementById("back-button");
    const ideaStateDetail = document.getElementById("detailed-ideastate");
    const editBtn = document.getElementById("btn-edit");
    const saveBtn = document.getElementById("btn-save");


    const statusOptions2 = ["Not Started", "Interested", "Developing", "Completed"];
    //for each option call function(arrow) with param (optionText)
    statusOptions2.forEach((optionText)=>{
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;

        if(optionText === getIdea.state){
            option.selected  = true;
        }
        ideaStateDetail.appendChild(option);
    });

    

    //TODO: Add catch when user tries to exit without saving (if in edit mode?)
    backBtn.addEventListener("click", ()=>{
        window.location.href = "index.html";
    });

    editBtn.addEventListener("click", ()=>{
        editing = true;
        editState(editing)
    });
    saveBtn.addEventListener("click", ()=>{
        saveState();
        
    });


    //STC (Subject To Chance) - Tag each element (thats editable) with a 'editable' class tag and loop through them (saves time instead of individually getting elements).
    function editState(editing){
        if(editing === true){
            
            const detailEl = document.getElementById("detailed-desc");
            const currentTxt = detailEl.textContent;
            
            const descInput = document.createElement("textarea");
            descInput.value = currentTxt;
            descInput.id = "detailed-desc";
            
            detailEl.parentNode.replaceChild(descInput, detailEl);
            saveBtn.style.display = "inline";
            editBtn.style.display = "none";
            
            
            
        }
    };

    
    //save
    function saveState(){
        const inp = document.getElementById("detailed-desc");
        const updated = inp.value;

        const newP = document.createElement("p");
        newP.textContent = updated;
        newP.id = "detailed-desc";

        inp.parentNode.replaceChild(newP, inp);
        

        saveBtn.style.display = "none";
        editBtn.style.display = "inline";
        
        
        editing = false;
    };
};