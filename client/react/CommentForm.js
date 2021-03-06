app.CommentForm = React.createClass({

  handleSubmit: function (e) {
    e.preventDefault();

    var commentBody = this.refs.input.getDOMNode();
    var comment = commentBody.value.trim();

    //if editing dispatch to editing
    if (this.props.editing) {
      app.CommentActions.edit(this.props._id, comment);
    } else { //otherwise dispatch to create
      app.CommentActions.create(this.props.idea_id, comment);
    }

    //dispatch an event with the comment text
    commentBody.value = '';
    return;
  },

  render: function () {
    return (
      <form ref="body" onSubmit={this.handleSubmit}>
        <input type="text" ref="input" placeholder="Comment" />
        <input type="submit" ref="submit" value={this.props.editing ? 'Edit Comment' : 'Create Comment'} />
      </form>
    );
  }

});
