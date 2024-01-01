import React, { useEffect, useRef, useState } from "react";
function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 1;
    canvas.height = window.innerHeight * 1;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(1,1)
    context.linecap = "round"
    context.strokeStyle = "red"
    context.lineWidth = 5
    contextRef.current = context;
    
  },[])

  const startDrawing = ({nativeEvent}) =>{
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () =>{
    contextRef.current.closePath()
    setIsDrawing(false)
    
  }

  const draw = ({nativeEvent}) =>{
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    
  }

  return (
    <canvas
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={draw}
    ref={canvasRef}
    
    
    />
  );
}

export default App;
