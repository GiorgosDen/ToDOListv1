import { useNavigate } from "react-router-dom";

//Panel to Update (in future versions) and Delete task
function TaskManagePanel({taskID}){
    const navigate = useNavigate();
    const deleteTask = ()=>{
        //get all tasks
        const userTasks = localStorage.getItem('tasks')? JSON.parse(localStorage.getItem('tasks')):[];
        console.log("----------------------");
        console.log(taskID);
        console.log(userTasks);
        console.log(userTasks.filter((task)=>task.id!==taskID))
        //filter and save the list 
        localStorage.setItem("tasks",JSON.stringify(userTasks.filter((task)=>Number(task.id)!==Number(taskID))));
        navigate("/home");
    }

    return(
        <div className="flex justify-end gap-2 pt-2">
            <button className="font-semibold text-white bg-red-700 py-1 px-3 rounded-lg hover:bg-red-800 shadow-sm"
             onClick={deleteTask}>Delete</button>
        </div>
    );
}

export default TaskManagePanel;