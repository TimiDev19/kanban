import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ElipsisMenu from '../components/ElipsisMenu';
import Subtask from '../components/Subtask';
import boardsSlice from '../redux/BoardsSlice';
import DeleteModal from './DeleteModal';
import AddEditTaskModal from './AddEditTaskModal';


const Taskmodal = ({colIndex, taskIndex, setIsTaskModalOpen}) => {
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boards)
    const board = boards.find(board => board.isActive)
    const columns = board.columns
    const col = columns.find((column, i) => colIndex === i)
    const task = col.tasks.find((col, i) => taskIndex === i)
    const subtasks = task.subtasks

    let completed = 0
    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed++
        }
    })

    const [status, setStatus] = useState(task.status)
    const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))
    const [elipseMenuOpen, setIsElipsisOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [IsAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
    const setOpenEditModal = () => {
        setIsAddTaskModalOpen(true)
        // setIsTaskModalOpen(false)
        setIsElipsisOpen(false)
    }
    const setOpenDeleteModal = () => {
        setIsElipsisOpen(false)
        setIsDeleteModalOpen(true)
    }

    const onchange = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }

    const onDeleteBtnClick = (e) => {
        dispatch(boardsSlice.actions.deleteTask({taskIndex, colIndex}))
        setIsTaskModalOpen(false)
        setIsDeleteModalOpen(false)
    }
    const onClose = (e) => {
        if (e.target !== e.currentTarget){
            return
        }
        dispatch(
            boardsSlice.actions.setTaskStatus({
                taskIndex, colIndex, newColIndex, status
            })
        )
        setIsTaskModalOpen(false)
    }
  return (
    <div onClick={onClose} className='fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]'>
      <div className=' scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <div className=' relative flex justify-between w-full items-center'>
            <h1 className=' text-lg'>{task.title}</h1>
            <h1 onClick={() => setIsElipsisOpen(state => !state)}><MoreVertIcon className='cursor-pointer h-6'/></h1>
            {
                elipseMenuOpen && <ElipsisMenu setOpenEditModal={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal} type='Task'/>
            }
        </div>

        <p className=' text-gray-500 font-semibold tracking-wide text-sm pt-6'>
            {task.description}
        </p>

        <p className=' pt-6 text-gray-500 tracking-widest text-sm'>
            Subtasks ({completed} of {subtasks.length})
        </p>

        <div className=' mt-4 space-y-2'>
            {
                subtasks.map((subtasks, i) => {
                    return(
                        <Subtask index={i} taskIndex={taskIndex} colIndex={colIndex} key={i}/>
                    )
                })
            }
        </div>


        <div className=' mt-8 flex flex-col space-y-3'>
            <label htmlFor="" className='text-sm dark:text-white text-gray-500'>Current Status</label>
            <select name="" id="" className=' select-status flex-grow px-4 bg-transparent focus:border-0 text-sm border py-2 border-gray-300 focus:outline-[#635fc7] outline-none' value={status} onChange={onchange}>
                {
                    columns.map((column, i) => (
                        <option >
                            {column.name}
                        </option>
                    ))
                }
            </select>

        </div>


      </div>

      {
        isDeleteModalOpen && <DeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} title={task.title} type='task'/>
      }
      {
        IsAddTaskModalOpen && <AddEditTaskModal setOpenAddEditTask={setIsAddTaskModalOpen} type='edit' taskIndex={taskIndex} pervColIndex={colIndex} setIsTaskModalOpen={setIsAddTaskModalOpen}/>
      }
    </div>
  )
}

export default Taskmodal
