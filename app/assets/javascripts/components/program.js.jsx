var Program = React.createClass({
  providerName: function() {
    return Program.providerNames[this.props.provider];
  },

  getInitialState: function() {
    return {
      showThumbnail: false
    }
  },

  componentDidUpdate: function(prevProps) {
    if (! this.props.showThumbnail && prevProps.viewport) {
      this.updatePosition();
    }
  },

  updatePosition: function() {
    var el = this.getDOMNode();
    this.updateImagePosition(el.offsetTop, el.offsetHeight);
  },

  updateImagePosition: function(top, height) {
    // image is already displayed, no need to check anything
    if (this.state.showThumbnail) {
      return;
    }

    // update showImage state if component element is in the viewport
    var min = this.props.viewport.top;
    var max = this.props.viewport.top + (this.props.viewport.height * 1.5);

    if ((min <= (top + height) && top <= max)) {
      this.setState({showThumbnail: true});
    }
  },

  render: function() {
    var className = "program";
    if(this.props.hidden) {
      className += ' hidden';
    }

    if(Program.defaultSrc == '') {
      Program.defaultSrc = document.getElementById('default-src').getAttribute('content');
    }
    var src = Program.defaultSrc;
    if(this.state.showThumbnail) { src = this.props.thumbnail_url };
    var img = <img src={ src } />;

    return (
      <div className={ className }>
        <a href={this.props.url} target="_blank">
          { img }
          <span className="title">{this.props.title}</span>
        </a>
        <p><span className="label label-primary">{this.providerName()}</span></p>
      </div>
    );
  }
});

Program.providerNames = {
  bandai_channel: 'バンダイチャンネル',
  d_anime_store: 'Dアニメストア'
};

Program.defaultSrc = '';
