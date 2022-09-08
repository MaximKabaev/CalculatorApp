// MatterStepOne.js
import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import create from "zustand"

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

    const calculatorBody = Bodies.rectangle(x, y, 340, 573, {
      isStatic: true,
      render: {
        fillStyle: 'none'
      }
    });

    const ball = Bodies.circle(x, 45, 10, {
      restitution: 0.9,
      render: {
        fillStyle: 'yellow'
      }
    });

    World.add(engine.world, [calculatorBody, ball]);

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