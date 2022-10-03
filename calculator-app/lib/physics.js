import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine = Engine.create({});

export const AddNum = (num, color, textColor) => {
  World.add(engine.world, ball(num, color, textColor));
}

var spawnInfo = {
  xOffset: 65,
  yOffset: 65,
  radius: 40
}

var ball = function (num, color, textColor) {
  const {xOffset, yOffset, radius} = spawnInfo;
  xOffset = window.innerWidth/2;
  console.log(color);
  return Bodies.circle(xOffset, yOffset, radius, {
    render: {
      sprite: {
        texture: createImage(num, color, textColor)
      }
    }
  });
}

var extendWall = function (num, color, textColor) {
  const {xOffset, yOffset, radius} = spawnInfo;
  xOffset = window.innerWidth/2;
  console.log(color);
  return Bodies.circle(xOffset, yOffset, radius, {
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

    World.add(engine.world, [calculatorBody, floor]);

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

export function RemoveAll(){
  World.clear(engine.world, ball);
}