import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");  // We added a new state called search that will be used to sync up what is typed in the search bar, placing the state here allows us to give access to other components
  const [name, setName] = useState("");       // We add two separate states for name and category to be updated as we fill in the itemForm
  const [category, setCategory] = useState("Produce");   // initial state is produce because upon page render, the category is produce, so when item is submitted without changing the category we can capture Produce
  const [itemList, setItemList] = useState(items)

  function handleSearchChange(event) {   // callback function that will be used to set the state of search to whatever the user is typing in(controlled form)
    setSearch(event.target.value)
  }

  function handleName(event) {           // callback functions to change the state of the name and category in the form as the user is changing it
    setName(event.target.value)
  }

  function handleCategory(event) {
    setCategory(event.target.value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onItemFormSubmit(event) {      // Every time form is submitted, it will create a new object with the current state of name and category and update the itemList using a setter function 
    event.preventDefault()
    const newItem = {
        id: uuid(),
        name: name,
        category : category
    }

    const newItemList = [...itemList, newItem]

    setItemList(newItemList)

    setName("")

  }

  const itemsToDisplay = itemList.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  })
    .filter((item) => {  // We use the search state to further filter the itemstodisplay array to include any item names that include the search term
      if(search.length > 0) return item.name.toLowerCase().includes(search.toLowerCase())
      else {return true}
    })
  ;
  // We passed search and handleSearchChange to allow state to be updated from within the Filter component
  return (
    <div className="ShoppingList">
      <ItemForm name ={name} handleName ={handleName} handleCategory={handleCategory} onItemFormSubmit = {onItemFormSubmit}  />
      <Filter onCategoryChange={handleCategoryChange} search = {search} onSearchChange = {handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
