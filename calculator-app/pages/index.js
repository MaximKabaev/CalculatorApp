import Head from 'next/head'
import { motion, AnimatePresence} from "framer-motion";


import {PhysicsMap, AddNum, RemoveAll, CreateExtendWall, RemoveExtendWall} from '../lib/physics.js';
import {Extended} from '../components/extend.js';

import create from "zustand";
import { TbNumber1, TbNumber2, TbNumber3, TbNumber4, TbNumber5, TbNumber6, TbNumber7, TbNumber8, TbNumber9, TbNumber0, TbMath } from 'react-icons/tb';
import {HiBackspace, HiFire} from 'react-icons/hi';
import {GrClear} from 'react-icons/gr';
import{FaTimes, FaExpandArrowsAlt} from 'react-icons/fa';
import{TiDivide, TiPlus, TiMinus, TiEquals} from 'react-icons/ti';
import{BsDot, BsPaintBucket} from 'react-icons/bs';

import {evaluate, format} from "mathjs";
import { useEffect, useState } from 'react';

let ballColor = '#393E46';
let ballTextColor = '#FFFFFF';
let resultGiven = false;

// let showExtend = false;

// let showExtend = localStorage.getItem('showExtend');

// let inverceMode = false;
// let inverceStartPos = -1;

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

const extendVariants = {
  hidden: { opacity: 0, x: 1000, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 1000, y: 0 },
}

const useInputStore = create((set) => ({
    input: "",
    setInput: (input) => set({ input }),
}))

export const ButtonLine = ({pt, Sym1, Sym2, Sym3, Sym4, hideLastElement, stretchLastElement, id}) => {
  const liClass = 'flex justify-center items-center flex-row pt-' + pt;
  let hidden;
  // hideLastElement ? hidden='pl-6 text-black invisible' : hidden='pl-6 text-black';

  const { press } = useButtonPress();

  return (
    <li className={liClass}>
      <ul className='flex flex-row w-full'>
        <li className='text-black'><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => press(id[0])} className='changeButtonColor w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div className='w-full h-full flex justify-center items-center'>{Sym1}</div></motion.button></li>
        <li className='pl-6 text-black'><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => press(id[1])} className='changeButtonColor w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div className='w-full h-full flex justify-center items-center'>{Sym2}</div></motion.button></li>
        <li className='pl-6 text-black'><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => press(id[2])} className='changeButtonColor w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div className='w-full h-full flex justify-center items-center'>{Sym3}</div></motion.button></li>
        {!hideLastElement ? 
                  stretchLastElement ? 
                  <li className="pl-6 text-black"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => press(id[3])} className='changeButtonColor w-[50px] h-[124px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none -translate-y-[75px] fixed equal' style="transform: none;"><div className='w-full h-full flex justify-center items-center'>{Sym4}</div></motion.button></li> :
                  <li className="pl-6 text-black"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => press(id[3])} className='changeButtonColor w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div className='w-full h-full flex justify-center items-center'>{Sym4}</div></motion.button></li> : 
        null}
      </ul>
    </li>
  );
}

let el = null;
let playedExtendAnim = false;

