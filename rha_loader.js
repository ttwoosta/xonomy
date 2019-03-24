
"use strict";

/*
   RedHawk Xonomy Test
   Author: Tu Tong
   Date:   Mar 24, 2019

   Filename: rha_loader.js
	
*/

$(function() {
    
    $.get("http://localhost/rha_sample_scrubbed.xml", function (xml_file) {
            

        var editor = document.getElementById("xml-editor");

        var docSpec = {
            allowLayby: true,
            onchange: function () {
                console.log("I been changed now!")
            },
            validate: function (obj) {
                console.log("I be validatin' now!")
            },
            elements: {
                "Zip": {
                    shy: true,
                    asker: Xonomy.askRemote,
                    askerParameter: {
                        url: "http://localhost:9830/zipcode",
                    },
                }
            }
        }
        
        Xonomy.render(xml_file, editor, docSpec);
    });
})


