const button = document.getElementById("button");
const list = document.getElementById("list");
const input = document.getElementById("input");
function load(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task_data => {
        const task = document.createElement("li");
        if(task_data.completed){
            task.classList.add("completed");
        }
        const delete_button = document.createElement("button")
        delete_button.className = "delete_button";
        delete_button.textContent = "x"
        delete_button.addEventListener("click",function(e){
            e.stopPropagation();
            task.remove();
            save();
        })
        const clickbox = document.createElement("div");
        clickbox.className = "clickbox";
        const text = document.createElement("span");
        text.textContent = task_data.text;
        task.appendChild(clickbox);
        task.appendChild(text);
        task.appendChild(delete_button);
        task.addEventListener("click", function(){
            task.classList.toggle("completed");
            if(task.classList.contains("completed")){
                list.appendChild(task);
            }
            save();
        });
        list.appendChild(task);
    })
}
function save(){
    const tasks = [];
    const tasks_data = list.querySelectorAll("li");
    tasks_data.forEach(task => {
        const text = task.querySelector("span");
        tasks.push({
            text: text ? text.textContent : task.textContent,
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
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
        save();
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
        save();
    })
    list.prepend(task);
    save();
    input.value = "";
    input.classList.remove("show");
}
load();