jQuery Tutorial Engine
----------------------

The purpose of this small library is to allow the declerative creation of a quick-and-dirty tutorial that can be overlayed on an existing web page.
A dark semi-translarent layer (css class DarkLayer, opacity : 0.6) is overlayed on the page. Then one element at a time is highlighted
and at the same time a baloon with the "help tip" for this element or site section is displayed. The tutorial can be made up of many
tips that are displayed one at a time. The only  requirement for the existing UI is that the elements that are bound to the tutorial
have absolute CSS positioning so that the z-index CSS attribute works properly.

Online demo : http://mvctest.theokand.com/jquerytipengine/
JSFiddle: http://jsfiddle.net/TheoKand/SRuh7/13/

Screenshots:
https://github.com/TheoKand/jQueryTutorialEngine/blob/master/Screenshots/2.png
https://github.com/TheoKand/jQueryTutorialEngine/blob/master/Screenshots/1.png

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


Copyright (c) 2014 Theo Kandiliotis tKandiliotis@gmail.com
