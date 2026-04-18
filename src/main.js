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
        alert("请输入任务");
        return;
    }
    const task = document.createElement("li");
    const delete_button = document.createElement("button")
    delete_button.className = "delete_button";
    delete_button.textContent = "x"
    delete_button.addEventListener("click",function(e){
        e.stopPropagation();
        task.remove();
    })
    const clickbox = document.createElement("div");
    clickbox.className = "clickbox";
    const text = document.createElement("span");
    text.textContent = task_text;
    task.appendChild(clickbox);
    task.appendChild(text);
    task.appendChild(delete_button);
    task.addEventListener("click", function(){
        task.classList.toggle("completed");
        if(task.classList.contains("completed")){
            list.appendChild(task);
        }
    })
    list.appendChild(task);
    const task_num = list.querySelectorAll("li");
    if(task_num.length > 10){
        const completed_tasks = list.querySelectorAll("li.completed");
        if(completed_tasks.length > 0){
            completed_tasks[0].remove();
        }
    }
    input.value = "";
    input.classList.remove("show");
}