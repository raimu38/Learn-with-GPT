'use client'
import React {useRef} from 'react'

export default function soundButton(){
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound=(){
    if(audioRef.current){
      audioRef.current.play();
  }

    return(
      <div>
        <button onClick={playSound}>
          PlaySound
        </button>
        
      </div>
    )
}
