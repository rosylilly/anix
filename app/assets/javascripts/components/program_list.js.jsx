var ProgramList = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      withoutPPV: false,
      provider: '',
      viewport: {
        top: 0,
        height: 0
      }
    };
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.updateViewport, false);
    window.addEventListener('resize', this.updateViewport, false);
    this.updateViewport();
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.updateViewport);
    window.removeEventListener('resize', this.updateViewport);
  },

  updateViewport: function() {
    // TODO: debounce this call
    console.debug('update view port');
    this.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight
      }
    });
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
      if(self.state.filterText.length > 0 && program.title.toLowerCase().indexOf(self.state.filterText.toLowerCase()) == -1) { return };
      if(self.state.provider.length > 0 && program.provider != self.state.provider) { return };
      programs.push(<Program { ...program } key={program.id} viewport={self.state.viewport} />);
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
