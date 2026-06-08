# Recipe Manager

A REST API for managing recipes, ingredients, instructions, categories, and tags. Built with ASP.NET Core Minimal APIs, Entity Framework Core, and SQLite.

## Features

### Recipe Management

* Create recipes
* View all recipes
* View recipe details
* Update recipes
* Delete recipes

### Category Management

* Create categories
* View all categories
* View category details
* Update categories
* Delete categories

### Tag Management

* Create tags
* View all tags
* View tag details
* Update tags
* Delete tags

## Technologies Used

* C#
* ASP.NET Core Minimal APIs
* Entity Framework Core
* SQLite

## Database Design

### Entities

#### Recipe

* Recipe Name
* Ingredients
* Instructions
* Categories
* Tags

#### RecipeIngredient

* Name
* Quantity
* Unit

#### RecipeInstructionStep

* Step Number
* Description

#### Category

* Category Name

#### Tag

* Tag Name


## API Endpoints

### Recipes

| Method | Endpoint          |
| ------ | ----------------- |
| `GET`    | `/api/recipes`      |
| `GET`    | `/api/recipes/{id}` |
| `POST`   | `/api/recipes`      |
| `PUT`    | `/api/recipes/{id}` |
| `DELETE` | `/api/recipes/{id}` |

### Categories

| Method | Endpoint             |
| ------ | -------------------- |
| `GET`    | `/api/categories`      |
| `GET`    | `/api/categories/{id}` |
| `POST`   | `/api/categories`      |
| `PUT`    | `/api/categories/{id}` |
| `DELETE` | `/api/categories/{id}` |

### Tags

| Method | Endpoint       |
| ------ | -------------- |
| `GET`    | `/api/tags`      |
| `GET`    | `/api/tags/{id}` |
| `POST`   | `/api/tags`      |
| `PUT`    | `/api/tags/{id}` |
| `DELETE` | `/api/tags/{id}` |

## Current Status

Backend CRUD API complete.

Planned next step:

* Frontend using HTML, CSS, and JavaScript.
