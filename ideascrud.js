
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
    li.textContent = currentItem.title + " - " + currentItem.detail + " - " + currentItem.state;

    li.className = "idea-item";
    const ideasListSub = document.getElementById("idea-subcontainer");
    ideasListSub.appendChild(li)

};



