
//Idea list (Load previous)
const ideaList = JSON.parse(localStorage.getItem("ideas")) || [];
ideaList.forEach(displayIdeas);

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
        //Save idea to local storage
        localStorage.setItem("ideas", JSON.stringify(ideaList));
    };
};

function displayIdeas(currentItem){
    const li = document.createElement("li");
    li.className = "idea-item";
    

    //Split elements seperate

    //left
    const leftDiv = document.createElement("div");
    leftDiv.className = "idea-li-left";

    //Idea Name
    const ideanameP = document.createElement("p");
    ideanameP.textContent = currentItem.title;

    //Idea Desc
    const ideadescP = document.createElement("p");
    ideadescP.textContent = currentItem.detail;

    leftDiv.appendChild(ideanameP);
    leftDiv.appendChild(ideadescP);

    //right
    const rightDiv = document.createElement("div");
    rightDiv.className = "idea-li-right";


    //Idea Status
    //Create element (dropdown)
    const ideastatus = document.createElement("select");
    const statusOptions = ["Not Started", "Interested", "Developing", "Completed"];

    //Loop through each of the options (adding them to the dropdown options).
    statusOptions.forEach((optionText) =>{
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;

        //Check if currentItem (title, detail, ->(state)<-) matches the one of the state options in the select.
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
        localStorage.setItem("ideas", JSON.stringify(ideaList));

    });

    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "idea-delete-button";
    deleteBtn.innerHTML = "&times;";

    //remove the list item from DOM and remove item (by getting index) from ideaList array
    deleteBtn.addEventListener("click", () =>{
        li.remove();
        const index = ideaList.indexOf(currentItem);
        if(index > -1){
            //removes idea element from array (1 = only remove 1 item)
            ideaList.splice(index, 1);
            //update local storage
            localStorage.setItem("ideas", JSON.stringify(ideaList));
        };
    });

    rightDiv.appendChild(ideastatus);
    rightDiv.appendChild(deleteBtn);

    //add to li
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    

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

    //when idea item is pressed open a detailed window view. (Save item to session storage)
    li.addEventListener("click", function(){
        sessionStorage.setItem("currentIdea", JSON.stringify(currentItem));
        window.location.href = "idea.html";
    });
    
    //ensure when status dropdown or delete button is pressed that it doesnt open a page.
    ideastatus.addEventListener("click", e => e.stopPropagation());
    deleteBtn.addEventListener("click", e => e.stopPropagation());
};

function clearIdeaEntry(){
    document.getElementById("ideaname-entry").value = "";
    document.getElementById("ideadesc-entry").value="";
};




