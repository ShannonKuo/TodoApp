import React, { Component } from 'react';

class TodoItem extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }
  render() {
    const item = this.props.item;
    const listId = this.props.listId;
    return (
      <div>
        <li>{item.data}</li>
        <button
          onClick={(evt) => { this.props.handleDeleteItem(evt, listId, item.id); }}
        >delete
        </button>
        <input
          type="checkbox"
          onChange={(evt) => { this.props.handleCompleteItem(evt, listId, item.id); }}
        />
      </div>
    );
  }
}
TodoItem.propTypes = {
  item: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    data: React.PropTypes.string.isRequired,
    complete: React.PropTypes.number.isRequired,
  }).isRequired,
  listId: React.PropTypes.number.isRequired,
  handleCompleteItem: React.PropTypes.func.isRequired,
  handleDeleteItem: React.PropTypes.func.isRequired,
};

export default TodoItem;
