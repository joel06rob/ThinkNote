
//Idea list
const ideaList = [];

//Adding a project item
function addIdea(){
    
    const idea = document.getElementById("ideaname-entry").value;
    const desc = document.getElementById("ideadesc-entry").value;

    if(idea == ""){
        alert("Cannot create idea without name!");
    }
    else if(desc == ""){
        alert("Cannot create idea without description!");
    }
    else{
        //initialize new idea
        const newIdea = new Idea(idea,desc);
        newIdea.storeIdea();

        const ideasListSub = document.getElementById("idea-subcontainer");
        ideasListSub.innerHTML = "";
        ideaList.forEach(displayIdeas);
    }
    clearIdeaEntry()
};

function Idea(idea, desc){
    this.ideaName = idea;
    this.ideaDesc = desc;
    this.ideaState = "Not Started";
    
    this.storeIdea = function(){
        ideaList.push({
            title: this.ideaName,
            detail: this.ideaDesc,
            state: this.ideaState
        });
    };
};

function displayIdeas(currentItem){
    const li = document.createElement("li");
    li.className = "idea-item";
    

    //Split elements seperate

    //Idea Name
    const ideanameP = document.createElement("p");
    ideanameP.textContent = currentItem.title;

    //Idea Desc
    const ideadescP = document.createElement("p");
    ideadescP.textContent = currentItem.detail;

    //Idea Status
    //Create element (dropdown)
    const ideastatus = document.createElement("select");
    const statusOptions = ["Not Started", "Interested", "Developing", "Completed"];

    //Loop through each of the options (adding them to the dropdown options).
    statusOptions.forEach((optionText) =>{
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;

        //Check if currentItem (title, detail and ->(state)) matches the one of the state options in the select.
        if(optionText === currentItem.state){
            //set the selected option to true
            option.selected = true;
        }
        ideastatus.appendChild(option);
        

    });

    statusColor(ideastatus.value);

    //Update items status in array on change
    ideastatus.addEventListener("change", function(){
        currentItem.state = ideastatus.value;
        statusColor(ideastatus.value);
    });


    //add to li
    li.appendChild(ideanameP);
    li.appendChild(ideadescP);
    li.appendChild(ideastatus);

    //add li to idea subcontainer
    const ideasListSub = document.getElementById("idea-subcontainer");
    ideasListSub.appendChild(li)


    function statusColor(currentStatus){
        
        ideastatus.className = "";

        if(currentStatus === "Not Started"){
            ideastatus.classList.add("status-select-notstarted");  
        }
        else if(currentStatus === "Interested"){
            ideastatus.classList.add("status-select-interested");
        }
        else if(currentStatus === "Developing"){
            ideastatus.classList.add("status-select-developing");
        }
        else if(currentStatus === "Completed"){
            ideastatus.classList.add("status-select-completed");
        };
    };
};

function clearIdeaEntry(){
    document.getElementById("ideaname-entry").value = "";
    document.getElementById("ideadesc-entry").value="";
};




