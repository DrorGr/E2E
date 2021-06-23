import { todoService } from "../services/todo.service.js"

export class Home extends React.Component {

    state = {
        todos: null
    }

    componentDidMount() {
        todoService.query()
            .then(todos => {
                this.setState({ todos })
                console.log('Todos from server:', todos)
            })
    }

    onRemoveTodo = (id) => {
        todoService.remove(id)
            .then(() => {
                let { todos } = this.state
                todos = todos.filter(todo => todo._id !== id)
                this.setState({ todos })
            })
    }

    onAddTodo = () => {
        todoService.add({ txt: 'do this', importance: "1", completed: "false", color: "#e6b64c", })
            .then(newTodo => {
                this.setState({ todos: [newTodo, ...this.state.todos] })
            })
    }

    onSetImportance = (val, id) => {
        todoService.update(val, id, 'importance')
            .then(res => this.setState({ todos: res }))
    }

    onSetColor = (val, id) => {
        todoService.update(val, id, 'color')
            .then(res => this.setState({ todos: res }))
    }

    onSetCategory = (val, id) => {
        todoService.update(val, id, 'category')
            .then(res => this.setState({ todos: res }))
    }

    render() {
        const { todos } = this.state
        if (!todos) return <div>Loading....</div>
        return (
            <section>
                <header>
                    <h1>My Todos</h1>
                    <button onClick={this.onAddTodo}>Add new todo</button>
                </header>
                <main>
                    <ul>
                        {todos.map(todo => {
                            const clr = '#' + todo.color
                            return (
                                <li className="todo" key={todo._id} style={{ backgroundColor: clr }}>
                                    {todo.txt}
                                    <p>importance: {todo.importance}</p>

                                    <button onClick={() => {
                                        this.onRemoveTodo(todo._id)
                                    }}>Delete</button>
                                    <div>

                                        <label htmlFor={`importance-${todo._id}`}>Change importance</label>
                                        <input type="number" min="1" max="3" value={todo.importance} id={`importance-${todo._id}`} data-id={todo._id}
                                            onChange={(ev) => this.onSetImportance(ev.target.value, ev.target.dataset.id)} />
                                    </div>

                                    <div>
                                        <label htmlFor={`color-${todo._id}`}>Change color</label>
                                        <input type="color" value={todo.color} id={`color-${todo._id}`} data-id={todo._id}
                                            onChange={(ev) => this.onSetColor(ev.target.value, ev.target.dataset.id)} />

                                    </div>


                                    <label htmlFor={`category-${todo._id}`}>Change label:</label>
                                    <input type="text" list="data" id={`category-${todo._id}`} data-id={todo._id} onChange={(ev) => this.onSetCategory(ev.target.value, ev.target.dataset.id)} />
                                    <datalist id="data">
                                        <option value="Must" />
                                        <option value="Nice to have" />
                                        <option value="Optional" />
                                    </datalist>
                                </li>
                            )
                        })}
                    </ul>
                </main>
            </section >
        )
    }
}