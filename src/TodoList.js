import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './App.css';
// material ui
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      newTodoItem: { id: '', data: '' },
      itemIndex: 0,
    };
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
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
  handlePressEnter(event, index, type) {
    if (event.key === 'Enter' && type === 'add') {
      this.handleAddTodoItem(event, index);
    } else if (event.key === 'Enter' && type === 'edit') {
      this.props.handleEditTodoListName(event, index);
    }
  }

  render() {
    const displayItem = this.props.list.items;
    const listId = this.props.list.listId;
    return (
      <div className="list">
        {this.props.changeListName !== listId &&
          <ul>
            <div className="listName">
              {this.props.list.listName}
              <IconButton
                iconClassName="material-icons md-40"
                tooltip="delete"
                onTouchTap={(evt) => { this.props.handleDeleteList(evt, listId); }}
              >
                delete
              </IconButton>
              <IconButton
                iconClassName="material-icons md-40"
                tooltip="edit"
                onTouchTap={(evt) => { this.props.handleEditTodoListName(evt, listId); }}
              >edit 
              </IconButton>
            </div>
          </ul>
        }
        {this.props.changeListName === listId &&
          <ul>  
            <div className="listName">
              <TextField
                hintText="edit your todo list name"
                type="text"
                onChange={(evt) => { this.props.handleChangeTodoListName(evt); }}
                onKeyPress={(evt) => { this.handlePressEnter(evt, listId, 'edit'); }}
              />
              <IconButton
                iconClassName="material-icons md-40"
                tooltip="delete"
                onTouchTap={(evt) => { this.props.handleDeleteList(evt, listId); }}
              >delete
              </IconButton>
              <IconButton
                iconClassName="material-icons md-40"
                tooltip="done"
                onTouchTap={(evt) => { this.props.handleEditTodoListName(evt, listId); }}
                >done
              </IconButton>
            </div>
          </ul>
        }
        <div className="itemInput">
          <TextField
            hintText="Please enter your todo item"
            type="text"
            style={{fontSize:20}}
            value={this.state.newTodoItem.data}
            onChange={this.handleTodoChange}
            onKeyPress={(evt) => { this.handlePressEnter(evt, listId, 'add'); }}
          />
          <FloatingActionButton
            className="itemAdd"
            mini={true}
            onTouchTap={(evt) => { this.handleAddTodoItem(evt, listId); }}
          >
            <ContentAdd /> 
          </FloatingActionButton>
        </div>

        <ul className="displayItem">
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

