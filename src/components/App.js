import React, { useState, useEffect } from 'react'
import RecipeEdit from './RecipeEdit';
import RecipeList from './RecipeList'
import { v4 as uuidv4 } from 'uuid'
import '../css/app.css'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON == null){
      return sampleRecipes
    } else {
      return JSON.parse(recipeJSON)
    }
  })

  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instr.',
      ingredients: [
        { id: uuidv4(), name: 'Name', amount: '1 Tbs'}
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  return (
    <RecipeContext.Provider value ={recipeContextValue}>
      <RecipeList recipes = {recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Creamy Pasta Sauce',
    servings: 3,
    cookTime: '1:00',
    instructions: "1. Soak cashewnuts in hot water for 10 minutes \n2. Roast veg in oven for 20 minutes \n3. Blend cashew and veg with 2 Tbs water \n4. Season with salt, pepper and Italian herbs",
    ingredients: [
      {
        id: 1,
        name: 'Cashewnut',
        amount: '1 Cup'
      },
      {
        id: 2,
        name: 'Bell Pepper',
        amount: '1'
      },
      {
        id: 3,
        name: 'Courgette',
        amount: '1'
      },
      {
        id: 4,
        name: 'Salt/Pepper/Italian Herbs',
        amount: '1/2 Tbs'
      }
    ]
  },
  {
    id: 2,
    name: 'Chickpeas Salad',
    servings: 2,
    cookTime: '0:20',
    instructions: "1. Cut avocado and toss with fresh lemon juice  \n2. Add remaining ingredients \n3. Whisk dressing ingredients in a small bowl and drizzle over the salad \n4. Gently toss and season with salt & pepper to taste",
    ingredients: [
      {
        id: 1,
        name: 'Canned Chickpeas',
        amount: '1 Can'
      },
      {
        id: 2,
        name: 'Lemon Juice',
        amount: '2 Tbs'
      },
      {
        id: 3,
        name: 'Cucumber',
        amount: '1'
      },
      {
        id: 4,
        name: 'Cherry Tomatoes',
        amount: '1/2 Cup'
      },
      {
        id: 5,
        name: 'Red Wine Vinegar/Olive Oil',
        amount: '1 Tbs'
      },
      {
        id: 6,
        name: 'Salt/Pepper',
        amount: '1 Tbs'
      }
    ]
  }
]

export default App;
