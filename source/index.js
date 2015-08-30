window.React = require("react")
window.Phlux = require("phlux")
window.Three = require("three")

window.WIDTH = 20
window.HEIGHT = 15

var FrameView = require("<scripts>/views/FrameView")
var PlanetView = require("<scripts>/views/PlanetView")

var GameView = React.createClass({
    render: function() {
        return (
            <FrameView aspect-ratio="4x3">
                <PlanetView/>
            </FrameView>
        )
    }
})

React.render(<GameView/>, document.body)
