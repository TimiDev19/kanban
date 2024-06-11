import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import boardsSlice from '../redux/BoardsSlice';

const AddEditTaskModal = ({ type, setOpenAddEditTask, taskIndex, setIsTaskModalOpen, pervColIndex = 0, }) => {

    const [isValid, setIsValid] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const dispatch = useDispatch()

    const board = useSelector((state) => state.boards).find((board) => board.isActive)

    const columns = board.columns
    const col = columns.find((col, index) => index === pervColIndex)
    const [status, setStatus] = useState(columns[pervColIndex].name)
    const [newColIndex, setNewColIndex] = useState(pervColIndex)
    const task = col ? col.tasks?.find((task, index) => index === taskIndex) : []

    const [subtasks, setSubtasks] = useState(
        [
            { title: '', isCompleted: false, id: uuidv4() },
            { title: '', isCompleted: false, id: uuidv4() },
        ]
    )

    const onDelete = (id) => {
        setSubtasks(
            (perState) => perState.filter((el) => el.id !== id)
        )
    }
    // if (type === 'edit' && isFirstLoad) {
    //     setNewColumns(
    //         board.columns.map((col) => {
    //             return { ...col, id: uuidv4() };
    //         })
    //     );
    //     setName(task.title)
    //     setIsFirstLoad(false)
    // }

    const onChange = (id, newValue) => {
        setSubtasks((pervState) => {
            const newState = [...pervState]
            const subtask = newState.find((subtask) => subtask.id === id)
            subtask.title = newValue
            return newState
        })
    }

    const validate = () => {
        setIsValid(false)
        if (!title.trim()) {
            return false
        }
        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[i].title.trim()) {
                return false
            }
        }

        setIsValid(true)
        return true
    }

    if (type === 'edit' && isFirstLoad){
        setSubtasks(
            task.subtasks.map((subtask) => {
                return { ...subtask, id: uuidv4()}
            })
        )
        setTitle(task.title)
        setDescription(task.description)
        setIsFirstLoad(false)
    }

    const onSubmit = (type) => {
        if (type === 'add') {
            dispatch(boardsSlice.actions.addTask({
                title,
                description,
                subtasks,
                status,
                newColIndex
            }))
            setOpenAddEditTask(false)
            setIsTaskModalOpen(false)
        } else {
            dispatch(
                boardsSlice.actions.editTask({
                    title,
                    description,
                    subtasks,
                    status,
                    taskIndex,
                    pervColIndex,
                    newColIndex
                })
            )
            setOpenAddEditTask(false)
            setIsTaskModalOpen(false)
        }

    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }

    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setOpenAddEditTask(false)
                setIsTaskModalOpen(false)
            }}
            className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] scrollbar-hide'
        >
            <div className=' scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
                <h1 className=' text-lg'>
                    {type === 'edit' ? 'Edit' : 'Add New'} Task
                </h1>


                <div className=' mt-8 flex flex-col space-y-1'>
                    <label htmlFor="" className=' text-sm dark:text-white text-gray-500'>Task Name</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className=' bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0' placeholder='e.g Take a coffee break' />
                </div>

                <div className=' mt-8 flex flex-col space-y-1'>
                    <label htmlFor="" className=' text-sm dark:text-white text-gray-500'>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className=' bg-transparent px-4 py-2 outline-none focus:border-0 min-h-[200px] rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0' placeholder='e.g I need to take a coffee break' />
                </div>



                <div className=' mt-8 flex flex-col space-y-1'>
                    <label htmlFor="" className=' text-sm dark:text-white text-gray-500'>Subtasks</label>
                    {
                        subtasks.map((subtask, index) => (
                            <div key={index} className=' flex items-center w-full'>
                                <input onChange={
                                    (e) => {
                                        onChange(subtask.id, e.target.value)
                                    }} type="text" value={subtask.title} className=' bg-transparent border outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#635fc7] dark:border-gray-600' placeholder=' e.g Take a coffee break' />
                                <button onClick={() => {
                                    onDelete(subtask.id)
                                }}><DeleteOutlineOutlinedIcon className=' m-4 text-gray-600 cursor-pointer' /></button>

                            </div>
                        ))
                    }



                    <button
                        onClick={() => {
                            setSubtasks((state) => [
                                ...state,
                                { title: '', isCompleted: false, id: uuidv4() },
                            ])
                        }}
                        className=' w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full hover:opacity-75 duration-300'>
                        + Add new substack
                    </button>
                </div>



                <div className=' mt-8 flex flex-col space-y-3'>
                    <label htmlFor="" className=' text-sm dark:text-white text-gray-500'>
                        Current Status
                    </label>
                    <select value={status} onChange={(e) => onChangeStatus(e)} name="" id="" className=' select-status flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:outline-[#635fc7] outline-none border border-gray-300 focus:border-0'>
                        {columns.map((column, index) => (
                            <option value={column.name} key={index}>
                                {column.name}
                            </option>
                        ))}
                    </select>

                    <button className=' w-full items-center text-white bg-[#635fc7] py-2 rounded-full'
                        onClick={() => {
                            const isValid = validate()
                            if (isValid) {
                                onSubmit(type)
                                setOpenAddEditTask(false)
                                setIsTaskModalOpen(false)
                            } else {
                                alert('Fill all feilds, delete empty feild if possible')
                            }
                        }}>
                        {type == 'edit' ? 'Edit Task' : 'Create Task'}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddEditTaskModal
