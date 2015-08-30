var PlanetView = React.createClass({
    render: function() {
        return (
            <div id="planet-view" ref="view"
                style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            width: WIDTH + "em",
            height: HEIGHT + "em"
        }
    },
    componentDidMount: function() {
        var scene = new Three.Scene()
        var camera = new Three.PerspectiveCamera(75, 160 / 120, 0.1, 1000)
        var renderer = new Three.WebGLRenderer()
        renderer.setSize(160, 120)

        window.setTimeout(function() {
            console.log(renderer)
            renderer.setSize(1280, 720)
            renderer.render(scene, camera)
            element.style.width = WIDTH + "em"
            element.style.height = HEIGHT + "em"
        }, 3000)

        var element = renderer.domElement
        element.style.width = WIDTH + "em"
        element.style.height = HEIGHT + "em"
        this.refs.view.getDOMNode().appendChild(element)

        var geometry = new Three.BoxGeometry(1, 1, 1)
        var material = new Three.MeshBasicMaterial({color: 0x0FF00})
        var cube = new Three.Mesh(geometry, material)
        cube.rotation.x += 0.45
        cube.rotation.y += 0.45
        scene.add(cube)

        camera.position.z = 2

        renderer.render(scene, camera)
        //console.log(element.toDataURL("image/png"))
    }
})

module.exports = PlanetView
