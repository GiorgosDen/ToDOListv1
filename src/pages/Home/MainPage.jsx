import { useState, useEffect } from 'react';
//Import Page Components
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'
import heroImg from '../../assets/hero.png'
import CheckTask from './components/CheckTask'
import MainHeader from './components/MainHeader'
import AddTaskMenu from './components/AddTaskMenu'
import CompletedTaskMenu from './components/CompletedTaskMenu'
//Import css files
import '../../App.css'
import '../../index.css'
import { useLocation } from 'react-router-dom';

function MainPage(){

  //Get the username
  const location = useLocation();
  const name = location.state?.username;
  /**Hooks UseStates**/
  //extract user tasks (from localstorage)
  const [userTasks, setUserTasks] = useState(()=>{
    //load tasks
    const storedTasks = localStorage.getItem('tasks');
    const userStoredTasks = storedTasks ? JSON.parse(storedTasks) : [];
    //Calculate yesterday's date
    const date = new Date();
    date.setDate(date.getDate()-1);//set the yesterday's date
    const yesterdayDate= date.toLocaleDateString();
    //Clear past tasks
    return(userStoredTasks.filter((task)=>task.date>yesterdayDate));
  });

  //Set completed Tasks counter based on updated userTasks
  const [completedTasks, setCompletedTaks] = useState(()=>{
    const completedCount = userTasks.reduce((count,task)=>{
       return task.state==="Completed"?count+1:count;
    },0);
    return completedCount;
  });

  //Keep localstorage sync whenever tasks changes
  useEffect(()=>{
    //save in localstorage
    localStorage.setItem('tasks',JSON.stringify(userTasks));
  },[userTasks]);

  //interval to check expired tasks
  useEffect(()=>{
    const interval = setInterval(()=>{
      const nowDate = new Date();
      //Get current minutes
      const currentMinutes = nowDate.getHours()*60+nowDate.getMinutes();
      //update tasks
      setUserTasks((curTasks)=>{
        let haveTasksExpired = false;
        const updTasks = curTasks.map((task)=>{
          if(task.state!=="Expired"){
            const [taskHours, taskMinutes] = task.time.split(':').map(Number);
            const taskTotalMinutes = taskHours*60 + taskMinutes;
            //if current task has expired
            if(taskTotalMinutes<currentMinutes){
              haveTasksExpired=true;
              return {...task,state:"Expired"};//Update state
            }
          }
          //The task hasn't update
          return task;
        }
      )
      //if have expired tasks, update the state 
      return haveTasksExpired? updTasks : curTasks;
      })
    },60000);//checks every minute
    return () => clearInterval(interval);
  },[]);

  //Handle checked Tasks
  const handleCheckTaskChange= (taskID,statusNumber)=>{
      //Update counter
      setCompletedTaks(completedTasks+statusNumber);
      //Update task state
      setUserTasks((curTasks)=>{
        const updTasks = curTasks.map((task)=>{
          //If the task clicked
          if(task.id===taskID){
            return({...task, state:statusNumber==1?"Completed":"In progress"});
          }
          return task;
        });
        //Update the state
        return updTasks;
      });     
  }

  return (
    <>
        <MainHeader userName={name}/>
        <hr/>
        <AddTaskMenu totalTasks={userTasks.length}/>
        <div className='tasksScrollMenu'>
          {
            userTasks && userTasks.length>0 ? (
              userTasks?.map((task,index)=>(
                <CheckTask key={index} userTask={task} onCheckTaskChange={handleCheckTaskChange}/>
              )
            )
          ) : (
            <p className="text-gray-500 text-sm">You don't have any tasks yet!</p>
          )
          }
        </div>
        <CompletedTaskMenu tasksCount={userTasks.length} completedTaskCount={completedTasks}/>
    </>
  );
}

export default MainPage;