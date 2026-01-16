import 'React', {useState} from 'react';


interface TaskItem = {
  text: String
  isDone: Boolean
}

interface TaskInput = {
  onAdd: void
}

interface TaskList ={
  TaskItem[]: List?
}


const nnAdd: TaskInput = (taskItem: TaskItem) => {
  TaskList.append(taskItem)
}

const TaskListTable = () => {
  const [tasklist, setTaskList] = useState(TaskList[])
  return(
    <h1>今日のタスク一覧!</h1>
    tasklist.maps((task,index) => <li>task.text</li><li>task.isDone</li>)

    <button () => {TaskInput}> taskadd

  )
