import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      newTodoItem: { id: '', data: '' },
      itemIndex: 0,
    };
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
  }
  handleTodoChange(e) {
    this.setState({
      newTodoItem: { id: this.state.itemIndex, data: e.target.value },
    });
  }
  handleAddTodoItem(event, index) {
    if (this.state.newTodoItem.data !== '') {
      this.props.parentHandleAddTodoItem(index, this.state.newTodoItem);
      this.setState({ itemIndex: this.state.itemIndex + 1 });
      this.setState({ itemIndex: this.state.itemIndex + 1 });
      this.setState({ newTodoItem: { data: '' } });
    }
  }
  render() {
    const displayItem = this.props.list.items;
    const listId = this.props.list.listId;
    return (
      <div>
        <input
          type="text"
          value={this.state.newTodoItem.data}
          onChange={this.handleTodoChange}
        />
        <button
          id="list"
          onClick={(evt) => { this.handleAddTodoItem(evt, listId); }}
        >Add todoItem
        </button>
        {this.props.changeListName !== listId &&
          <button
            id="changeListName"
            onClick={(evt) => { this.props.handleEditTodoListName(evt, listId); }}
          >Edit</button>
        }
        {this.props.changeListName === listId &&
          <button
            id="changeListName"
            onClick={(evt) => { this.props.handleEditTodoListName(evt, listId); }}
          >finish</button>
        }

        <button
          id={listId}
          onClick={(evt) => { this.props.handleDeleteList(evt, listId); }}
        >Delete</button>
        <ul>
          {displayItem.map(item =>
            <div className="list" key={item.id}>
              <TodoItem
                listId={listId}
                item={item}
                handleDeleteItem={this.props.handleDeleteItem}
                handleCompleteItem={this.props.handleCompleteItem}
              />
            </div>,
          )}
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  items: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired,
    complete: React.PropTypes.number.isRequired,
  }).isRequired,
  list: React.PropTypes.shape({
    listName: React.PropTypes.string.isRequired,
    listId: React.PropTypes.number.isRequired,
    items: React.PropTypes.array.isRequired,
  }).isRequired,
  changeListName: React.PropTypes.number.isRequired,
  parentHandleAddTodoItem: React.PropTypes.func.isRequired,
  handleEditTodoListName: React.PropTypes.func.isRequired,
  handleDeleteList: React.PropTypes.func.isRequired,
  handleDeleteItem: React.PropTypes.func.isRequired,
  handleCompleteItem: React.PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  items: { id: '0', data: 'default', complete: 0 },
  changeListName: '',
};

export default TodoList;

