(function () {
    function buildComponent() {
        const designFlowComponent = {
            name: 'designFlow',
            data() {
                return {

                }
            },
            render(createElement) {
                return createElement("canvas", {
                    attr: {
                        id: "de"
                    }
                })
            },
            mounted() {
                console.log("渲染完成")
            }
        }
        return designFlowComponent;
    }
   

    if (typeof exports == "object") {
        var Fabric = require("fabricjs")
        //module.exports = buildDraggable(Sortable)
    } else if (typeof define == "function" && define.amd) {
        // define(['fabricjs'], function (Sortable) { return buildDraggable(Sortable); });
    } else if (window && (window.Vue)) {
        var designFlow = buildComponent();
        Vue.component('designFlow', designFlow)
    }
})()