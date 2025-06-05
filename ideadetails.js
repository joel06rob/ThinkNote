const getIdea = JSON.parse(sessionStorage.getItem("currentIdea"));
console.log(getIdea);
if(getIdea != null){
    displayIdeaElements();
}
else{
    window.location.href = "index.html";
    //history.back();
};

const backBtn = document.getElementById("back-button");

function displayIdeaElements(){

    document.getElementById("idea-title").textContent = getIdea.title;
    const detailContainer = document.getElementById("detail-container");
    const detailDescContainer = document.getElementById("detailed-desc-container");
    document.getElementById("detailed-desc").textContent = getIdea.detail;
};

//TODO: Add catch when user tries to exit without saving (if in edit mode?)
backBtn.addEventListener("click", ()=>{
    window.location.href = "index.html";
});