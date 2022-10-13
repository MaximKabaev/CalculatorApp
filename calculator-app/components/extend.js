import React, { useEffect, useRef } from 'react';
import {ButtonLine, currentColorTheme} from "../pages/index.js";

// {text:'x²'}, {text:'x³'}, {text:'xⁿ'},
// {text:'x!'}, {text:'x√'}, {text:'x∛'},
// {text:'x∜'}, {text:'x^'}, {text:'x^2'},

export function Extended(){
    const texts = [{text:"Inv"}, {text:'Sin'}, {text:'ln'}, 
        {text:'Cos'}, {text:'log'}, {text:'Tan'}, 
        {text:'xⁿ'}, {text:'√'}, {text:'∛'},
        {text:'('}, {text:')'}, {text:'%'},
        {text:'π'}, {text:'e'}, {text:'x!'}
    ]; 

    useEffect(() => {
        const mainBody = document.getElementsByClassName("mainBody");
        for (let i = 0; i < mainBody.length; i++) {
            mainBody[i].style.backgroundColor = currentColorTheme.body;
        } 

        const buttons = document.getElementsByClassName("changeButtonColor");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = currentColorTheme.button;
        }

        if(currentColorTheme.buttonText){
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.color = "white";
            }
            }
            else{
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.color = "black";
            }
        }
    }, []);

    return(
        <div className='flex justify-center items-center'>
            <div className='bg-zinc-700 h-[412px] w-[290px] rounded-r-2xl flex justify-center mainBody'>
                <ul>
                    <li className=''>
                        <ul className="h-[50%] translate-y-[20px]">
                            <ButtonLine pt={0} Sym1={<TextObjcect{...texts[0]}/>} Sym2={<TextObjcect{...texts[1]}/>} Sym3={<TextObjcect{...texts[2]}/>} hideLastElement={true} id={["⁻¹", "sin(", "ln("]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[3]}/>} Sym2={<TextObjcect{...texts[4]}/>} Sym3={<TextObjcect{...texts[5]}/>} hideLastElement={true} id={["cos(", "log(", "tan("]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[6]}/>} Sym2={<TextObjcect{...texts[7]}/>} Sym3={<TextObjcect{...texts[8]}/>} hideLastElement={true} id={["^", "sqrt(", "cbrt("]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[9]}/>} Sym2={<TextObjcect{...texts[10]}/>} Sym3={<TextObjcect{...texts[11]}/>} hideLastElement={true} id={["(", ")", "%"]}/>
                            <ButtonLine pt={6} Sym1={<TextObjcect{...texts[12]}/>} Sym2={<TextObjcect{...texts[13]}/>} Sym3={<TextObjcect{...texts[14]}/>} hideLastElement={true} id={["pi", "e", "!"]}/>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function TextObjcect({text}){
    return(
        <div className='text-xl'>
            {text}
        </div>
    );
}