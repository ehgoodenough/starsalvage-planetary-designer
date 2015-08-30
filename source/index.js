window.React = require("react")
window.Phlux = require("phlux")
window.Three = require("three")

window.Loop = require("<scripts>/utilities/Loop")
window.Input = require("<scripts>/utilities/Input")

window.WIDTH = 20
window.HEIGHT = 15

var FrameView = require("<scripts>/views/FrameView")
var PlanetView = require("<scripts>/views/PlanetView")

var PlanetStore = Phlux.createStore({
    data: {
        resolution: 16,
        rotation: {
            x: 0.5,
            y: 0,
            z: 0
        },
        size: 2.25,
    },
    update: function(tick) {
        var planet = this.data
        planet.rotation.y += 0.25 * tick
        this.trigger()
    }
})

var GameView = React.createClass({
    mixins: [
        Phlux.connectStore(PlanetStore, "planet")
    ],
    render: function() {
        return (
            <FrameView aspect-ratio="4x3">
                <PlanetView data={this.state.planet}/>
            </FrameView>
        )
    },
    componentDidMount: function() {
        Loop(function(tick) {
            PlanetStore.update(tick)
        })
    }
})

React.render(<GameView/>, document.body)
