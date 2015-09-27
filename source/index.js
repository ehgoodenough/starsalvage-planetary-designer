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
        texture: require("<assets>/images/norris1"),
        //texture: require("<assets>/images/mcpher1"),
        //texture: require("<assets>/images/earth"),
        resolution: 16,
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        size: 3.15,
        ticks: 0,
    },
    update: function(tick) {
        var planet = this.data
        planet.ticks -= tick
        if(planet.ticks <= 0) {
            planet.ticks = 1
        }
        planet.rotation.y += tick / 8
        this.trigger()
    }
})

var StarColors = [
    "#E42217", //Lava Red, RGB(228, 34, 23)
    "#E5E4E2", //Platinum, RGB(229, 228, 226)
    "#4863A0", //Steel Blue, RGB(72, 99, 160)
    "#98AFC7", //Blue Gray, RGB(152, 175, 199)
    "#728C00", //Venom Green, RGB(114, 140, 0)
    "#F87217", //Pumpkin Orange, RGB(248, 114, 23)
    "#6C2DC7", //Purple Amethyst, RGB(108, 45, 199)
    "#3EA99F", //Light Sea Green, RGB(62, 169, 159)
    "#FFD801", //Rubber Ducky Yellow, RGB(255, 216, 1)
]
var StarSizes = [0.5, 1, 1.5, 2]

var StarStore = new function() {
    this.stars = []
    for(var i = 0; i < 60; i++) {
        this.stars.push({
            position: {
                x: Math.floor(Math.random() * 256),
                y: Math.floor(Math.random() * 192)
            },
            speed: Math.floor(Math.random() * 10) + 10,
            speed: Math.random() * 3 + 2,
            size: StarSizes[Math.floor(Math.random() * StarSizes.length)],
            color: StarColors[Math.floor(Math.random() * StarColors.length)]
        })
    }
    this.update = function(tick) {
        for(var key in this.stars) {
            var star = this.stars[key]
            star.position.x -= tick * star.speed
            if(star.position.x < 0 - star.size) {
                star.size = StarSizes[Math.floor(Math.random() * StarSizes.length)]
                star.color = StarColors[Math.floor(Math.random() * StarColors.length)]
                star.position.x = 256 + star.size + Math.floor(Math.random() * 6)
                star.position.y = Math.floor(Math.random() * 192)
            }
        }
    }
}

var StarView = React.createClass({
    render: function() {
        return (
            <div style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            width: this.props.star.size + "em",
            height: this.props.star.size + "em",
            position: "absolute",
            top: this.props.star.position.y + "em",
            left: this.props.star.position.x + "em",
            backgroundColor: this.props.star.color,
        }
    }
})

var GameView = React.createClass({
    mixins: [
        Phlux.connectStore(PlanetStore, "planet")
    ],
    render: function() {
        var stars = new Array()
        for(var key in StarStore.stars) {
            var star = StarStore.stars[key]
            stars.push(
                <StarView key={key} star={star}/>
            )
        }
        return (
            <FrameView aspect-ratio="4x3">
                {stars}
                <PlanetView data={this.state.planet}/>
            </FrameView>
        )
    },
    componentDidMount: function() {
        Loop(function(tick) {
            PlanetStore.update(tick)
            StarStore.update(tick)
        })
    }
})

React.render(<GameView/>, document.body)
