(function (global) {
    var LiteGraph = global.LiteGraph;

    function AttribNode() {
        this.addOutput("", "number");
        this.properties = {};
        var that = this;
        this.slider = this.addWidget("slider", "Slider", 0.5, function (v) { }, { min: 0, max: 1 });
        this.number = this.addWidget("number", "Number", 0.5, function (v) { }, { min: 0, max: 100 });
        this.combo = this.addWidget("combo", "Combo", "red", function (v) { }, { values: ["red", "green", "blue"] });
        this.text = this.addWidget("text", "Text", "edit me", function (v) { }, {});
        this.text2 = this.addWidget("text", "Text", "multiline", function (v) { }, { multiline: true });
        this.toggle = this.addWidget("toggle", "Toggle", true, function (v) { }, { on: "enabled", off: "disabled" });
        this.button = this.addWidget("button", "Button", null, function (v) { }, {});
        this.toggle2 = this.addWidget("toggle", "Disabled", true, function (v) { }, { on: "enabled", off: "disabled" });
        this.toggle2.disabled = true;
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    AttribNode.title = "Attrib";

    LiteGraph.registerNodeType("cardgame3/attrib", AttribNode);

})(this);
