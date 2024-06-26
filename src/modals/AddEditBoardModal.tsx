import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4, validate } from 'uuid'
import boardsSlice from '../redux/BoardsSlice'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const AddEditBoardModal = ({ setBoardModalOpen, type, setIsTheBoardModalOpen }) => {
    const dispatch = useDispatch()
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [name, setName] = useState('')
    const [newColumns, setNewColumns] = useState([
        { name: 'Todo', task: [], id: uuidv4() },
        { name: 'Doing', task: [], id: uuidv4() },
    ])
    const [isValid, setIsValid] = useState(true)
    const board = useSelector((state) => state.boards).find(
        (board) => board.isActive
    )

    if (type === 'edit' && isFirstLoad) {
        setNewColumns(
            board.columns.map((col) => {
                return { ...col, id: uuidv4() };
            })
        );
        setName(board.name)
        setIsFirstLoad(false)
    }

    const validate = () => {
        setIsValid(false)
        if (!name.trim()) {
            return false
        }
        for (let i = 0; i < newColumns.length; i++) {
            if (!newColumns[i].name.trim()) {
                return false
            }
        }
        setIsValid(true)
        return true
    }

    const onChange = (id, newValue) => {
        setNewColumns((pervState) => {
            const newState = [...pervState]
            const column = newState.find((col) => col.id === id)
            column.name = newValue
            return newState
        })
    }

    const onDelete = (id) => {
        setNewColumns(
            (perState) => perState.filter((el) => el.id !== id)
        )
    }

    

    const onSubmit = (type) => {
        setBoardModalOpen(false)
        if (type === 'add') {
            dispatch(boardsSlice.actions.addBoard({ name, newColumns }))
        } else {
            dispatch(boardsSlice.actions.editBoard({ name, newColumns }))
        }
    }


    return (
        <div onClick={(e) => {
            if (e.target !== e.currentTarget) {
                return
            }
            setBoardModalOpen(false)
            setIsTheBoardModalOpen(false)
        }} className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] scrollbar-hide'>
            <div className=' scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
                <h1 className=' text-lg'>
                    {type === 'edit' ? 'Edit' : 'Add New'} Board
                </h1>

                <div className=' mt-8 flex flex-col space-y-3'>
                    <label htmlFor="" className='text-sm dark:text-white text-gray-500'>
                        Board Name
                    </label>
                    <input type="text" className=' bg-transparent outline-none px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0' placeholder=' e.g Web Design' value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} id='board-name-input' />
                </div>


                <div className=' mt-8 flex flex-col space-y-3'>
                    <label htmlFor="" className=' text-sm dark:text-white text-gray-500'>Board Columns</label>
                    {
                        newColumns.map((column, index) => (
                            <div key={index} className=' flex items-center w-full'>
                                <input type="text" className=' bg-transparent flex-grow px-4 py-2 roundedmb
                             text-sm border border-gray-600 outline-none focus:outline-[#735fc7]'  value={column.name}
                                    onChange={(e) => {
                                        onChange(column.id, e.target.value)
                                    }}
                                />

                                <div className='cursor-pointer text-gray-500 m-4' onClick={() => {
                                    onDelete(column.id)
                                }}>
                                    <DeleteOutlineOutlinedIcon />
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <button className=' w-full items-center hover:opacity-75 dark:text-[#635fc7] mt-2 dark:bg-white text-[#635fc7] bg-slate-200 py-2 rounded-full'
                        onClick={() => {
                            setNewColumns((state) => [
                                ...state,
                                { name: '', task: [], id: uuidv4() },
                            ])
                        }}>
                        + Add new column
                    </button>


                    <button className=' w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full'
                        onClick={
                            () => {
                                const isValid = validate()
                                if (isValid === true) onSubmit(type)
                                setBoardModalOpen(false);
                                setIsTheBoardModalOpen(false);
                            }
                        }>
                        {type === 'add' ? 'Create New Board' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEditBoardModal
