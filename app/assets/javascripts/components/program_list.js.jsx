var ProgramList = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      withoutPPV: false,
      provider: ''
    };
  },

  handleUserInput: function(filterText, withoutPPV, provider) {
    this.setState({
      filterText: filterText,
      withoutPPV: withoutPPV,
      provider: provider
    });
  },

  render: function() {
    var programs = [];
    var self = this;

    this.props.programs.sort(function(a, b) {
      if(a.title < b.title) return -1;
      if(a.title > b.title) return 1;
      return (a.id < b.id) ? -1 : 1;
    });

    this.props.programs.forEach(function(program) {
      if(self.state.withoutPPV && program.ppv) { return };
      if(self.state.filterText.length > 0 && program.title.indexOf(self.state.filterText) == -1) { return };
      if(self.state.provider.length > 0 && program.provider != self.state.provider) { return };
      programs.push(<Program { ...program } key={program.id} />);
    });

    return (
      <div>
      <SearchBar filterText={this.state.filterText} withoutPPV={this.state.withoutPPV} provider={this.state.provider} count={programs.length} onUserInput={this.handleUserInput} />

      <div className="programs">
        { programs }
      </div>
      </div>
    );
  }
});
