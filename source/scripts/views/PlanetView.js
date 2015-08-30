var PlanetView = React.createClass({
    render: function() {
        return (
            <div id="planet-view" ref="view"
                style={this.renderStyle()}/>
        )
    },
    renderStyle: function() {
        return {
            top: "0em",
            left: "0em",
            width: "50%",
            height: "50%",
            position: "absolute",
        }
    },
    componentDidMount: function() {
        var planet = this.props.data

        this.vars.scene = new Three.Scene()
        this.vars.camera = new Three.PerspectiveCamera(75, 1280 / 960, 0.1, 1000)
        this.vars.renderer = new Three.WebGLRenderer()

        this.vars.geometry = new Three.SphereGeometry(1 + planet.size, 32, 32)
        this.vars.material = new Three.MeshLambertMaterial()
        this.vars.material.map = Three.ImageUtils.loadTexture("./assets/images/earth.jpg", {}, function() {
            this.vars.renderer.render(this.vars.scene, this.vars.camera)
        }.bind(this))
        this.vars.material.map.minFilter = Three.LinearFilter //?!
        this.vars.mesh = new Three.Mesh(this.vars.geometry, this.vars.material)
        this.vars.mesh.rotation.x = planet.rotation.x
        this.vars.mesh.rotation.y = planet.rotation.x
        this.vars.scene.add(this.vars.mesh)

        this.vars.camera.position.z = 5

        this.vars.light = new Three.HemisphereLight(0xFFFFFF, 0x000000, 1)
        //this.vars.light = new Three.DirectionalLight(0xFFFFFF, 1)
        this.vars.light.position.set(250, 250, 500)
        this.vars.scene.add(this.vars.light)

        this.vars.renderer.setSize(1280 / planet.resolution, 960 / planet.resolution)
        this.vars.renderer.render(this.vars.scene, this.vars.camera)

        this.vars.view = this.vars.renderer.domElement
        this.vars.view.style.width = "100%"
        this.vars.view.style.height = "100%"
        this.refs.view.getDOMNode().appendChild(this.vars.view)

        //console.log(view.toDataURL("image/png"))
    },
    componentDidUpdate: function() {
        var planet = this.props.data

        this.vars.mesh.rotation.x = planet.rotation.x
        this.vars.mesh.rotation.y = planet.rotation.y
        this.vars.mesh.rotation.z = planet.rotation.z

        this.vars.renderer.render(this.vars.scene, this.vars.camera)
    },
    vars: {}
})

module.exports = PlanetView
