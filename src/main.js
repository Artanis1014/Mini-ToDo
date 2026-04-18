// 获取页面元素
const button = document.getElementById("button"); // 添加任务按钮
const list = document.getElementById("list");     // 任务列表容器
const input = document.getElementById("input");   // 任务输入框

// 页面加载时，从本地存储加载所有任务
function load(){
    // 从localStorage获取存储的任务数据，如果没有则为空数组
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // 遍历每个任务数据，创建对应的DOM元素
    tasks.forEach(task_data => {
        // 创建任务列表项
        const task = document.createElement("li");
        // 如果任务已完成，添加completed样式类
        if(task_data.completed){
            task.classList.add("completed");
        }
        // 创建删除按钮
        const delete_button = document.createElement("button")
        delete_button.className = "delete_button";
        delete_button.textContent = "x"
        // 为删除按钮添加点击事件
        delete_button.addEventListener("click",function(e){
            e.stopPropagation(); // 阻止事件冒泡，避免触发任务的点击事件
            task.remove();       // 从DOM中移除任务
            save();               // 保存更新后的任务列表到本地存储
        })
        // 创建点击框，用于标记任务完成状态
        const clickbox = document.createElement("div");
        clickbox.className = "clickbox";
        // 创建任务文本元素
        const text = document.createElement("span");
        text.textContent = task_data.text;
        // 将点击框、文本和删除按钮添加到任务元素中
        task.appendChild(clickbox);
        task.appendChild(text);
        task.appendChild(delete_button);
        // 为任务添加点击事件，切换完成状态
        task.addEventListener("click", function(){
            task.classList.toggle("completed");
            // 如果任务完成，将其移至列表底部
            if(task.classList.contains("completed")){
                list.appendChild(task);
            }
            save(); // 保存更新后的任务列表
        });
        // 将任务添加到任务列表容器
        list.appendChild(task);
    })
}

// 将当前任务列表保存到本地存储
function save(){
    const tasks = []; // 用于存储所有任务数据的数组
    // 获取任务列表中所有的任务元素
    const tasks_data = list.querySelectorAll("li");
    // 遍历每个任务元素，提取任务数据
    tasks_data.forEach(task => {
        const text = task.querySelector("span");
        tasks.push({
            text: text ? text.textContent : task.textContent, // 任务文本内容
            completed: task.classList.contains("completed")     // 任务完成状态
        });
    });
    // 将任务数据转换为JSON字符串并保存到localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 为添加任务按钮添加点击事件，显示/隐藏输入框
button.addEventListener("click",function(){
    input.classList.toggle("show"); // 切换输入框的显示状态
    // 如果输入框显示，则获取焦点
    if(input.classList.contains("show")){
        input.focus();
    }
})

// 为输入框添加键盘事件，按Enter键添加任务
input.addEventListener("keypress", function(e){
    // 如果按下的是Enter键且输入内容不为空，则添加任务
    if(e.key === "Enter" && input.value.trim() !== ""){
        add_task();
    }
})

// 创建并添加新任务的函数
function add_task(){
    // 获取并去除输入框内容的前后空格
    const task_text = input.value.trim();
    // 如果输入内容为空，弹出提示
    if(task_text === ""){
        alert("请输入任务");
        return;
    }
    // 创建任务列表项
    const task = document.createElement("li");
    // 创建删除按钮
    const delete_button = document.createElement("button")
    delete_button.className = "delete_button";
    delete_button.textContent = "x"
    // 为删除按钮添加点击事件
    delete_button.addEventListener("click",function(e){
        e.stopPropagation(); // 阻止事件冒泡
        task.remove();       // 移除任务
        save();               // 保存更新后的任务列表
    })
    // 创建点击框
    const clickbox = document.createElement("div");
    clickbox.className = "clickbox";
    // 创建任务文本元素
    const text = document.createElement("span");
    text.textContent = task_text;
    // 将点击框、文本和删除按钮添加到任务元素中
    task.appendChild(clickbox);
    task.appendChild(text);
    task.appendChild(delete_button);
    // 为任务添加点击事件，切换完成状态
    task.addEventListener("click", function(){
        task.classList.toggle("completed");
        // 如果任务完成，将其移至列表底部
        if(task.classList.contains("completed")){
            list.appendChild(task);
        }
        save(); // 保存更新后的任务列表
    })
    // 将新任务添加到列表开头
    list.prepend(task);
    save(); // 保存更新后的任务列表
    // 清空输入框
    input.value = "";
    // 隐藏输入框
    input.classList.remove("show");
}

// 页面加载时自动调用load函数，加载已保存的任务
load();