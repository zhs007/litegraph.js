(function (global) {
    var LiteGraph = global.LiteGraph;

    function AttributeNode() {
        this.addOutput("", "number");
        this.properties = {};
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.minVal = this.addWidget("number", "Min", 0, function (v) { }, { step: 10, precision: 0 });
        this.maxVal = this.addWidget("number", "Max", 100, function (v) { }, { step: 10, precision: 0 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    AttributeNode.title = "Attribute";

    LiteGraph.registerNodeType("cardgame3/attribute", AttributeNode);

    function PersonNode() {
        this.addOutput("", "number");
        this.properties = { url: "" };
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    PersonNode.title = "Person";
    PersonNode.prototype.onAdded = function () {
        if (this.properties["url"] != "" && this.img == null) {
            this.loadImage(this.properties["url"]);
        }
    };

    PersonNode.prototype.onDrawBackground = function (ctx) {
        if (this.flags.collapsed) {
            return;
        }
        if (this.img && this.size[0] > 5 && this.size[1] > 5 && this.img.width) {
            ctx.drawImage(this.img, 0, 0, this.size[0], this.size[1]);
        }
    };

    PersonNode.prototype.onPropertyChanged = function (name, value) {
        this.properties[name] = value;
        if (name == "url" && value != "") {
            this.loadImage(value);
        }

        return true;
    };

    PersonNode.prototype.loadImage = function (url, callback) {
        if (url == "") {
            this.img = null;
            return;
        }

        this.img = document.createElement("img");

        if (url.substr(0, 4) == "http" && LiteGraph.proxy) {
            url = LiteGraph.proxy + url.substr(url.indexOf(":") + 3);
        }

        this.img.src = url;
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
            console.log("error loading the image:" + url);
        }
    };

    PersonNode.prototype.onWidget = function (e, widget) {
        if (widget.name == "load") {
            this.loadImage(this.properties["url"]);
        }
    };

    PersonNode.prototype.onDropFile = function (file) {
        var that = this;
        if (this._url) {
            URL.revokeObjectURL(this._url);
        }
        this._url = URL.createObjectURL(file);
        this.properties.url = this._url;
        this.loadImage(this._url, function (img) {
            that.size[1] = (img.height / img.width) * that.size[0];
        });
    };

    LiteGraph.registerNodeType("cardgame3/person", PersonNode);

    function EventNode() {
        this.addOutput("", "number");
        this.properties = { url: "" };
        var that = this;

        this.text = this.addWidget("text", "Name", "name", function (v) { }, { textWidth: 0.7 });
        this.text2 = this.addWidget("text", "Info", "infomation", function (v) { }, { multiline: true, textWidth: 0.7 });
        this.size = this.computeSize();
        this.serialize_widgets = true;
    }

    EventNode.title = "Event";
    EventNode.prototype.onAdded = function () {
        if (this.properties["url"] != "" && this.img == null) {
            this.loadImage(this.properties["url"]);
        }
    };

    EventNode.prototype.onDrawBackground = function (ctx) {
        if (this.flags.collapsed) {
            return;
        }
        if (this.img && this.size[0] > 5 && this.size[1] > 5 && this.img.width) {
            ctx.drawImage(this.img, 0, 0, this.size[0], this.size[1]);
        }
    };

    EventNode.prototype.onPropertyChanged = function (name, value) {
        this.properties[name] = value;
        if (name == "url" && value != "") {
            this.loadImage(value);
        }

        return true;
    };

    EventNode.prototype.loadImage = function (url, callback) {
        if (url == "") {
            this.img = null;
            return;
        }

        this.img = document.createElement("img");

        if (url.substr(0, 4) == "http" && LiteGraph.proxy) {
            url = LiteGraph.proxy + url.substr(url.indexOf(":") + 3);
        }

        this.img.src = url;
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
            console.log("error loading the image:" + url);
        }
    };

    EventNode.prototype.onWidget = function (e, widget) {
        if (widget.name == "load") {
            this.loadImage(this.properties["url"]);
        }
    };

    EventNode.prototype.onDropFile = function (file) {
        var that = this;
        if (this._url) {
            URL.revokeObjectURL(this._url);
        }
        this._url = URL.createObjectURL(file);
        this.properties.url = this._url;
        this.loadImage(this._url, function (img) {
            that.size[1] = (img.height / img.width) * that.size[0];
        });
    };

    LiteGraph.registerNodeType("cardgame3/event", EventNode);    

})(this);
