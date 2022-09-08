// MatterStepOne.js
import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import create from "zustand"
import { FaBlackTie } from 'react-icons/fa';

const numbersToSpawn = [];

export const PhysicsMap = () => {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;

    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;

    let engine = Engine.create({});

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

    const spawnInfo = {
        width: window.innerWidth / 2,
        height: 100,
        radius: 40
    }

    const {width, height, radius} = spawnInfo;

    const calculatorBody = Bodies.rectangle(x, y, 340, 573, {
      isStatic: true,
      chamfer: 16,
      render: {
        fillStyle: 'none'
      }
    });

    const floor = Bodies.rectangle(x, y*2, x*2, 10, {
        isStatic: true,
        render: {
          fillStyle: 'none'
        }
      });

    const ball = Bodies.circle(width, height, radius, {
      render: {
        sprite: {
            texture: createImage("1"),
        }
      }
    });


    // const wordBody = Bodies.rectangle(x, 50, 25, 25, {
    //     restitution: 0.95,
    //     friction: 0,
    //     render: {
    //      fillStyle: "#FFFFFF",
    //      text: {
    //       fillStyle: "#000000",
    //       content: "1",
    //       size: 50,
    //      },
    //    },
    //   });

    World.add(engine.world, [calculatorBody, ball, floor]);

    Engine.run(engine);
    Render.run(render);
  }, []);

  return (
    <div
        id="body"
        class="w-full h-full fixed"
        ref={boxRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

function createImage(string) {

    let drawing = document.createElement("canvas");

    drawing.width = '150'
    drawing.height = '150'

    let ctx = drawing.getContext("2d");

    ctx.fillStyle = "none";
    //ctx.fillRect(0, 0, 150, 150);
    ctx.beginPath();
    ctx.arc(75, 75, 40, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "25pt sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(string, 75, 85);
    // ctx.strokeText("Canvas Rocks!", 5, 130);

    return drawing.toDataURL("image/png");
}