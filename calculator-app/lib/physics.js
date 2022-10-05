import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Engine = Matter.Engine;
const Render = Matter.Render;
const Composite = Matter.Composite;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine = Engine.create({});

export const AddNum = (num, color, textColor) => {
  Composite.add(engine.world, ball(num, color, textColor));
}

export const CreateExtendWall = () =>{
  Composite.add(engine.world, extendWall());

}

export function RemoveExtendWall(){
  engine.world.bodies.forEach((body)=>{
    if(body.label == 'extendWall'){
      Matter.Composite.remove(engine.world, body)
    }
  });
}

export function RemoveAll(){
  Composite.clear(engine.world, ball);
}

var spawnInfo = {
  xOffset: 65,
  yOffset: 65,
  radius: 40
}

var extendWall = function () {
  const {xOffset, yOffset} = spawnInfo;
  xOffset = window.innerWidth/2 + 290;
  yOffset = window.innerHeight/2 + 74;
  return Bodies.rectangle(xOffset, yOffset, 290, 425, {
    isStatic: true,
    label: "extendWall",
    chamfer: 16,
    render: {
      fillStyle: 'none'
    }
  });
}

var ball = function (num, color, textColor) {
  const {xOffset, yOffset, radius} = spawnInfo;
  xOffset = window.innerWidth/2;
  console.log(color);
  return Bodies.circle(xOffset, yOffset, radius, {
    label: "ball",
    render: {
      sprite: {
        texture: createImage(num, color, textColor)
      }
    }
  });
}

export function PhysicsMap() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: x*2,
        height: y*2,
        background: 'none',
        wireframes: false
      }
    });

    const floor = Bodies.rectangle(x, y*2, x*2, 10, {
      isStatic: true,
      render: {
        fillStyle: 'none'
      }
    });

    const calculatorBody = Bodies.rectangle(x, y, 340, 573, {
      isStatic: true,
      chamfer: 16,
      render: {
        fillStyle: 'none'
      }
    });

    Composite.add(engine.world, [calculatorBody, floor]);

    Engine.run(engine);
    Render.run(render);
  }, []);

  return (
    <div
        id="body"
        className="w-full h-full fixed"
        ref={boxRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

function createImage(string, color, textColor) {

    let drawing = document.createElement("canvas");

    drawing.width = '150'
    drawing.height = '150'

    let ctx = drawing.getContext("2d");

    ctx.fillStyle = color;
    //ctx.fillRect(0, 0, 150, 150);
    ctx.beginPath();
    ctx.arc(75, 75, 40, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = textColor;
    ctx.font = "25pt sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(string, 75, 85);
    // ctx.strokeText("Canvas Rocks!", 5, 130);

    return drawing.toDataURL("image/png");
}