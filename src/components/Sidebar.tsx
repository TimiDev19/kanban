import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useDarkMode from '../hooks/useDarkMode'
import boardsSlice from '../redux/BoardsSlice';
import AddEditBoardModal from '../modals/AddEditBoardModal'

const Sidebar = ({ setBoardModalOpen, setIsSidebarOpen }) => {
    const boards = useSelector((state) => state.boards)
    const dispatch = useDispatch()
    const [colorTheme, setTheme] = useDarkMode()
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)
    const [darkSide, setDarkSide] = useState(
        colorTheme === 'light' ? true : false
    )
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    }
    console.log('boards=', boards)
    return (
        <div className=' w-[300px] h-full bg-white dark:bg-[#2b2c37] pt-24 absolute flex flex-col justify-between'>
            <div>
                <h1 className=' text-gray-400 text-center uppercase font-sans mb-4'>All Boards ({boards.length})</h1>
                <div>
                    {boards.map((board, index) => (
                        <div className={` flex items-baseline space-x-2 px-5 py-4 cursor-pointer hover:bg-[#635fc7] hover:opacity-80 hover:text-white duration-500 mr-8 rounded-r-full ${board.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`} key={index} onClick={() => {
                            dispatch(boardsSlice.actions.setBoardActive({ index }))
                        }}>
                            {/* <img src={boardIcon} alt="" className=' h-4'/> */}
                            <p className=' text-lg font-bold dark:text-white cursor-pointer '>{board.name}</p>
                        </div>
                    ))}

                    <div className=' flex items-baseline space-x-2 text-[#635fc7] px-5 py-4 cursor-pointer ' onClick={() => {
                        setIsBoardModalOpen(true)
                    }}>
                        <p className=' text-lg font-bold hover:opacity-85'>
                            Create New Board
                        </p>
                    </div>
                </div>

            </div>

            <div className=' mb-6 text-center flex flex-col items-center justify-center'>
                <div className=' mx-2 py-2 w-[70%] m-auto bg-slate-200 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
                    <LightModeIcon className=' text-slate-500 mx-4' />
                    <div onClick={toggleDarkMode} className=' hover:cursor-pointer dark:bg-[#635fc7] dark:justify-end duration-700 bg-gray-300 flex w-1/4 h-6 rounded-full items-center px-2'>
                        <div className='h-5 w-5 py-2 bg-white rounded-full'></div>
                    </div>
                    <DarkModeIcon className=' text-slate-500 mx-4' />
                </div>
                <button className=' mt-3 text-center font-semibold text-gray-400' onClick={() => setIsSidebarOpen(false)}>
                    Hide Sidebar
                </button>
            </div>

            {
              isBoardModalOpen && <AddEditBoardModal type='add' setBoardModalOpen={setIsBoardModalOpen}/>
            }

        </div>
    )
}

export default Sidebar


