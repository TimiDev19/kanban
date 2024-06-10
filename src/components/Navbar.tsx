import React, { useState, useEffect } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';
import AddEditBoardModal from '../modals/AddEditBoardModal';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import AddEditTaskModal from '../modals/AddEditTaskModal';
import ElipsisMenu from './ElipsisMenu';
import DeleteModal from '../modals/DeleteModal';
import boardsSlice from '../redux/BoardsSlice';


const Navbar = ({boardModalOpen, setBoardModalOpen, isBoardModalOpen}) => {
    const dispatch = useDispatch()
    const boards = useSelector((state) => state.boards)
    const board = boards.find(board => board.isActive)

    const [openDropdown, setOpenDropdown] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [boardType, setBoardType] = useState('')
    const [openAddEditTask, setOpenAddEditTask] = useState(false)
    const [isElipsisOpen, setIsElipsisOpen] = useState(false)
    const [isTheBoardModalOpen, setIsTheBoardModalOpen] = useState(false)

    const setOpenEditModal = () => {
        setIsTheBoardModalOpen(true)
        setBoardType('edit')
        setIsElipsisOpen(false)
    }

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true)
        setIsElipsisOpen(false)
    }

    const onDeleteBtnClick = () => {
        dispatch(boardsSlice.actions.deleteBoard())
        dispatch(boardsSlice.actions.setBoardActive({index : 0}))
        setIsDeleteModalOpen(false)
    }

    const onDropdownClick = () => {
        setOpenDropdown(state => !state)
        setIsElipsisOpen(false)
        setBoardType('add')
    }

    return (
        <div className=' p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'>
            <header className=' flex justify-between dark:text-white items-center'>
                {/* Left Side */}
                <div className=' flex items-center space-x-2 md:space-x-4'>
                    <h1 className=' h-6 w-6 bg-[#635fc7]'></h1>
                    <h1 className=' hidden md:inline-block font-bold font-sans md:text-4xl'>Kanban</h1>
                    <div className='flex items-center justify-between'>
                        <h1 className=' truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans'>{board.name}</h1>
                        <h1 className=' w-3 ml-2 md:hidden cursor-pointer' onClick={onDropdownClick}>{openDropdown ? (<ArrowDropUpOutlinedIcon/>) : (<ArrowDropDownOutlinedIcon/>)}</h1>
                    </div>
                </div>


                {/* Right Side */}
                <div className=' flex space-x-4 items-center md:space-x-6'>
                    <button className=' button hidden md:block' onClick={
                        () => {
                            setOpenAddEditTask( state => !state)
                        }
                    }>+ Add New Task</button>
                    <button className=' button py-1 px-3 md:hidden' onClick={
                        () => {
                            setOpenAddEditTask( state => !state)
                        }
                    }>+</button>
                   <button onClick={() => {
                    setBoardType('edit')
                    setOpenDropdown(false)
                    setIsElipsisOpen(state => !state)

                   }}>
                   <MoreVertIcon className=' cursor-pointer h-6'/>
                   </button>

                    {
                        isElipsisOpen && <ElipsisMenu 
                        setOpenDeleteModal={setOpenDeleteModal}
                        setOpenEditModal={setOpenEditModal}
                        type='Board'
                        />
                    }
                </div>
            </header>

            {
                openDropdown && <HeaderDropdown setBoardModalOpen={setBoardModalOpen} setOpenDropdown={setOpenDropdown}/>
            }

            {
                isTheBoardModalOpen && <AddEditBoardModal setIsTheBoardModalOpen={setIsTheBoardModalOpen} type={boardType} setBoardModalOpen={setBoardModalOpen}/>
            }
            {
                openAddEditTask && <AddEditTaskModal  setOpenAddEditTask={setOpenAddEditTask} type='add'/>
            }
            {
                isDeleteModalOpen && <DeleteModal onDeleteBtnClick={onDeleteBtnClick} setIsDeleteModalOpen={setIsDeleteModalOpen} title={board.name} type='board'/>
            }
        </div>
    )
}

export default Navbar
