'use client'
import { useState, useEffect, useCallback, useRef } from 'react';

export default function Tetris() {
  // Game board dimensions
  const ROWS = 20;
  const COLS = 10;
  
  // Tetromino shapes
  const SHAPES = [
    // I
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    // J
    [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]
    ],
    // L
    [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0]
    ],
    // O
    [
      [4, 4],
      [4, 4]
    ],
    // S
    [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]
    ],
    // T
    [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
    // Z
    [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ]
  ];
  
  // Colors based on tetromino type
  const COLORS = [
    'bg-transparent',
    'bg-cyan-400',    // I
    'bg-blue-500',    // J
    'bg-orange-500',  // L
    'bg-yellow-400',  // O
    'bg-green-500',   // S
    'bg-purple-500',  // T
    'bg-red-500'      // Z
  ];
  
  // Game states
  const [board, setBoard] = useState(createEmptyBoard());
  const [current, setCurrent] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [nextPiece, setNextPiece] = useState(Math.floor(Math.random() * SHAPES.length));
  
  // Refs
  const requestIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const dropTimeRef = useRef(1000);
  const dropCounterRef = useRef(0);

  // Create an empty game board
  function createEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
  
  // Generate a new tetromino
  const generateTetromino = useCallback(() => {
    const shape = SHAPES[nextPiece];
    setCurrent(shape);
    setPosition({ x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 });
    setNextPiece(Math.floor(Math.random() * SHAPES.length));
    
    // Check if game is over
    if (!isValidMove(shape, { x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 })) {
      setGameOver(true);
    }
  }, [nextPiece]);
  
  // Initialize the game
  useEffect(() => {
    if (!current) {
      generateTetromino();
    }
    
    // Handle keyboard controls
    const handleKeyDown = (e) => {
      if (gameOver || paused) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          moveHorizontal(-1);
          break;
        case 'ArrowRight':
          moveHorizontal(1);
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
        case ' ':
          hardDrop();
          break;
        case 'p':
        case 'P':
          setPaused(prev => !prev);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [current, position, board, gameOver, paused]);
  
  // Game loop
// Game loop
useEffect(() => {
  if (gameOver || paused || !current) return;
  
  const gameLoop = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    
    const deltaTime = timestamp - lastTimeRef.current;
    dropCounterRef.current += deltaTime;
    
    if (dropCounterRef.current > dropTimeRef.current) {
      moveDown();
      dropCounterRef.current = 0;
    }
    
    lastTimeRef.current = timestamp;
    requestIdRef.current = requestAnimationFrame(gameLoop);
  };
  
  requestIdRef.current = requestAnimationFrame(gameLoop);
  
  // Cleanup
  return () => {
    cancelAnimationFrame(requestIdRef.current);
    lastTimeRef.current = 0;
  };
}, [gameOver, paused, level, current]); // current を依存配列に追加
  // Check if the move is valid
const isValidMove = useCallback((shape, newPos) => {
  // shape が null または undefined の場合は false を返す
  if (!shape) return false;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const boardX = x + newPos.x;
        const boardY = y + newPos.y;
        
        // Check boundaries
        if (boardX < 0 || boardX >= COLS || boardY >= ROWS) {
          return false;
        }
        
        // Check collision with existing blocks (ignoring if we're above the board)
        if (boardY >= 0 && board[boardY][boardX] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}, [board]);
  
  // Move tetromino horizontally
  const moveHorizontal = useCallback((dir) => {
    const newPos = { ...position, x: position.x + dir };
    if (isValidMove(current, newPos)) {
      setPosition(newPos);
    }
  }, [current, position, isValidMove]);
  
  // Move tetromino down
const moveDown = useCallback(() => {
  // current が null の場合は何もしない
  if (!current) return;
  
  const newPos = { ...position, y: position.y + 1 };
  if (isValidMove(current, newPos)) {
    setPosition(newPos);
  } else {
    // Tetromino has landed
    mergeTetromino();
  }
}, [current, position, isValidMove]);
  
  // Hard drop tetromino
  const hardDrop = useCallback(() => {
    let newY = position.y;
    while (isValidMove(current, { x: position.x, y: newY + 1 })) {
      newY++;
    }
    setPosition({ ...position, y: newY });
    mergeTetromino();
  }, [current, position, isValidMove]);
  
  // Rotate tetromino
  const rotate = useCallback(() => {
    const rotated = current.map((_, i) => current.map(col => col[i])).reverse();
    
    if (isValidMove(rotated, position)) {
      setCurrent(rotated);
    } else {
      // Try wall kick (adjust position if rotation puts piece against wall)
      const kicks = [1, -1, 2, -2];
      for (const kick of kicks) {
        if (isValidMove(rotated, { ...position, x: position.x + kick })) {
          setCurrent(rotated);
          setPosition({ ...position, x: position.x + kick });
          break;
        }
      }
    }
  }, [current, position, isValidMove]);
  
  // Merge tetromino with the board
  const mergeTetromino = useCallback(() => {
    const newBoard = [...board];
    
    for (let y = 0; y < current.length; y++) {
      for (let x = 0; x < current[y].length; x++) {
        if (current[y][x] !== 0) {
          const boardY = y + position.y;
          const boardX = x + position.x;
          
          if (boardY >= 0) {
            newBoard[boardY][boardX] = current[y][x];
          }
        }
      }
    }
    
    setBoard(newBoard);
    clearLines(newBoard);
    generateTetromino();
  }, [board, current, position, generateTetromino]);
  
  // Clear completed lines
  const clearLines = useCallback((gameBoard) => {
    let linesCleared = 0;
    const newBoard = gameBoard.filter(row => {
      const isLineComplete = row.every(cell => cell !== 0);
      if (isLineComplete) linesCleared++;
      return !isLineComplete;
    });
    
    // Add new empty lines at the top
    while (newBoard.length < ROWS) {
      newBoard.unshift(Array(COLS).fill(0));
    }
    
    if (linesCleared > 0) {
      // Update score based on cleared lines
      const linePoints = [40, 100, 300, 1200]; // Points for 1, 2, 3, 4 lines
      const points = linePoints[linesCleared - 1] * level;
      setScore(prevScore => prevScore + points);
      
      // Update lines and level
      const newLines = lines + linesCleared;
      setLines(newLines);
      
      // Level up every 10 lines
      const newLevel = Math.floor(newLines / 10) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        // Increase speed with each level
        dropTimeRef.current = Math.max(100, 1000 - (newLevel - 1) * 100);
      }
      
      setBoard(newBoard);
    }
  }, [lines, level]);
  
  // Restart game
  const restartGame = () => {
    setBoard(createEmptyBoard());
    setCurrent(null);
    setGameOver(false);
    setPaused(false);
    setScore(0);
    setLevel(1);
    setLines(0);
    setNextPiece(Math.floor(Math.random() * SHAPES.length));
    dropTimeRef.current = 1000;
    dropCounterRef.current = 0;
  };
  
  // Calculate the ghost piece position (shadow)
  const getGhostPosition = useCallback(() => {
    if (!current) return position;
    
    let ghostY = position.y;
    while (isValidMove(current, { x: position.x, y: ghostY + 1 })) {
      ghostY++;
    }
    
    return { x: position.x, y: ghostY };
  }, [current, position, isValidMove]);
  
  const ghostPosition = getGhostPosition();
  
  // Render tetromino ghost (shadow)
  const renderGhost = () => {
    if (!current || gameOver) return null;
    
    return current.map((row, y) => {
      return row.map((cell, x) => {
        if (cell !== 0) {
          const boardX = x + ghostPosition.x;
          const boardY = y + ghostPosition.y;
          
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            return (
              <div 
                key={`ghost-${boardY}-${boardX}`}
                className={`absolute border border-gray-500 opacity-30 ${COLORS[cell]}`}
                style={{
                  width: '100%',
                  height: '100%',
                  top: `${boardY * 100}%`,
                  left: `${boardX * 100}%`,
                }}
              />
            );
          }
        }
        return null;
      });
    });
  };
  
  // Render current tetromino
  const renderCurrent = () => {
    if (!current || gameOver) return null;
    
    return current.map((row, y) => {
      return row.map((cell, x) => {
        if (cell !== 0) {
          const boardX = x + position.x;
          const boardY = y + position.y;
          
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            return (
              <div 
                key={`current-${boardY}-${boardX}`}
                className={`absolute border border-gray-700 ${COLORS[cell]}`}
                style={{
                  width: '100%',
                  height: '100%',
                  top: `${boardY * 100}%`,
                  left: `${boardX * 100}%`,
                }}
              />
            );
          }
        }
        return null;
      });
    });
  };
  
  // Render next piece preview
  const renderNextPiece = () => {
    const shape = SHAPES[nextPiece];
    
    return (
      <div className="relative w-24 h-24 mx-auto bg-gray-900 mb-4">
        {shape.map((row, y) => (
          row.map((cell, x) => (
            cell !== 0 && (
              <div
                key={`next-${y}-${x}`}
                className={`absolute border border-gray-700 ${COLORS[cell]}`}
                style={{
                  width: '24%',
                  height: '24%',
                  top: `${(y + 0.5) * 25}%`,
                  left: `${(x + 0.5) * 25}%`,
                }}
              />
            )
          ))
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-mono text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">React Tetris</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Game board */}
        <div className="relative h-96 md:h-auto md:w-64 border-4 border-gray-700 bg-gray-900">
          {/* Render all cells */}
          <div 
            className="relative w-full"
            style={{ paddingTop: `${ROWS/COLS * 100}%` }}
          >
            {/* Board grid */}
            {board.map((row, y) => (
              row.map((cell, x) => (
                <div
                  key={`${y}-${x}`}
                  className={`absolute border border-gray-800 ${cell ? COLORS[cell] : 'bg-gray-900'}`}
                  style={{
                    width: `${100/COLS}%`,
                    height: `${100/ROWS}%`,
                    top: `${y * (100/ROWS)}%`,
                    left: `${x * (100/COLS)}%`,
                  }}
                />
              ))
            ))}
            
            {renderGhost()}
            {renderCurrent()}
            
            {/* Game over overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                <div className="text-white text-center p-4">
                  <h2 className="text-2xl font-bold mb-4">Game Over</h2>
                  <p className="mb-4">Score: {score}</p>
                  <button
                    onClick={restartGame}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
            
            {/* Pause overlay */}
            {paused && !gameOver && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <h2 className="text-2xl font-bold">Paused</h2>
                  <p className="mt-2">Press P to continue</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Game info */}
        <div className="w-64 flex flex-col">
          <div className="bg-white p-4 mb-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2 text-center">Next Piece</h2>
            {renderNextPiece()}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Score</h2>
              <p className="text-2xl font-mono">{score}</p>
            </div>
            
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Level</h2>
              <p className="text-2xl font-mono">{level}</p>
            </div>
            
            <div className="mb-4">  
              <h2 className="text-lg font-bold mb-2">Lines</h2>
              <p className="text-2xl font-mono">{lines}</p>
            </div>
            
            <button
              onClick={() => setPaused(prev => !prev)}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none mb-2"
              disabled={gameOver}
            >
              {paused ? "Resume" : "Pause"}
            </button>
            
            <button
              onClick={restartGame}
              className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded focus:outline-none"
            >
              New Game
            </button>
          </div>
          
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-2">Controls</h2>
            <ul className="text-sm">
              <li>← → : Move</li>
              <li>↑ : Rotate</li>
              <li>↓ : Soft Drop</li>
              <li>Space : Hard Drop</li>
              <li>P : Pause</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