export default function Home() {
  const [extendState, switcher] = useState(false)
  const { press } = useButtonPress();
  // const {extend} = SwitchExtendMode();
  useEffect(() => {
    const detectKeyDown = (e) =>{
      press(e.key);
    }
    document.addEventListener('keydown', detectKeyDown, true);
    document.addEventListener('click', inputClick, false);
    el = document.getElementById('extendElement');
    console.log(el);
    // const el = document.getElementById('container');
    // console.log(el);

    const equalSign = document.getElementsByClassName('equal');
    equalSign[0].style.transform = 'none';

    // const expandEl = document.getElementById('expand');
    // expandEl.style.transform = 'none';
    createNewTheme();
  }, []);

  const { input, setInput} = useInputStore();


  const inputClick = () => {
    const input_ = document.getElementById('input');

    const end = input_.value.length;
  
    input_.setSelectionRange(end, end);
    input_.focus();
  }

  function handleChange() {
    switcher(!extendState);
    if(extendState){RemoveExtendWall();}else{
      CreateExtendWall();
    }
  }

  return (
    <div>
      <PhysicsMap className='fixed'/>
      <Head>
        <title>Calculator App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hidden pt-6"/>

      <main className='bg-gray-900 shadow-[4px_4px_4px_rgba(0,0,0,0.25)] -z-50' id='bg'>
      <motion.main
      variants={variants}
      initial="hidden"
      animate="enter" 
      exit="exit" 
      transition={{ type: 'linear' }} 
      className=""
      >
        <div className='flex justify-center items-center h-screen'>
          <div className='bg-zinc-700 h-[573px] w-[340px] rounded-2xl flex justify-center mainBody'>
            <ul>
              <li className="absolute translate-y-[50px] translate-x-2 z-50"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className='absolute' onClick={handleChange}><TbMath id="expand" size={28}/></motion.button></li>
              <input value={input} id="input" className="bg-black h-[100px] w-[275px] rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] translate-y-11
              text-white outline-none text-right pt-12 pr-2 pl-2 caret-transparent"/>
              <li className=''>
                <ul className="h-[50%] translate-y-[68px]">
                  <ButtonLine pt={0} Sym1={<GrClear />} Sym2={<TiDivide/>} Sym3={<FaTimes/>} Sym4={<TiPlus/>} id={["C", "/", "×", "+"]}/>
                  <ButtonLine pt={6} Sym1={<TbNumber1/>} Sym2={<TbNumber2/>} Sym3={<TbNumber3/>} Sym4={<TiMinus/>} id={["1", "2", "3", "-"]}/>
                  <ButtonLine pt={6} Sym1={<TbNumber4/>} Sym2={<TbNumber5/>} Sym3={<TbNumber6/>} Sym4={<BsDot/>} id={["4", "5", "6", "."]}/>
                  <ButtonLine pt={6} Sym1={<TbNumber7/>} Sym2={<TbNumber8/>} Sym3={<TbNumber9/>} Sym4={<TiEquals/>} stretchLastElement={true} id={["7", "8", "9", "="]}/>
                  <ButtonLine pt={6} Sym1={<BsPaintBucket/>} Sym2={<TbNumber0/>} Sym3={<HiBackspace/>} Sym4={<TbNumber0/>} hideLastElement={true} id={["theme", "0", "<-", ""]}/>
                </ul>
              </li>
            </ul>
          </div>
          <div id="extendElement" className='fixed translate-y-[73px] translate-x-[290px]'>
            <AnimatePresence>{extendState && 
                <motion.main
                variants={extendVariants} 
                initial="hidden" 
                animate="enter" 
                exit="exit" 
                transition={{ type: 'linear' }} 
                className=""
                >
                  <Extended /> 
                </motion.main>}
            </AnimatePresence>
        </div>
      </div>
      </motion.main>
      </main>

      <footer>

      </footer>
    </div>
  )
}

function useButtonPress() {
  const { setInput } = useInputStore();
  

  // if(num != undefined) {setInput(num);}
  const press = (id) => {    
    if(id == 'Shift' || id == 'Control' || id == 'Left Control'){return;}
    let input = document.getElementById('input').value;
    if(resultGiven && input == "0"){
      input = "";
    }
    else if(input == "SYNTAX ERROR"){
      input="";
    }
    resultGiven = false;
    if (id === "C" || id === "Escape") {
      RemoveAll();
      setInput("");
    } else if (id === "<-" || id === "Backspace") {
      setInput(String(input).slice(0, -1));
    } else if (id === "=" || id === "Enter") {
      resultGiven = true;
      setInput(Calculate(input));
    } else if (id === "theme") {
      createNewTheme()
    // } else if(id==="inv"){
    //   inverceMode = !inverceMode;
    //   if(inverceMode){inverceStartPos=input.length-1;}
    } else {
      const filteredChar = FilterText(id, input);
      console.log(filteredChar);
      setInput(filteredChar);
      AddNum(id, ballColor, ballTextColor);
    }
  }

  return {press}
}

