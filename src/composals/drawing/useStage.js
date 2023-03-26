export default function useStage(stageRef, stageConfig) {
  function exportStage() {
    console.log(stageRef.value);
    const stageElement = stageRef.value.getNode();
    return stageElement.toDataURL({
      pixelRatio: 2, // or other value you need
    });
  }
  return {
    exportStage,
  };
}
