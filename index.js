let globalTaskData = [];
taskContents = document.getElementById("taskContentsrow");

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value
    };

    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}

const generateTaskCard = ({id, url, title, type, description}) => {
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
                        <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                        <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
                    </button>
                </div>
            </div>
            <img src=${url} class="card-img-top" alt="image"/>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <span class="badge bg-primary">${type}</span>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary float-end">OPEN TASK</button>
            </div>
        </div>
    </div>`)
}

const saveToLocalStorage = () => {
    localStorage.setItem("nikhiltasks", JSON.stringify({nikhil: globalTaskData}));
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("nikhiltasks"));
    console.log(localStorageCopy);
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["nikhil"];
    }
    console.log(globalTaskData)
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editTask = (e) => {
    console.log(e)
    console.log(e.parentNode)
    console.log(e.parentNode.parentNode.parentNode.childNodes[5])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])

    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")

    console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1])
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
}

const saveEditTask = (e) => {
  const targetID = e.getAttribute("name");
  console.log(e.parentNode.parentNode.parentNode.childNodes[1].childNodes[7].childNodes[1])
  const taskTitle = e.parentNode.parentNode.parentNode.childNodes[1].childNodes[5].childNodes[1];
  const taskDescription = e.parentNode.parentNode.parentNode.childNodes[1].childNodes[5].childNodes[3];
  const submitButton = e.parentNode.parentNode.parentNode.childNodes[1].childNodes[7].childNodes[1];
  const taskType = e.parentNode.parentNode.parentNode.childNodes[1].childNodes[5].childNodes[5];
  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };

  let stateCopy = globalTaskData;
  stateCopy = stateCopy.map((task) =>
    task.id === targetID
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        }
      : task
  );

  globalTaskData = stateCopy;
  saveToLocalStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  //submitButton.setAttribute("data-bs-toggle", "modal");
  //submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};
    
