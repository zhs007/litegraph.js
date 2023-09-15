(function (global) {
    var LiteGraph = global.LiteGraph;

    function AttribNode() {
        this.addOutput("", "number");
        this.properties = {};
        var that = this;
        // this.slider = this.addWidget("slider", "Slider", 0.5, function (v) { }, { min: 0, max: 1 });
        // this.number = this.addWidget("number", "Number", 0.5, function (v) { }, { min: 0, max: 100 });
        // this.combo = this.addWidget("combo", "Combo", "red", function (v) { }, { values: ["red", "green", "blue"] });
        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.minVal = this.addWidget("number", "Min", 0, function (v) { }, { step: 10, precision: 0 });
        this.maxVal = this.addWidget("number", "Max", 100, function (v) { }, { step: 10, precision: 0 });
        // this.toggle = this.addWidget("toggle", "Toggle", true, function (v) { }, { on: "enabled", off: "disabled" });
        // this.button = this.addWidget("button", "Button", null, function (v) { }, {});
        // this.toggle2 = this.addWidget("toggle", "Disabled", true, function (v) { }, { on: "enabled", off: "disabled" });
        // this.toggle2.disabled = true;
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    AttribNode.title = "Attribute";

    LiteGraph.registerNodeType("cardgame3/attribute", AttribNode);

})(this);
