
/*
   RedHawk Xonomy Test
   Author: Tu Tong
   Date:   Mar 24, 2019

   Filename: rha_xml_spec.js
	
*/

var schoolSpec = {
    onchange: function () {
        //console.log("Ah been chaaanged!");
    },
    validate: function (jsElement) {
        if (typeof (jsElement) == "string") jsElement = Xonomy.xml2js(jsElement);
        var valid = true;
        var elementSpec = this.elements[jsElement.name];
        if (elementSpec.validate) {
            elementSpec.validate(jsElement); //validate the element
        }
        for (var iAttribute = 0; iAttribute < jsElement.attributes.length; iAttribute++) {
            var jsAttribute = jsElement.attributes[iAttribute];
            var attributeSpec = elementSpec.attributes[jsAttribute.name];
            if (attributeSpec.validate) {
                if (!attributeSpec.validate(jsAttribute)) valid = false; //validate the attribute
            }
        }
        for (var iChild = 0; iChild < jsElement.children.length; iChild++) {
            if (jsElement.children[iChild].type == "element") {
                var jsChild = jsElement.children[iChild];
                if (!this.validate(jsChild)) valid = false; //recurse to the child element
            }
        }
        return valid;
    },
    elements: {
        "school": {
            menu: [{
                caption: "Add @id",
                action: Xonomy.newAttribute,
                actionParameter: { name: "id", value: "" },
                hideIf: function (jsElement) { return jsElement.hasAttribute("id") }
            }],
            attributes: {
                "id": {
                    asker: Xonomy.askString,
                    askerParameter: {},
                    menu: [{
                        caption: "Delete",
                        action: Xonomy.deleteAttribute,
                        actionParameter: null,
                        hideIf: function (jsAttribute) { return false }
                    }],
                    validate: function (jsAttribute) {
                        if ($.trim(jsAttribute.value) == "") {
                            Xonomy.warnings.push({ htmlID: jsAttribute.htmlID, text: "The @id attribute should not be empty." });
                            return false;
                        }
                        return true;
                    },
                },
                "name": {
                    asker: Xonomy.askString,
                    askerParameter: {},
                    menu: [],
                    validate: function (jsAttribute) {
                        if ($.trim(jsAttribute.value) == "") {
                            Xonomy.warnings.push({ htmlID: jsAttribute.htmlID, text: "The @name attribute should not be empty." });
                            return false;
                        }
                        return true;
                    },
                    //isReadOnly: function(jsAttribute){return true},
                    //isInvisible: function(jsAttribute){return true},
                }
            },
            collapsed: function (jsElement) { return false }
        },
        "teachers": {
            backgroundColour: "#ffd6d6",
            menu: [{
                caption: "New <person>",
                action: Xonomy.newElementChild,
                actionParameter: "<person name='' sex=''/>",
                hideIf: function (jsElement) { return false }
            }],
            collapsed: function (jsElement) { return false },
        },
        "students": {
            backgroundColour: "#d6d6ff",
            menu: [{
                caption: "New <person>",
                action: Xonomy.newElementChild,
                actionParameter: "<person name='' sex=''/>",
                hideIf: function (jsElement) { return false }
            }],
            collapsed: function (jsElement) { return false }
        },
        "person": {
            //isReadOnly: function(jsMe){return true},
            //isInvisible: function(jsMe){return true},
            //displayName: "člověk",
            canDropTo: ["teachers", "students"],
            localDropOnly: false,
            menu: [
                {
                    caption: "New <person> before this",
                    action: Xonomy.newElementBefore,
                    actionParameter: "<person name='' sex=''/>",
                    hideIf: function (jsElement) { return false }
                },
                {
                    caption: "New <person> after this",
                    action: Xonomy.newElementAfter,
                    actionParameter: "<person name='' sex=''/>",
                    hideIf: function (jsElement) { return false }
                },
                {
                    caption: "Add @age",
                    action: Xonomy.newAttribute,
                    actionParameter: { name: "age", value: "" },
                    hideIf: function (jsElement) { return jsElement.hasAttribute("age") }
                },
                {
                    caption: "Delete",
                    action: Xonomy.deleteElement,
                    actionParameter: null,
                    hideIf: function (jsElement) { return false }
                }
            ],
            attributes: {
                "name": {
                    asker: Xonomy.askString,
                    askerParameter: {},
                    menu: [],
                    validate: function (jsAttribute) {
                        if ($.trim(jsAttribute.value) == "") {
                            Xonomy.warnings.push({ htmlID: jsAttribute.htmlID, text: "The @name attribute should not be empty." });
                            return false;
                        }
                        return true;
                    },
                },
                "sex": {
                    shy: false,
                    asker: Xonomy.askPicklist,
                    askerParameter: [
                        { value: "m", xdisplayValue: "muž", caption: "male" },
                        { value: "f", xdisplayValue: "žen", caption: "female" },
                        { value: "x", xdisplayValue: "jin", caption: "it's complicated" }
                    ],
                    caption: function (jsMe) {
                        if (jsMe.value == "m") return "male";
                        if (jsMe.value == "f") return "female";
                        if (jsMe.value == "x") return "it's complicated";
                    },
                    // displayName: "pohlaví",
                    // displayValue: function(jsMe){
                    // if(jsMe.value=="m") return "muž";
                    // if(jsMe.value=="f") return "žen";
                    // if(jsMe.value=="x") return "jin";
                    // return jsMe.value;
                    // },
                    menu: [],
                    validate: function (jsAttribute) {
                        if ($.trim(jsAttribute.value) == "") {
                            Xonomy.warnings.push({ htmlID: jsAttribute.htmlID, text: "The @sex attribute should not be empty." });
                            return false;
                        }
                        return true;
                    },
                },
                "age": {
                    shy: false,
                    asker: Xonomy.askString,
                    askerParameter: null,
                    menu: [{
                        caption: "Delete",
                        action: Xonomy.deleteAttribute,
                        actionParameter: null,
                        hideIf: function (jsAttribute) { return false }
                    }],
                    validate: function (jsAttribute) {
                        if (!/^[0-9]+$/g.test(jsAttribute.value)) {
                            Xonomy.warnings.push({ htmlID: jsAttribute.htmlID, text: "The @age attribute should be a whole number greater than zero." });
                            return false;
                        }
                        return true;
                    },
                },
            },
            collapsed: function (jsElement) { return false }
        }
    }
};




