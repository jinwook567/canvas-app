# canvas-app

This project uses HTML5 Canvas to manipulate images on the web.  
Currently, it is supported only on desktop environments with a window width greater than 1200px.

## Supported Features

- Move, resize, and rotate elements
- Multiple canvases
- Multi-selection (Shift + Click)
- History management (Undo, Redo)
- Compressed download
- Keyboard shortcuts
  - **Backspace**, **Delete**: Remove selected elements
  - **Command + Z**: Undo
  - **Command + Shift + Z**: Redo

## Overview

### Architecture (FSD)

- **entities**  
  Provides an abstraction layer over the canvas library, reducing its complexity and dependency.

- **features**  
  Divides entities into `Container` and `Shape` based on whether they can have child elements.  
  `Container` enable hierarchical relationships between entities.  
  In this layer, new derived elements can be created by combining multiple entities (e.g., `transformLayer`).

- **widgets**  
  Manages the core data structures for the canvas and provides essential operations such as inserting, deleting, and updating elements.

- **pages**  
  Offers Editor functionality. Multiple types of editors can be supported.

## Adding New Elements

The system is designed to allow adding new elements without modifying existing code.

- Register an object that implements the required interface in the `model/register` file.
- When adding a new entity, **do not use** canvas library components directly.
- Instead, use the abstracted entities to reduce external dependency and maintain system flexibility and scalability.

## Upcoming Features

- Mobile environment support
- Save custom templates
- Automatic image positioning
