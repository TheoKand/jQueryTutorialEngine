/*

jQuery Tutorial Engine - 2014

The purpose of this small library is to allow the declerative creation of a quick-and-dirty tutorial that can be overlayed on an existing web page.
A dark semi-translarent layer (css class DarkLayer, opacity : 0.6) is overlayed on the page. Then one element at a time is highlighted
and at the same time a baloon with the "help tip" for this element or site section is displayed. The tutorial can be made up of many
tips that are displayed one at a time. The only  requirement for the existing UI is that the elements that are bound to the tutorial
have absolute CSS positioning so that the z-index CSS attribute works properly.

Online demo : http://mvctest.theokand.com/tipengine
JSFiddle: http://jsfiddle.net/TheoKand/SRuh7/13/
Copyright (c) 2014 Theo Kandiliotis tKandiliotis@gmail.com
Use like this :

//initialize one or more tips for various elements
TipEngine.tips = [{
    elem: "#content2",
    tipHtml: "<h3>Area 1</h3>This is the description of area1. Click anywhere outside of this baloon, to close the tutorial. Click inside here to go to the next 'slide' ",
    left: "50%",
    top: "5%",
    width: "45%",
    height: "30%"
}, {
    elem: "#content1",
    tipHtml: "<h2>Area 2</h3>Area2 is <B>also very important bla bla bla ",
    left: "50%",
    top: "25%",
    width: "45%",
    height: "50%"
}];

//start the tutorial when something like a "show help" button is clicked. Can also be displayed at
//the load event of the document

$("#helpLink").click(function () {
    TipEngine.current = 0;
    TipEngine.showTip();
    return false;
});

 */



var TipEngine = {

    tipData: function (elem, tipHtml, left, top, width, height) {
        this.elem = elem;
        this.tipHtml = tipHtml;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    },

    showTip: function () {

        //initialize stuff when the first tip is displayed
        if (!TipEngine.darkLayer) {
            //your page should have a top level DIV that contains everything else
            TipEngine.container = $("#container");
            TipEngine.darkLayer = $("<div/>").attr("id", "DarkLayer");
        }

        //add the overlay layer that darkens the content
        TipEngine.container.append(TipEngine.darkLayer);

        //get the current tip
        var tip = TipEngine.tips[TipEngine.current];

        //add a glow effect around the element that the tip concerns
        TipEngine.tipElement = $(tip.elem);
        TipEngine.tipElement.css("z-index", "11").addClass("Glow");

        //create and display the "baloon" that contains the actual tip html
        TipEngine.tipLayer = $("<div/>").attr("id", "TipLayer");
        TipEngine.tipLayer
            .css("left", tip.left).css("top", tip.top)
            .css("width", tip.width).css("height", tip.height)
            .addClass("Glow")
            .html(tip.tipHtml);

        //clicking on a tip will go to the next one
        if (TipEngine.current < TipEngine.tips.length - 1) {
            TipEngine.tipLayer.append("<p><a href='#'>Next</a></p>").click(function () {
                TipEngine.nextTip();
                return false;
            });
        } else {
            //if it's the last one, then just close the tutorial
            TipEngine.tipLayer.click(function () {
                $(TipEngine.tipElement).css("z-index", "9").removeClass("Glow");
                TipEngine.tipLayer.remove();
                TipEngine.darkLayer.remove();

                return false;
            });
        }

        TipEngine.container.append(TipEngine.tipLayer);

        //also close the tutorial when the user clicks anywhere outside the tip
        $(document).click(function () {
            $(TipEngine.tipElement).css("z-index", "9").removeClass("Glow");
            TipEngine.tipLayer.remove();
            TipEngine.darkLayer.remove();

            $(document).unbind("click");
            return false;
        });
    },

    //go to the next step, as defined in the array that was passed in the tip engine initialization
    nextTip: function () {
        $(TipEngine.tipElement).css("z-index", "9").removeClass("Glow");
        TipEngine.tipLayer.remove();

        if (TipEngine.current < TipEngine.tips.length - 1) {
            TipEngine.current++;
            TipEngine.showTip();
        }
    },

};

