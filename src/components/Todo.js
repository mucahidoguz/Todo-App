import React from "react";


const Todo = (props) => {
    const { 
        item, 
        deleteTodo, 
        setIsEdit, 
        setWillUptadeTodo, 
        setTodoText, 
        changeIsDone 
    } = props;
    return (

        <div className={`alert alert-${item.isDone === true ? "success" : "primary"
            } 
            d-flex justify-content-between align-items-center`}
        >
            <p>{item.text}</p>
            <div>
                <button
                    onClick={() => changeIsDone(item.id)}
                    className="btn btn-sm btn-secondary mx-2 px-3"
                >
                    {item.isDone === false ? "Done" : "Undone"}
                </button>

                <button className='btn btn-sm btn-success mx-2 px-3'
                    onClick={() => {
                        setIsEdit(true);
                        setWillUptadeTodo(item.id);
                        setTodoText(item.text);
                    }}
                >Edit</button>

                <button className="btn btn-sm btn-danger mx-2 px-2"
                    onClick={() => deleteTodo(item.id)}
                >Delete</button>
                
            </div>
        </div>
    )
}

export default Todo