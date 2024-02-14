import React, { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import "./Password.css"


function Password() {
    const [length , setLength] = useState(8);
    const [number , setNumber] =useState(false);
    const [characters , setCharacters] = useState(false);
    const [password , setPassword] = useState("");
    const passwordGenerator = useCallback(() => {
        let pass =""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        
        if(number) str += "0123456789";
        if(characters) str += "!@#$%^&*(){";

        for (let index = 1; index <= length; index++) {
           let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char)           
        }
        setPassword(pass);
    }, [length, number, characters , setPassword])
    const passwordRef = useRef(null);
    const copytoclipboard = useCallback(()=>{
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    } , [password])
    
    useEffect(()=>{
        passwordGenerator()
    } , [length, number, characters , passwordGenerator])
  return (
    <>
    <h1 >Password Generator</h1>
    <div style={{textAlign:"center"}} className='firstdiv'>
     
      <input 
      type="text" 
       value={password}
      placeholder='password' 
      className='input' 
      readOnly
      ref={passwordRef} />
      <button onClick={copytoclipboard}>copy</button>
      <div className='inputs'>
        <input 
        type="range"
        min={5}
        max={20} 
        value={length}
        onChange={(e)=>{
            setLength(e.target.value)
        }} />
        <label  >Length: {length}</label>
        
        <input
        type="checkbox" 
        defaultChecked={number}
        name="" id=""
        onChange={()=>{
            setNumber((prev)=> !prev);
        }}/>
        <label >Numbers</label>
        <input
        type="checkbox" 
        name="" id=""
        defaultChecked={characters}
        onChange={()=> {
            setCharacters((prev) => !prev);
        }}
        />
        <label >Characters</label>
      </div>

    </div>
    <div><button onClick={()=>{
    passwordGenerator()
}}>Generate Password</button></div>
    </>
  )
}

export default Password
