(function (global) {
    var LiteGraph = global.LiteGraph;

    function imgfuncOnAdded() {
        if (this.properties["data"] != "" && this.img == null) {
            this.loadImage(this.properties["data"]);
        }
    }

    function imgfuncOnDrawBackground(ctx) {
        if (this.flags.collapsed) {
            return;
        }
        if (this.img && this.size[0] > 5 && this.size[1] > 5 && this.img.width) {
            ctx.drawImage(this.img, 0, 0, this.size[0], this.size[1]);
        }
    }

    function imgfuncOnPropertyChanged(name, value) {
        this.properties[name] = value;
        if (name == "data" && value != "") {
            this.loadImage(value);
        }

        return true;
    }

    function imgfuncLoadImage(data, callback) {
        if (data == "") {
            this.img = null;
            return;
        }

        this.img = document.createElement("img");

        this.img.src = data;
        this.boxcolor = "#F95";
        var that = this;
        this.img.onload = function () {
            if (callback) {
                callback(this);
            }
            console.log("Image loaded, size: " + that.img.width + "x" + that.img.height);
            this.dirty = true;
            that.boxcolor = "#9F9";
            that.setDirtyCanvas(true);
        };
        this.img.onerror = function () {
            console.log("error loading the image:" + data);
        }
    }

    function imgfuncOnWidget(e, widget) {
        if (widget.name == "load") {
            this.loadImage(this.properties["data"]);
        }
    }

    function imgfuncOnDropFile(file) {
        var that = this;

        const reader = new FileReader();
        reader.onloadend = () => {
            this.properties.data = reader.result;
            this.loadImage(reader.result, function (img) {
                that.size[1] = (img.height / img.width) * that.size[0];
            });
        };
        reader.readAsDataURL(file);
    };

    function onConfigure(info) {
        const that = this;

        if (!this.properties["data"] || this.properties["data"] == "") {
            this.size = this.computeSize();
        }
    }

    function initNormalNode(node, title) {
        node.title = title;
        node.prototype.onConfigure = onConfigure;
    }

    function initCardNode(node, title) {
        node.title = title;
        node.prototype.onAdded = imgfuncOnAdded;
        node.prototype.onDrawBackground = imgfuncOnDrawBackground;
        node.prototype.onPropertyChanged = imgfuncOnPropertyChanged;
        node.prototype.loadImage = imgfuncLoadImage;
        node.prototype.onWidget = imgfuncOnWidget;
        node.prototype.onDropFile = imgfuncOnDropFile;        
        node.prototype.onConfigure = onConfigure;
    }    

    function AttributeNode() {
        this.addInput("Change", "attribute");
        this.addOutput("Notice", "checkAttribute");
        this.properties = {};
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        // this.minVal = this.addWidget("number", "Min", 0, function (v) { }, { step: 10, precision: 0 });
        // this.maxVal = this.addWidget("number", "Max", 100, function (v) { }, { step: 10, precision: 0 });
        this.initVal = this.addWidget("number", "Initial", 50, function (v) { }, { step: 10, precision: 0 });
        this.isPrivate = this.addWidget("toggle", "Private", false, function (v) { }, { on: "true", off: "false" });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    initNormalNode(AttributeNode, "Attribute");
    LiteGraph.registerNodeType("cardgame3/attribute", AttributeNode);

    function AttributeCheckerNode() {
        this.addInput("Active", "action");
        this.addInput("OnAttribute", "checkAttribute");
        this.addOutput("Action", "action");
        this.properties = {};
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.isLess = this.addWidget("toggle", "CheckMode", false, function (v) { }, { on: "<=", off: ">=" });
        this.val = this.addWidget("number", "Val", 0, function (v) { }, { step: 10, precision: 0 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    initNormalNode(AttributeCheckerNode, "AttributeChecker");
    LiteGraph.registerNodeType("cardgame3/attributeChecker", AttributeCheckerNode);

    function GameStartNode() {
        this.addOutput("Action", "action");
        this.properties = {};
        var that = this;

        this.text = this.addWidget("string", "Name", "Start Game", function (v) { }, { textWidth: 0.7 });
        // this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        // this.isLess = this.addWidget("toggle", "CheckMode", false, function (v) { }, { on: "<=", off: ">=" });
        // this.val = this.addWidget("number", "Val", 0, function (v) { }, { step: 10, precision: 0 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    initNormalNode(GameStartNode, "GameStart");
    LiteGraph.registerNodeType("cardgame3/gameStart", GameStartNode);

    function PersonNode() {
        this.addOutput("", "attribute");
        this.properties = { data: "" };
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    initCardNode(PersonNode, "Person");
    LiteGraph.registerNodeType("cardgame3/person", PersonNode);

    function EventNode() {
        this.addOutput("", "number");
        this.properties = { data: "" };
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    initCardNode(EventNode, "Event");
    LiteGraph.registerNodeType("cardgame3/event", EventNode);

    function GameEndingNode() {
        this.addInput("OpenCard", "action");
        this.properties = { data: "" };
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    initCardNode(GameEndingNode, "GameEnding");
    LiteGraph.registerNodeType("cardgame3/gameEnding", GameEndingNode);

})(this);
