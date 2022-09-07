import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World } from 'matter-js'

export default function ApplyPhysics(comp) {
    let engine = Engine.create();

    let render = Render.create({
        element: document.body,
        engine: engine
    });

    let boxA = Bodies.rectangle(400, 200, 80, 80);
    let boxB = Bodies.rectangle(450, 50, 80, 80);
    let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Composite.add(engine.world, [boxA, boxB, ground]);

    Render.run(render);

    let runner = Runner.create();

    Runner.run(runner, engine);
}