import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetch(` https://dummyjson.com/todos?limit=20&skip=${skip}.`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.todos);
        setItems([...items, ...data.todos]);
      })
      .catch((error) => console.log("Error in fetching the data ", error));
  }, [skip]);

  const handleLoadedItems = () => {
    setSkip((prev) => prev + 20);
  };

  const toggle = (id) => {
    setItems((prevItem) =>
      prevItem.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="m-5">
      <span className="text-xl">Number of loaded todos:{items.length}</span>
      <ul className="list-disc my-2">
        {items.map((list) => (
          <li
            key={list.id}
            onClick={() => {
              toggle(list.id);
            }}
            className={`${list.completed ? 'line-through' : 'no-underline'} cursor-pointer`}
          >
            {list.todo}
          </li>
        ))}
      </ul>
      {items.length < 100 ? (
        <button
          className="border-2 border-blue-950 rounded-md bg-blue-900 text-white m-1 p-2"
          onClick={() => {
            handleLoadedItems();
          }}
        >
          Load More...
        </button>
      ) : (
        <button className="display-hidden"></button>
      )}
    </div>
  );
}

export default App;
