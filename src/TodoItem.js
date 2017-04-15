import React, { Component } from 'react';
// material ui
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from '/material-ui/svg-icons/action/favorite-border';
// import Visibility from 'material-ui/svg-icons/action/visibility-off';
// import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

const styles = {
  block: {
    maxWidth: 200,
  },
};

class TodoItem extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  render() {
    const item = this.props.item;
    const listId = this.props.listId;
    return (
      <div className="item">
        <div>
          <Checkbox
            className="itemCheck"
            style={styles.block}
            label={item.data}
            onCheck={(evt) => { this.props.handleCompleteItem(evt, listId, item.id); }}
          />
        </div>
        <div className="itemDelete">
          <IconButton
            iconClassName="material-icons"
            tooltip="delete"
            onTouchTap={(evt) => { this.props.handleDeleteItem(evt, listId, item.id); }}
          > delete
          </IconButton>
        </div>
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
