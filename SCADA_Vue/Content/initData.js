
var jspConfig = {
    lineColor: "#2f8e00",
    basicType: {
        connector: "StateMachine",
        paintStyle: { stroke: "red", strokeWidth: 4 },
        hoverPaintStyle: { stroke: "blue" },
        overlays: [
            "Arrow"
        ]
    },
    endpointHoverStyle: {
        fill: "#216477",
        stroke: "#216477"
    },
    sourceEndpoint: {
        endpoint: "Dot",
        paintStyle: {
            stroke: "#7AB02C",
            fill: "transparent",
            radius: 7,
            strokeWidth: 1
        },
        isSource: true,
        connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
        connectorStyle: {
            strokeWidth: 2,
            stroke: "#61B7CF",
            joinstyle: "round",
            outlineStroke: "white",
            outlineWidth: 2
        },
        hoverPaintStyle: {
            fill: "#216477",
            stroke: "#216477"
        },
        connectorHoverStyle: {
            strokeWidth: 3,
            stroke: "#216477",
            outlineWidth: 5,
            outlineStroke: "white"
        },
        dragOptions: {},
        overlays: [
            ["Label", {
                location: [0.5, 1.5],
                label: "Drag",
                cssClass: "endpointSourceLabel",
                visible: false
            }]
        ]
    },
    targetEndpoint: {
        endpoint: "Dot",
        paintStyle: { fill: "#7AB02C", radius: 7 },
        hoverPaintStyle: {
            fill: "#216477",
            stroke: "#216477"
        },
        dropOptions: { hoverClass: "hover", activeClass: "active" },
        isTarget: true,
        overlays: [
            ["Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible: false }]
        ]
    },
    init: function (connection) {
        connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
    }
}
var jsMethods = {
    _addEndpoints: function (instance, toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            instance.addEndpoint("flowchart" + toId, jspConfig.sourceEndpoint, {
                anchor: sourceAnchors[i], uuid: sourceUUID
            });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint("flowchart" + toId, jspConfig.targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
        }
    },
    _addElement: function (instance, newId) {
        instance.draggable(newId);
        var eps = jsPlumb.getSelector(".dragPoint");
        for (var i = 0; i < eps.length; i++) {
            var e = eps[i], p = e.parentNode;
            instance.makeSource(e, { parent: p, anchor: "Continuous" }, jspConfig.sourceEndpoint);
        }
        instance.makeTarget(newId, { dropOptions: { hoverClass: "dragHover" }, anchor: "Continuous" }, jspConfig.sourceEndpoint);
    },
    _connectElements: function (instance, edge) {
        var line = instance.connect({ source: edge.sourceId, target: edge.targetId, editable: true });
    },
    _deleteConnect: function (instance, edge) {

    },
    _initBatch: function (instance) {
        // suspend drawing and initialise.
        instance.batch(function () {
            // listen for new connections; initialise them the same way we initialise the connections at startup.
            instance.bind("connection", function (connInfo, originalEvent) {
                jspConfig.init(connInfo.connection);
            });
            // make all the window divs draggable
            // instance.draggable(jsPlumb.getSelector(jsLayout), { grid: [20, 20] });

            //
            // listen for clicks on connections, and offer to delete connections on click.
            //
            instance.bind("click", function (conn, originalEvent) {
                // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
                //   instance.detach(conn);
                conn.toggleType("basic");
            });

            instance.bind("connectionDrag", function (connection) {
                console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
            });

            instance.bind("connectionDragStop", function (connection) {
                console.log("connection " + connection.id + " was dragged");
            });

            instance.bind("connectionMoved", function (params) {
                console.log("connection " + params.connection.id + " was moved");
            });
        });
    }
}

function initJsplumb() {
    var instance = jsPlumb.getInstance({
        Endpoint: ["Dot", { radius: 2 }],
        HoverPaintStyle: { strokeStyle: "#1e8151", lineWidth: 2 },
        ConnectionOverlays: [
            ["Arrow", { location: 1, id: "arrow", length: 10, foldback: 0.8, width: 10 }],
            ["Label", { label: "", id: "label", cssClass: "labelstyle" }]
        ],
        DragOptions: { zIndex: 2000 },
        Cantainer: "jsLayout"
    });
    instance.registerConnectionType("basic", jspConfig.basicType);
    jsMethods._initBatch(instance);

    jsPlumb.fire("jsPlumbLoaded", instance);

    return instance;
}