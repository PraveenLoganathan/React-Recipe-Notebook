import React from 'react'

export default function RecipeIngredientEdit(props) {
  const {
    ingredient,
    handleIngredientChange,
    handleIngredientDelete
  } = props

  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
  }

  return (
    <>
      <input
      value={ingredient.name}
      onChange={e => handleChange({ name: e.target.value })}
      className="recipe-edit__input"
      type="text"
      />
      <input
      value={ingredient.amount}
      onChange={e => handleChange({ amount: e.target.value })}
      className="recipe-edit__input"
      type="text"
      />
      <button
      className="btn--danger"
      onClick={() => handleIngredientDelete(ingredient.id)}>
        &times;
      </button>
    </>
  )
}
