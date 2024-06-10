import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Column from './Column'
import { useSelector } from 'react-redux'
import AddEditBoardModal from '../modals/AddEditBoardModal'

const Middle = ({ boardModalOpen, setBoardModalOpen }) => {
  const [windowsize, setWindowSize] = useState(
    [
      window.innerWidth,
      window.innerHeight
    ]
  )

  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  const boards = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive === true)
  const columns = board.columns

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerHeight, window.innerWidth])
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  })


  return (
    <div>
      {
        isSideBarOpen && <Sidebar setIsSidebarOpen={setIsSideBarOpen} setBoardModalOpen={setBoardModalOpen} />
      }


      <div
        className={
          windowsize[0] >= 768 && isSideBarOpen ? ' bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[300px]' :
            ' bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6'
        }>
        {/* {
          windowsize[0] >= 768 && (
            <Sidebar />
          )
        } */}

        {
          !isSideBarOpen &&  <div className='pt-[55vh] cursor-pointer'><button className=' text-white font-bold cursor-pointer p-5 bg-indigo-500 h-fit rounded-r-full' onClick={() => {setIsSideBarOpen(true)}}>Open</button></div>
          // <div className='pt-[55vh] cursor-pointer p-5 bg-indigo-500 h-fit' onClick={() => {setIsSideBarOpen(true)}}>Open</>
        }


        {/* Column Section */}
        {
          columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))
        }




      </div>

      {
        boardModalOpen && <AddEditBoardModal setBoardModalOpen={setBoardModalOpen}/>
      }
    </div>
  )
}

export default Middle
