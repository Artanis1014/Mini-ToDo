const button = document.getElementById("button");
const list = document.getElementById("list");
const input = document.getElementById("input");
button.addEventListener("click",function(){
    input.classList.toggle("show");
    if(input.classList.contains("show")){
        input.focus();
    }
})
input.addEventListener("keypress", function(e){
    if(e.key === "Enter" && input.value.trim() !== ""){
        add_task();
    }
})
function add_task(){
    const task_text = input.value.trim();
    if(task_text === ""){
        return;
    }
    const task = document.createElement("li");
    const clickbox = document.createElement("div");
    clickbox.className = "clickbox";
    const text = document.createElement("span");
    text.textContent = task_text;
    task.appendChild(clickbox);
    task.appendChild(text);
    task.addEventListener("click", function(){
        task.classList.toggle("completed");
        if(task.classList.contains("completed")){
            list.appendChild(task);
        }
    })
    list.appendChild(task);
    const taskElements = list.querySelectorAll("li");
    if(taskElements.length > 10){
        const completedTasks = list.querySelectorAll("li.completed");
        if(completedTasks.length > 0){
            completedTasks[0].remove();
        }
    }
    input.value = "";
    input.classList.remove("show");
}
load();