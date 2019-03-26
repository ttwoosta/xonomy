
"use strict";

/*
   RedHawk Xonomy Test
   Author: Tu Tong
   Date:   Mar 24, 2019

   Filename: rha_loader.js
	
*/

function jsUcfirst(string) 
{
    var words = string.split(" ");
    var newStr = "";
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        newStr += (word.charAt(0).toUpperCase() + word.slice(1));
    }

    return newStr;
}

function filterByValue(searchText) {
    var text = searchText.toLowerCase();
    $("#xml-editor div").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(text) > -1)
        // if (this.firstChild.dataset.name !== undefined)
        //     $(this).toggle(this.firstChild.dataset.name.toLowerCase().indexOf(text) > -1);
        // else
        //     $(this).toggle(false);
    });
}

function filterByName(searchText) {
    var text = jsUcfirst(searchText);

    if (text.length > 0) {
        $("#xml-editor div").hide();
        
        var elet = $("#xml-editor div[data-name*='" + text +"']");
        elet.show();
        elet.parentsUntil("#xml-editor").show();
        elet.children(".children").show();
        elet.children(".children").children().show();
    }
    else {
        $("#xml-editor div").show();
    }
}

$(function() {
    $( "#my-datepicker-2" ).datepicker();

    Xonomy.askDate=function(defaultString, askerParameter, jsMe) {
        var width=($("body").width()*.5)-75;
        var picker = $("<div></div>").datepicker({
            option: {
                dateFormat: "mm/dd/yy",
            },
            onSelect: function (dateStr, e) {
                debugger;
            },
            onClose: function (dateStr, e) {
                debugger;
            }

        }).html();
        picker = "<div class='focusme'>" + picker + "</div>";
        
        var html="";
        html+="<form onsubmit='Xonomy.answer(this.val.value); return false'>";
            //html+="<input name='val' class='textbox focusme' style='width: "+width+"px;' value='"+Xonomy.xmlEscape(defaultString)+"' onkeyup='Xonomy.notKeyUp=true'/>";
            html += picker;
            html+=" <input type='submit' value='OK'>";
        html+="</form>";
        return html;
    };
    
    $("#filter-by-value-input").on("keyup", function() {
        filterByValue($(this).val());
    });

    $("#filter-by-name-input").on("keyup", function() {
        filterByName($(this).val());
    });

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
                },
                "DateTime": {
                    shy: true,
                    asker: Xonomy.askDate,
                    askerParameter: {
                        url: "http://localhost:9830/zipcode",
                    },
                },

            }
        }
        
        Xonomy.render(xml_file, editor, docSpec);
    });
})


