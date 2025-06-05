# AltSchool Node.js Combined Server & API Assignment

This repository contains two backend assignments—built with only Node.js core modules. It was completed as part of the AltSchool Africa Backend Engineering Program.

## Overview

- **Assignment 1**: Static HTML Server

  - Serves `index.html` at `/index.html` (student profile page).
  - Any other `.html` path (e.g., `/random.html`) returns a custom 404 page.
  - Uses Node.js core modules: `http`, `fs`, `path`.

- **Assignment 2**: Inventory Management API
  - A RESTful CRUD API for inventory items stored in `items.json` (no external database).
  - Item attributes:
    - `id` (unique string)
    - `name` (string)
    - `price` (number)
    - `size` (`"s" | "m" | "l"`)
  - Endpoints:
    - `GET  /api/items` → list all items
    - `GET  /api/items/:id` → get a single item
    - `POST /api/items` → create item
    - `PUT  /api/items/:id` → update item
    - `DELETE /api/items/:id` → delete item
  - Uses `fs` to read/write `items.json`, with consistent JSON response format and error handling.

## Hosted Demo

All assignment pages and apis are hosted at:  
[https://abisoye-altschool-nodejs-assignment.onrender.com](https://abisoye-altschool-nodejs-assignment.onrender.com)

## API Endpoints
**API Base URL:** `https://abisoye-altschool-nodejs-assignment.onrender.com/api`
* **GET all items:** `/api/items`
* **View student profile:** `/`

---

## About

This project was created as part of the AltSchool backend engineering program to demonstrate core skills in building HTTP servers and RESTful APIs using only native Node.js features. It focuses on modular code organization, error handling, file system operations, and routing logic without external dependencies or libraries.
