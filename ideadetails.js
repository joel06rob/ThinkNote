

let editing = false;

const ideaList = JSON.parse(localStorage.getItem("ideas")) || [];
const getIdeaIndex = parseInt(sessionStorage.getItem("currentIdeaIndex", 10));


if(!isNaN(getIdeaIndex) && ideaList[getIdeaIndex]){
    const getIdea = ideaList[getIdeaIndex];

    tsOptions = ["Select","HTML", "CSS", "Javascript", "Python", "Java", "C++", "C#", "Go", "R", "Rust", "SQL", "Kotlin", "Swift", "pHp", "Ruby", "C", "Lua", "Dart"];
    tsSelected = [];


    const backBtn = document.getElementById("back-button");

    const typeP = document.getElementById("detailed-type");
    const typeSelect = document.getElementById("detailed-type-select");

    

    const ideaStatusDetail = document.getElementById("detailed-ideastate");
    const editBtn = document.getElementById("btn-edit");
    const saveBtn = document.getElementById("btn-save");
    const addTsBtn = document.getElementById("add-ts");
    const tsUl = document.getElementById("detailed-ts");
    const addTsSelect = document.getElementById("add-ts-select");

    const genPromptBtn = document.getElementById("btn-generate-prompt");

    //preload elements
    document.getElementById("idea-title").textContent = getIdea.title;
    const detailContainer = document.getElementById("detail-container");
    const detailDescContainer = document.getElementById("detailed-desc-container");
    document.getElementById("detailed-desc").textContent = getIdea.detail;
    if(getIdea.type !== ""){
        
        document.getElementById("detailed-type").textContent = getIdea.type;
    }
    if(getIdea.duration !== ""){
        
        document.getElementById("detailed-dur").textContent = getIdea.duration;
    }

    const getTechStackItems = getIdea.tech;
    if(Array.isArray(getTechStackItems) && getTechStackItems.length > 0){
        for(i=0;i<getTechStackItems.length;i++){
            tsSelected.push(getTechStackItems[i])
        };
        renderTechStack();
    };


    addTsBtn.addEventListener("click", function addTechStack(){
        if (!editing) return;
                addTsSelect.style.display = "inline";
                

                //clear previous options.
                addTsSelect.innerHTML = "";
                
                //add functionality here where if the tech is already selected (in array) then dont display it again.
                tsOptions.forEach(tsOption => {
                    const tsOp = document.createElement("option");
                    tsOp.value = tsOption;
                    tsOp.textContent = tsOption;
                    addTsSelect.appendChild(tsOp);
                });
                

    });

    //amended 08/06/25 - change techstack elements to <li> for more structure.
    addTsSelect.addEventListener("change", ()=>{
        if(!editing) return;

        const selectedTs = addTsSelect.value;
        if(!tsSelected.includes(selectedTs)){
            tsSelected.push(addTsSelect.value);

            renderTechStack();
            addTsSelect.style.display = "none";
        };
        
                    

    });
    function renderTechStack(){
        //clear ul and re render for new entries
        tsUl.innerHTML = "";
        tsSelected.forEach((tsSelectedElement, index) =>{
                        
            const tsLi = document.createElement("li");
            tsLi.className = "ts-element";
                        
            //p
            const tsP = document.createElement("p");
            tsP.textContent = tsSelectedElement;
            //del btn
            const tsDelBtn = document.createElement("button");
            tsDelBtn.className = "ts-element-delete";
            tsDelBtn.innerHTML = "&times;";

            
            //delete ts and re render the li elements of tsSelected
            tsDelBtn.addEventListener("click", ()=>{
                tsSelected.splice(index, 1);
                getIdea.tech = [...tsSelected];
                console.log(getIdea.tech);
                ideaList[getIdeaIndex] = getIdea;
                localStorage.setItem("ideas", JSON.stringify(ideaList));
                renderTechStack();
            });
                        
            tsLi.appendChild(tsP);
            tsLi.appendChild(tsDelBtn);

            tsUl.appendChild(tsLi);
        });
    };
    
    

    const statusOptions2 = ["Not Started", "Interested", "Developing", "Completed"];
    //for each option call function(arrow) with param (optionText)
    statusOptions2.forEach((optionText)=>{
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;

        if(optionText === getIdea.state){
            option.selected  = true;
        }
        ideaStatusDetail.appendChild(option);
        
    });
    statusColor(ideaStatusDetail.value);

    //change status of idea and save to localstorage
    ideaStatusDetail.addEventListener("change", ()=>{
        getIdea.state = ideaStatusDetail.value;
        ideaList[getIdeaIndex] = getIdea;
        localStorage.setItem("ideas", JSON.stringify(ideaList));
        statusColor(ideaStatusDetail.value);
    });

    function statusColor(currentStatus){
        
        ideaStatusDetail.className = "";

        if(currentStatus === "Not Started"){
            ideaStatusDetail.classList.add("status-select-notstarted");  
        }
        else if(currentStatus === "Interested"){
            ideaStatusDetail.classList.add("status-select-interested");
        }
        else if(currentStatus === "Developing"){
            ideaStatusDetail.classList.add("status-select-developing");
        }
        else if(currentStatus === "Completed"){
            ideaStatusDetail.classList.add("status-select-completed");
        };
    };

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
            
            //(Description) replace <p> with textarea with <p>'s contents
            const detailEl = document.getElementById("detailed-desc");
            const currentTxt = detailEl.textContent;
            
            const descInput = document.createElement("textarea");
            descInput.value = currentTxt;
            descInput.id = "detailed-desc";
            
            detailEl.parentNode.replaceChild(descInput, detailEl);
            saveBtn.style.display = "inline";
            editBtn.style.display = "none";
            
            //type
            typeP.style.display = "none";
            typeSelect.style.display = "inline";
        
           //techstack
            addTsBtn.style.display = "inline";
            
            //duration
            const durationP = document.getElementById("detailed-dur");
            durationP.style.display = "none";

            const durationInput = document.createElement("input");
            durationInput.id = "duration-input"
            durationInput.style.display = "inline";

            durationP.parentNode.insertBefore(durationInput, durationP.nextSibling);

            
        }
    };

    
    //save
    function saveState(){

        //(Description)
        const inp = document.getElementById("detailed-desc");
        const updated = inp.value;

        const newP = document.createElement("p");
        newP.textContent = updated;
        newP.id = "detailed-desc";

        inp.parentNode.replaceChild(newP, inp);
        

        saveBtn.style.display = "none";
        editBtn.style.display = "inline";

        //(Tech Stack)
        addTsBtn.style.display = "none";
        addTsSelect.style.display = "none";
        
        //(Type)
        typeP.textContent = typeSelect.value;
        typeSelect.style.display = "none";
        typeP.style.display = "inline";

        //(Duration)
        const inp2 = document.getElementById("duration-input");
        const durP = document.getElementById("detailed-dur");
        
        if(inp2.value ==""){
            inp2.parentNode.replaceChild(durP, inp2);
            durP.style.display = "inline";
        }
        else{
            durP.textContent = inp2.value;
            inp2.parentNode.replaceChild(durP, inp2);
            durP.style.display = "inline";
        };
        inp2.remove();

        //save to localStorage
        getIdea.detail = newP.textContent;
        getIdea.type = typeP.textContent;
        getIdea.tech = [...tsSelected];
        getIdea.duration = durP.textContent;

        ideaList[getIdeaIndex] = getIdea;
        localStorage.setItem("ideas", JSON.stringify(ideaList));

        editing = false;
    };

    genPromptBtn.addEventListener("click", () =>{
        
        if(getIdea.type === "" || getIdea.duration === "" || tsSelected.length == 0){
            alert("Please fill in all fields first!")
        }
        else{
            const genPromptP = document.getElementById("p-generate-prompt");
            const genPromptText = `Create me a plan for a ${getIdea.type} project called ${getIdea.title}. The purpose of the project is ${getIdea.detail} and it will be developed in ${getIdea.tech} with a time scope of ${getIdea.duration} days.`
            genPromptP.textContent = genPromptText;
        }
        
        
    });
}
else{
    window.location.href = "index.html";
    //history.back();
};





    
