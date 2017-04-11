import React, { Component } from 'react';
// material ui
import Checkbox from 'material-ui/Checkbox';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from '/material-ui/svg-icons/action/favorite-border';
// import Visibility from 'material-ui/svg-icons/action/visibility-off';
// import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';


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
        <Checkbox
          label={item.data}
          onCheck={(evt) => { this.props.handleCompleteItem(evt, listId, item.id); }}
        />
        <i
          className="material-icons"
          onTouchTap={(evt) => { this.props.handleDeleteItem(evt, listId, item.id); }}
        >delete
        </i>
        {/* <input
          type="checkbox"
          onChange={(evt) => { this.props.handleCompleteItem(evt, listId, item.id); }}
        /> */}
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
