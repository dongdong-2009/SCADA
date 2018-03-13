
function sortable(rootEl, onUpdate) {
    var dragEl;

    //
    [].slice.call(rootEl.children).forEach(function (itemEl) {
        itemEl.draggable = true;
    });

    function _onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var target = evt.target;
        evt.dataTransfer.dropEffect = 'copy';
        if (target && evt.srcElement.children.length > 0) 
            evt.dataTransfer.setData("text/html", evt.srcElement.children[0])

        //if (target && target !== dragEl && target.nodeName == 'LI') {
        //    rootEl.insertBefore(dragEl, target.nextSibling || target);
        //}
    }
    function _onDragEnd(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        dragEl.classList.remove('ghost');
        rootEl.removeEventListener('dragover', _onDragOver, false);
        rootEl.removeEventListener('dragend', _onDragEnd, false);
        onUpdate(dragEl, evt);
    }
    rootEl.addEventListener('dragstart', function (evt) {
        dragEl = evt.target;
        evt.dataTransfer.effectAllowed = 'copy';
        evt.dataTransfer.setData('Text', dragEl.textContent);
        rootEl.addEventListener('dragover', _onDragOver, false);
        rootEl.addEventListener('dragend', _onDragEnd, false);
        setTimeout(function () {
            dragEl.classList.add('ghost');
        }, 0)
    }, false);
}