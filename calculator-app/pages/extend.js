import React, { useEffect, useRef } from 'react';
import {ButtonLine} from "./index.js";

// {text:'x²'}, {text:'x³'}, {text:'xⁿ'},
// {text:'x!'}, {text:'x√'}, {text:'x∛'},
// {text:'x∜'}, {text:'x^'}, {text:'x^2'},

export function Extended(){
    const texts = [{text:"Inv"}, {text:'Sin'}, {text:'ln'}, 
        {text:'Cos'}, {text:'log'}, {text:'Tan'}, 
        {text:'xⁿ'}, {text:'x!'}, {text:'ⁿ√x'},
        {text:'('}, {text:')'}, {text:'%'},
        {text:'π'}, {text:'e'}, {text:'Ans'}
    ]; 
    return(
        <div className='flex justify-center items-center'>
            <div className='bg-zinc-700 h-[425px] w-[290px] rounded-2xl flex justify-center mainBody'>
                <ul>
                    <li className=''>
                        <ul className="h-[50%] translate-y-[37px]">
                            <ButtonLine pt={0} Sym1={<TextObjcect{...texts[0]}/>} Sym2={<TextObjcect{...texts[1]}/>} Sym3={<TextObjcect{...texts[2]}/>} id={["inv", "sin(", "ln("]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[3]}/>} Sym2={<TextObjcect{...texts[4]}/>} Sym3={<TextObjcect{...texts[5]}/>} id={["cos(", "log(", "tan("]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[6]}/>} Sym2={<TextObjcect{...texts[7]}/>} Sym3={<TextObjcect{...texts[8]}/>} id={["^", "!", "sqr("]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[9]}/>} Sym2={<TextObjcect{...texts[10]}/>} Sym3={<TextObjcect{...texts[11]}/>} id={["(", ")", "%"]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[12]}/>} Sym2={<TextObjcect{...texts[13]}/>} Sym3={<TextObjcect{...texts[14]}/>} id={["pi", "e", "Ans"]}/>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function TextObjcect({text}){
    return(
        <div class='text-xl'>
            {text}
        </div>
    );
}