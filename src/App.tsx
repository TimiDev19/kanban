import React, { useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Header from './components/Navbar';
import Middle from './components/Middle';
import { useDispatch, useSelector } from 'react-redux';
import boardsSlice from './redux/BoardsSlice';


function App() {
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards)
  const activeBoard = boards.find(board => board.isActive)
  if(!activeBoard && boards.length > 0){
    dispatch(boardsSlice.actions.setBoardActive({index: 0}))
  }
  const [boardModalOpen, setBoardModalOpen] = useState(false)

  return (
    <div className=' overflow-hidden overflow-x-scroll'>


      <BrowserRouter>
        <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen}/>
        <Middle boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen}/>
        <Routes>

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;

