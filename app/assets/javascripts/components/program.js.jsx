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
        <h2>
          <a href={this.props.url} target="_blank">{this.props.title}</a>
        </h2>
        <p><span className="label label-primary">{this.providerName()}</span></p>
      </div>
    );
  }
});

Program.providerNames = {
  bandai_channel: 'バンダイチャンネル',
  d_anime_store: 'Dアニメストア'
};
