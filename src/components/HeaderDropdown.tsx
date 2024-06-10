import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useDarkMode from '../hooks/useDarkMode'
import boardsSlice from '../redux/BoardsSlice';

const HeaderDropdown = ({setOpenDropdown, setBoardModalOpen}) => {
    const dispatch = useDispatch()
    const [colorTheme, setTheme] = useDarkMode()
    const [darkSide, setDarkSide] = useState(
        colorTheme === 'light' ? true : false
    )
    const toggleDarkMode = (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    }

    const boards = useSelector((state) => state.boards)
    console.log('boards=' , boards)
  return (
    <div className=' py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080] ' onClick={
        (e) => {
            if (e.target !== e.currentTarget){
                return
            }
            setOpenDropdown(false)
        }
    }>
      {/* Dropdown Modal */}
      <div className=' bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl'>
        <h3 className=' dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8'>All Boards ({boards.length})</h3>
        {/* MAJEED SAID KEEP IN UR HEAD 0.02120 */}
        <div>
            {boards.map((board, index) => (
                <div className={` flex items-baseline space-x-2 px-5 py-4 cursor-pointer hover:bg-[#635fc7] hover:opacity-80 hover:text-white duration-500 mr-8 rounded-r-full ${board.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`} key={index} onClick={() => {
                    dispatch(boardsSlice.actions.setBoardActive({index}))
                }}>
                    {/* <img src={boardIcon} alt="" className=' h-4'/> */}
                    <p className=' text-lg font-bold dark:text-white cursor-pointer '>{board.name}</p>
                </div>
            ))}

            <div className=' flex items-baseline space-x-2 text-[#635fc7] px-5 py-4 cursor-pointer ' onClick={() => {
                setBoardModalOpen(true)
                setOpenDropdown(false)
            }}>
                <p className=' text-lg font-bold hover:opacity-85'>
                    Create New Board
                </p>
            </div>


            <div className=' mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
                <LightModeIcon className=' text-slate-500'/>
                <div onClick={toggleDarkMode} className=' hover:cursor-pointer dark:bg-[#635fc7] dark:justify-end duration-700 bg-gray-200 flex w-1/6 h-8 rounded-full items-center p-2'>
                    <div className='h-6 w-6 bg-white rounded-full'></div>
                </div>
                <DarkModeIcon className=' text-slate-500'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderDropdown
