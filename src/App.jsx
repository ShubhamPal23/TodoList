import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finished, setfinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);
  const savetoLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    savetoLs();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);
    let newtodo = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodo);
    savetoLs();
  };

  const handleDelete = (e, id) => {
    let newtodo = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newtodo);
    savetoLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCompleted = (e, id) => {
    let index = todos.findIndex((items) => {
      return items.id === id;
    });
    let newtodo = [...todos];
    newtodo[index].isCompleted = !newtodo[index].isCompleted;
    setTodos(newtodo);
    savetoLs();
  };

  const isFinished = () => {
    setfinished(!finished);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <>
      <div className="container w-1/2 mx-auto my-5 bg-orange-500 min-h-[90vh] rounded-xl relative z-0 shadow-xl overflow-x-auto">
        <header className="bg-purple-500 h-32 font-bold text-center rounded-t-xl">
          <h1 className="p-2 text-[28px] text-white">TodoTrack</h1>
        </header>

        {/* 2nd Div */}

        <div className="adding z-10 w-4/5 bg-yellow-200 shadow-xl text-center absolute top-14 h-[20vh] right-20 rounded-xl flex flex-col ">
          <input
            value={todo}
            placeholder="Enter Your Task"
            onChange={handleChange}
            onKeyDown={(e) => {
              handleEnter(e);
            }}
            className="border-b-2 border-blue-500 w-3/4 mx-auto my-6 rounded-sm"
            type="text"
            name=""
            id=""
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-green-500 mx-auto w-16 rounded-md p-1 text-white disabled:bg-green-700 hover:bg-green-600"
          >
            Add
          </button>
        </div>

        {/* {3rd Div} */}

        <div className="yourlovelytodos shadow-xl w-4/5 min-h-[50vh] absolute z-10 top-56 right-20 bg-blue-300 rounded-xl ">
          <div className="flex ">
            <h2 className="mt-4 ml-6 mb-3 text-[20px] font-bold">Todo List</h2>
            <div className="finished flex gap-3 ml-80">
              <input
                onChange={isFinished}
                className="mt-2.5"
                type="checkbox"
                checked={finished}
              />
              <div className="underline mt-5 text-[18px]">Show Finished </div>
            </div>
          </div>

            {todos.length===0 && (<div className="m-5">No Todos to Display</div>)}

          {todos.map((items) => {
            return (
              (!items.isCompleted || finished) && (
              <div key={items.id} className="main flex gap-5 w-4/5">
                <input
                  className="ml-2"
                  type="checkbox"
                  onChange={(e) => {
                    handleCompleted(e, items.id);
                  }}
                  checked={items.isCompleted}
                />
                <div
                  className={
                    items.isCompleted
                      ? "line-through mt-3 w-3/5 overflow-x-auto "
                      : "mt-3 w-3/5 overflow-x-auto"
                  }
                >
                  {items.todo}
                </div>
                <div className="flex  h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, items.id);
                    }}
                    className="bg-purple-600 p-2 m-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, items.id);
                    }}
                    className="bg-purple-600 p-2 m-2"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>)
              
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
20;
