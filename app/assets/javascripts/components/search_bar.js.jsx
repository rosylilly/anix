var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value,
      this.refs.withoutPPV.getDOMNode().checked,
      this.refs.provider.getDOMNode().value
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

          <div className="clearfix">
            <div className="pull-left form-inline">
              <div className="form-group">
                <select className="form-control" ref="provider" value={this.props.provider} onChange={this.handleChange}>
                  <option value="">すべて</option>
                  <option value="bandai_channel">バンダイチャンネル</option>
                  <option value="d_anime_store">Dアニメストア</option>
                </select>
              </div>

              { ' ' }

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

            </div>
            <div className="pull-right">
              <p>{this.props.count}作品</p>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
