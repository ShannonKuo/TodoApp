import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React, { Component } from 'react';
import TodoList from './TodoList';
import './App.css';

// material ui
import TextField from 'material-ui/TextField';

class TodoApp extends Component {
  // 一定要有一個 render 方法
  constructor() {
    super();
    this.state = {
      todoLists: [],
      newTodoList: { id: '', data: '' },
      index: 0,
      cntComplete: 0,
      cntTotalItem: 0,
      changeListName: -1,
    };
    this.handleTodoChange = this.handleTodoChange.bind(this);
    this.handleAddTodoList = this.handleAddTodoList.bind(this);
    this.handleAddTodoItem = this.handleAddTodoItem.bind(this);
    this.handleEditTodoListName = this.handleEditTodoListName.bind(this);
    this.handleChangeTodoListName = this.handleChangeTodoListName.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleCompleteItem = this.handleCompleteItem.bind(this);
    this.handleProgressBar = this.handleProgressBar.bind(this);
  }
  handleTodoChange(e) {
    if (e.key === 'Enter') {
      this.handleAddTodoList();
    } else {
      this.setState({
        newTodoList: { id: this.state.index, data: e.target.value },
      });
    }
  }
  handleAddTodoList() {
    if (this.state.newTodoList.data !== '') {
      const lists = this.state.todoLists;
      lists.push({
        listName: this.state.newTodoList.data,
        listId: this.state.newTodoList.id,
        items: [],
      });
      this.setState({ todoLists: lists });
      this.setState({ newTodoList: { id: '', data: '' } });
      this.setState({ index: this.state.index + 1 });
    }
  }
  handleAddTodoItem(listId, newItem) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        const list = this.state.todoLists[i];
        list.items.push({
          id: newItem.id,
          data: newItem.data,
          complete: 0,
        });
        const newTodoLists = this.state.todoLists;
        newTodoLists[i] = list;
        this.setState({ todoLists: newTodoLists });
      }
    }
    this.setState({ cntTotalItem: this.state.cntTotalItem + 1 });
    this.handleProgressBar(this.state.cntComplete, this.state.cntTotalItem + 1);
  }
  handleEditTodoListName(event, listId) {
    if (this.state.changeListName === -1) {
      this.setState({ changeListName: listId });
    } else if (this.state.changeListName === listId) {
      this.setState({ changeListName: -1 });
    } else {
      this.setState({ changeListName: listId });
    }
  }
  handleChangeTodoListName(event) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === this.state.changeListName) {
        const newTodoLists = this.state.todoLists;
        newTodoLists[i].listName = event.target.value;
        this.setState({ todoList: newTodoLists });
      }
    }
  }
  handleDeleteList(event, listId) {
    let cnt = 0;
    let cntDelete = 0;
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        cntDelete = this.state.todoLists[i].items.length;
        for (let j = 0; j < this.state.todoLists[i].items.length; j += 1) {
          if (this.state.todoLists[i].items[j].complete === 1) {
            cnt += 1;
          }
        }
        this.setState({ cntComplete: this.state.cntComplete - cnt });
        this.setState({ cntTotalItem: this.state.cntTotalItem - cntDelete });
        this.handleProgressBar(this.state.cntComplete - cnt, this.state.cntTotalItem - cntDelete);
        const lists = this.state.todoLists;
        lists.splice(i, 1);
        this.setState({ todoLists: lists });
      }
    }
  }
  handleDeleteItem(event, listId, itemId) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        for (let j = 0; j < this.state.todoLists[i].items.length; j += 1) {
          if (this.state.todoLists[i].items[j].id === itemId) {
            const newItems = this.state.todoLists[i].items;
            const newTodoLists = this.state.todoLists;
            let newComplete = this.state.cntComplete;
            if (newItems[j].complete === 1) {
              this.setState({ cntComplete: this.state.cntComplete - 1 });
              newComplete = this.state.cntComplete - 1;
            }
            newItems.splice(j, 1);
            newTodoLists[i].items = newItems;
            this.setState({ todoLists: newTodoLists });
            this.setState({ cntTotalItem: this.state.cntTotalItem - 1 });
            this.handleProgressBar(newComplete, this.state.cntTotalItem - 1);
          }
        }
      }
    }
  }
  handleCompleteItem(event, listId, itemId) {
    for (let i = 0; i < this.state.todoLists.length; i += 1) {
      if (this.state.todoLists[i].listId === listId) {
        for (let j = 0; j < this.state.todoLists[i].items.length; j += 1) {
          if (this.state.todoLists[i].items[j].id === itemId) {
            const itemComplete = this.state.todoLists[i].items[j].complete;
            const newTodoLists = this.state.todoLists;
            if (itemComplete === 0) {
              newTodoLists[i].items[j].complete = 1;
              this.setState({ todoLists: newTodoLists });
              this.setState({ cntComplete: this.state.cntComplete + 1 });
              this.handleProgressBar(this.state.cntComplete + 1, this.state.cntTotalItem);
            } else if (itemComplete === 1) {
              this.setState({ cntComplete: this.state.cntComplete - 1 });
              this.handleProgressBar(this.state.cntComplete - 1, this.state.cntTotalItem);
              newTodoLists[i].items[j].complete = 0;
              this.setState({ todoLists: newTodoLists });
            }
          }
        }
      }
    }
  }

  handleProgressBar(complete, total) {
    const elem = document.getElementById('myBar');
    let width = (complete / total) * 100;
    if (complete === 0 && total === 0) {
      width = 0;
    }
    elem.style.width = width + '%';
  }

  render() {
    // 回傳很像是 html 的 jsx
    return (
      <div className="App">
        <div className="todoAppHeader">
          <h1>TodoApp</h1>
          <div id="myBar"></div> 
        </div>
        <div className="cntItem">
          <ul>Active item: {this.state.cntTotalItem - this.state.cntComplete}
              ;  Completed item: {this.state.cntComplete}</ul>
        </div>
        <div className="listInput">
          <TextField
            type="text"
            hintText="Please enter your todo list name"
            style={{fontSize: 30, width: 500}}
            onChange={this.handleTodoChange}
            onKeyPress={this.handleTodoChange}
            value={this.state.newTodoList.data}
          />
          <FloatingActionButton
            onTouchTap={this.handleAddTodoList}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <ul>
          {this.state.todoLists.map(list =>
            <div className="displayList" key={list.listId}>
              <TodoList
                list={list}
                changeListName={this.state.changeListName}
                parentHandleAddTodoItem={this.handleAddTodoItem}
                handleEditTodoListName={this.handleEditTodoListName}
                handleDeleteList={this.handleDeleteList}
                handleDeleteItem={this.handleDeleteItem}
                handleCompleteItem={this.handleCompleteItem}
                handleChangeTodoListName={this.handleChangeTodoListName}
              />
            </div>,
          )}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
