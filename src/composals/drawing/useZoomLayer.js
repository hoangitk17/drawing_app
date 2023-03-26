// mouse.js

export function useZoomLayer(layerRef, layerConfig) {
  const scaleBy = 1.05;
  return (e) => {
    const layerElement = layerRef.value.getNode();
    console.log(layerElement, layerConfig);
    // stop default scrolling
    e.evt.preventDefault();

    var oldScale = layerElement.scaleX();
    var pointer = layerElement.getRelativePointerPosition();
    console.log(pointer, oldScale);

    var mousePointTo = {
      x: (pointer.x - layerElement.x()) / oldScale,
      y: (pointer.y - layerElement.y()) / oldScale,
    };

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    layerConfig.scale = { x: newScale, y: newScale };
    layerConfig.x = pointer.x - mousePointTo.x * newScale;
    layerConfig.y = pointer.y - mousePointTo.y * newScale;
  };
}
