//Darkmode
let darkmode = localStorage.getItem("darkmode");
const darkmodeBtn = document.getElementById("btn-darkmode");

const dIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>`;
const lIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/></svg>`;

function updateIcon(){
    let darkmode = localStorage.getItem("darkmode");
    if(darkmode === "active"){
        darkmodeBtn.innerHTML = lIcon;
    }
    else{
        darkmodeBtn.innerHTML = dIcon;
    };
};

if(darkmode === "active"){
    document.documentElement.classList.add("darkmode");
    updateIcon();
};

function enableDarkmode(){
    document.documentElement.classList.add("darkmode");
    localStorage.setItem("darkmode","active");
};
function disableDarkmode(){
    document.documentElement.classList.remove("darkmode");
    localStorage.setItem("darkmode", "inactive");
};


darkmodeBtn.addEventListener("click", () =>{
    let darkmode = localStorage.getItem("darkmode");
    if(darkmode !== "active"){
        enableDarkmode();
    }
    else{
        disableDarkmode();
    }
    updateIcon();
});

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
            state: this.ideaState,
            type: "",
            tech: [],
            duration: ""
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
    ideanameP.className = "idea-li-left-name";

    //Idea Desc
    const ideadescP = document.createElement("p");
    ideadescP.textContent = currentItem.detail;
    ideadescP.className = "idea-li-left-desc";

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
        const ideaindex = ideaList.indexOf(currentItem);
        sessionStorage.setItem("currentIdeaIndex", ideaindex);
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






