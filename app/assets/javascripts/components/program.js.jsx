var Program = React.createClass({
  providerName: function() {
    return Program.providerNames[this.props.provider];
  },

  render: function() {
    var className = "program";
    if(this.props.hidden) {
      className += ' hidden';
    }

    return (
      <div className={ className }>
        <a href={this.props.url} target="_blank">
          <img src={this.props.thumbnail_url} />
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
