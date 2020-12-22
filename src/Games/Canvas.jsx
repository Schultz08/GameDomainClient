import React, { useRef, useEffect } from 'react'


const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  const draw = (ctx, frameCount) => {
  }
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const render = () => {
      draw(),
      update()
    }
    render()
    
    return () => {
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default {Canvas, canvasContext}