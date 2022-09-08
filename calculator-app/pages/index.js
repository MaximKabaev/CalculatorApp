import Head from 'next/head'
import create from "zustand"
import ApplyPhysics from './physics.js';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { TbNumber1, TbNumber2, TbNumber3, TbNumber4, TbNumber5, TbNumber6, TbNumber7, TbNumber8, TbNumber9, TbNumber0 } from 'react-icons/tb';
import {HiBackspace, HiFire} from 'react-icons/hi';
import {GiFireSpellCast, GiDiceFire} from 'react-icons/gi';
import{FaTimes} from 'react-icons/fa';
import{TiDivide, TiPlus, TiMinus, TiEquals} from 'react-icons/ti';
import{BsDot} from 'react-icons/bs';

import {evaluate} from "mathjs";

const useInputStore = create((set) => ({
    input: "",
    setInput: (input) => set({ input }),
}))

const ButtonLine = ({pt, Sym1, Sym2, Sym3, Sym4, hideLastElement, stretchLastElement, id}) => {
  const liClass = 'flex justify-center items-center flex-row pt-' + pt;
  let hidden;
  hideLastElement ? hidden='text-black invisible' : hidden='text-black';

  const { press } = useButtonPress();

  return (
    <li class={liClass}>
      <ul class='flex flex-row w-full'>
        <li class='pr-6 text-black'><button onClick={() => press(id[0])} class='w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div class='w-full h-full flex justify-center items-center'>{Sym1}</div></button></li>
        <li class='pr-6 text-black'><button onClick={() => press(id[1])} class='w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div class='w-full h-full flex justify-center items-center'>{Sym2}</div></button></li>
        <li class='pr-6 text-black'><button onClick={() => press(id[2])} class='w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div class='w-full h-full flex justify-center items-center'>{Sym3}</div></button></li>
        {stretchLastElement ? <li class={hidden}><button onClick={() => press(id[3])} class='w-[50px] h-[124px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none -translate-y-[74px]'><div class='w-full h-full flex justify-center items-center'>{Sym4}</div></button></li> :
        <li class={hidden}><button onClick={() => press(id[3])} class='w-[50px] h-[50px] bg-gray-300 shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full text-3xl leading-none'><div class='w-full h-full flex justify-center items-center'>{Sym4}</div></button></li>}
      </ul>
    </li>
  );
}

export default function Home() {
  const { input } = useInputStore();
  return (
    <div>
      <Head>
        <title>Calculator App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hidden pt-6"/>

      <main class='bg-gray-900 shadow-[4px_4px_4px_rgba(0,0,0,0.25)]'>
        <div class='flex justify-center items-center h-screen'>
          <div class='bg-zinc-700 h-[573px] w-[340px] rounded-2xl flex justify-center'>
            <ul>
              <li class='absolute translate-y-14 translate-x-2 z-50'><button><HiFire class='w-6 h-6'/></button></li>
              <input value={input} class="bg-black h-[100px] w-[275px] rounded-2xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] translate-y-11
              text-white outline-none text-right pt-12 pr-2 pl-2"/>
              <li class=''>
                <ul className="h-[50%] translate-y-[68px]">
                  <ButtonLine pt={0} Sym1={<GiFireSpellCast/>} Sym2={<TiDivide/>} Sym3={<FaTimes/>} Sym4={<TiPlus/>} id={["C", "/", "*", "+"]}/>
                  <ButtonLine pt={6} Sym1={<TbNumber1/>} Sym2={<TbNumber2/>} Sym3={<TbNumber3/>} Sym4={<TiMinus/>} id={["1", "2", "3", "-"]}/>
                  <ButtonLine pt={6} Sym1={<TbNumber4/>} Sym2={<TbNumber5/>} Sym3={<TbNumber6/>} Sym4={<BsDot/>} id={["4", "5", "6", "."]}/>
                  <ButtonLine pt={6} Sym1={<TbNumber7/>} Sym2={<TbNumber8/>} Sym3={<TbNumber9/>} Sym4={<TbNumber0/>} hideLastElement={true} id={["7", "8", "9", ""]}/>
                  <ButtonLine pt={6} Sym1={<GiDiceFire/>} Sym2={<TbNumber0/>} Sym3={<HiBackspace/>} Sym4={<TiEquals/>} stretchLastElement={true} id={["theme", "0", "<-", "="]}/>
                </ul>
              </li>
            </ul>
          </div>
          
        </div>
      </main>

      <footer>

      </footer>
    </div>
  )
}

function useButtonPress() {
  const { input, setInput } = useInputStore();

  const press = (id) => {    
    
    if (id === "C") {
      setInput("");
    } else if (id === "<-") {
      console.log(input, "vs", JSON.stringify(input), "vs", String(input));
      setInput(String(input).slice(0, -1));
    } else if (id === "=") {
      setInput(evaluate(input));
    } else {
      setInput(input + id);
    }
  }


  return {press}
}