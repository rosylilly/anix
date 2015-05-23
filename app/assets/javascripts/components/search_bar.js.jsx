var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value,
      this.refs.withoutPPV.getDOMNode().checked
    );
  },

  render: function() {
    return (
      <div id="search-bar">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control input-lg"
              placeholder="Search..."
              value={this.props.filterText}
              ref="filterTextInput"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={this.props.withoutPPV}
                ref="withoutPPV"
                onChange={this.handleChange}
              />
              { ' ' }
              Without PPV
            </label>
          </div>
        </form>
      </div>
    );
  }
});