function FilterText(id, input){
  input = input + id;
  for (var i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char === "*") {
      input = input.replace("*", "×");
    }
    else if (char === "/") {
      input = input.replace("/", "÷");
    }
    else if(input.charAt(i+1)==="⁻" && input.charAt(i+2)==="¹" && char === "("){
      const startingText = input.slice(0, i);
      const restOfTheText = input.slice(i+3, input.length);
      input = startingText + "⁻¹(" + restOfTheText;
    }
  }
  return input;
}

function ReFilterText(input){
  for (var i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char === "×") {
      input = input.replace("×", "*");
    }
    else if (char === "÷") {
      input = input.replace("÷", "/");
    }
    else if(input.charAt(i+1)==="¹" && input.charAt(i+2)==="(" && char === "⁻"){
      const startingText = input.slice(0, i-3);
      const trigText = input.slice(i-3, i);
      const restOfTheText = input.slice(i+2, input.length);
      input = startingText + "a" + trigText + restOfTheText;
    }
    else if(input.charAt(i+1)==="¹" && char === "⁻"){
      const startingText = input.slice(0, i);
      const restOfTheText = input.slice(i+2, input.length);
      input = startingText + "^(-1)" + restOfTheText;
      console.log(input);
    }
  }
  return input;
}

const colorSets = [
  {bg: "#2b2d42", input: "#2b2d42", body:"#8d99ae", ball: '#edf2f4', button: '#edf2f4', text: true, buttonText: false}, 
  {bg: "#283618", input: "#606c38", body:"#dda15e", ball: "#fefae0", button: "#fefae0", text: true, buttonText: false}, //
  {bg: "#3D8361", input: "#1C6758", body:"#D6CDA4", ball: "#EEF2E6", button: "#EEF2E6", text: true, buttonText: false}, 
  {bg: "#7868E6", input: "#EDEEF7", body:"#B8B5FF", ball: '#E4FBFF', button: '#E4FBFF', text: false, buttonText: false}, 
  {bg: "#5F6F94", input: "#25316D", body:"#97D2EC", ball: "#FEF5AC", button: "#FEF5AC", text: true, buttonText: false}, 
  {bg: "#222831", input: "#393E46", body:"#FFD369", ball: "#EEEEEE", button: "#EEEEEE", text: true, buttonText: false}, 
  {bg: "#3b3b3b", input: "#3b3b3b", body:"#009063", ball: "#e3e0f3", button: "#e3e0f3", text: true, buttonText: false}
];
export let currentColorTheme = null;
let lastRandomNum = -1;

function createNewTheme () {
  const expandElement = document.getElementById("expand");
  //randomizing the theme
  let randomNum = -1;

  do{
    randomNum = Math.floor(Math.random() * colorSets.length); //num++;//
  } while(randomNum == lastRandomNum);

  lastRandomNum = randomNum;
  const randomTheme = colorSets[randomNum];
  currentColorTheme = randomTheme;
  // num = num + 1;
  const bg = document.getElementById("bg");
  bg.style.backgroundColor = randomTheme.bg;

  const mainBody = document.getElementsByClassName("mainBody");
  for (let i = 0; i < mainBody.length; i++) {
    mainBody[i].style.backgroundColor = randomTheme.body;
  }

  const input = document.getElementById("input");
  input.style.backgroundColor = randomTheme.input;

  const buttons = document.getElementsByClassName("changeButtonColor");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = randomTheme.button;
  }

  if(randomTheme.text) {
    input.style.color = "white";
    expandElement.style.color = "white";
  }
  else{
    input.style.color = "black";
    expandElement.style.color = "black";
  }

  if(randomTheme.buttonText){
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.color = "white";
    }
    ballTextColor = '#FFFFFF';
  }
  else{
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.color = "black";
    }
    ballTextColor = '#000000';
  }

  ballColor = randomTheme.ball;
}

function Calculate(text){
  try{ 
    var result = evaluate(ReFilterText(text));
    result = format(result, {precision: 14});
    return result;
  } catch(e) { return("SYNTAX ERROR"); }
}
