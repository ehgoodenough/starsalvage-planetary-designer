var PlanetView = React.createClass({
    render: function() {
        return (
            <canvas ref="canvas"
                width={160} height={120}
                style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            width: WIDTH + "em",
            height: HEIGHT + "em",
            backgroundColor: "#111"
        }
    },
    componentDidMount: function() {
        var canvas = this.refs.canvas.getDOMNode().getContext("2d")
    }
})

module.exports = PlanetView
