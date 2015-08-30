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
        renderer.setSize(120, 90)

        window.setTimeout(function() {
            renderer.setSize(1280, 720)
            renderer.render(scene, camera)
            element.style.width = WIDTH + "em"
            element.style.height = HEIGHT + "em"
        }, 5000)

        var element = renderer.domElement
        element.style.width = WIDTH + "em"
        element.style.height = HEIGHT + "em"
        this.refs.view.getDOMNode().appendChild(element)

        var geometry = new Three.SphereGeometry(3.25, 32, 32)
        var material = new Three.MeshLambertMaterial(/*{color: 0x0FF00}*/)
        material.map = Three.ImageUtils.loadTexture("./assets/images/earth.jpg", {}, function() {
            console.log("loaded")
            renderer.render(scene, camera)
        })
        material.map.minFilter = Three.LinearFilter //?!
        var planet = new Three.Mesh(geometry, material)
        planet.rotation.x += 0.45
        planet.rotation.y += 0.45
        scene.add(planet)

        camera.position.z = 5

        //var light = new Three.HemisphereLight(0xFFFFFF, 0x000000, 0.5)
        var light = new Three.DirectionalLight(0xFFFFFF, 1)
        light.position.set(250, 500, 500)
        scene.add(light)

        renderer.render(scene, camera)
        //console.log(element.toDataURL("image/png"))
    }
})

module.exports = PlanetView
