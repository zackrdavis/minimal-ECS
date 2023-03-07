# Minimal ECS

[![Node.js CI](https://github.com/zackrdavis/minimal-ECS/actions/workflows/node.js.yml/badge.svg)](https://github.com/zackrdavis/minimal-ECS/actions/workflows/node.js.yml)

Implementation of a [Entity-Component-System](https://en.wikipedia.org/wiki/Entity_component_system) architecture in TypeScript.

- Entities: Collections of components - just an object with a unique ID.
- Components: Properties of entities, like `position` or `velocity`.
- Systems: Read and edit components, e.g. updating `position` by `velocity`.
- Main Loop: runs every entity through every system at each tick

This implementation renders to `<canvas>` but otherwise avoids external APIs. For example, collision events propagate using transient components instead of DOM events.

[Live Demo](https://zackrdavis.github.io/minimal-ecs/)

Inspired by blog posts:

- [Creating a Roguelike in Python + TDL, Part 1: Entity-Component System](https://nightblade9.github.io/python-zone/2018/creating-a-roguelike-in-python-tdl-part-1.html)
- [A TypesScript ECS in 99 Lines of Code](https://maxwellforbes.com/posts/typescript-ecs-implementation/)

## Built With

TypeScript, Vite and Vitest

## Getting Started

Clone the repository, then:

```bash
npm install
npm run dev
```

To run tests:

```bash
npm run test
```
