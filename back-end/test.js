let list = [];

function addToList(id , name , completed){
    const isExist = list.find(e => e.name === name);
    if (isExist){
        console.log("already exist");
        return;
    }
    list.push({id,name,completed});
}

function mark (id , completed){
    const todo = list.find(e =>e.id ===id);
    if (isExist){
        todo.completed="true";
        return;
    }
    console.log("doesn't exist");
}

