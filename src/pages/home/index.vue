<template>
  <div class="home-page d-flex">
    <div class="options">
      <div v-for="feature in features">
        {{ feature.name }}
      </div>
      <v-btn @click="exportStage"> Button </v-btn>
    </div>
    <div class="drawing-container">
      <v-stage
        :ref="(el) => (stageRef = el)"
        :config="stageConfig"
        @wheel="zoomLayerEvent"
      >
        <v-layer
          :ref="
            (el) => {
              layerRef = el;
            }
          "
          :config="layerConfig"
        >
          <v-circle :config="circleConfig"></v-circle>
          <v-arrow :config="arrowConfig"></v-arrow>
        </v-layer>
      </v-stage>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  // inheritAttrs: false,
  // customOptions: {}
};
</script>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useZoomLayer } from "@/composals/drawing/useZoomLayer";
import useLifecycleLog from "@/composals/useLifecycleLog";
import useStage from "@/composals/drawing/useStage";
import { downloadURI } from "@/utils/helpers";
const layerRef = ref(null);
const stageRef = ref(null);

let features = reactive([
  {
    id: "1",
    name: "33",
  },
]);

let stageConfig = reactive({
  width: 500,
  height: 500,
});
let layerConfig = reactive({
  width: 500,
  height: 500,
  scale: {
    x: 1,
    y: 1,
  },
});
const zoomLayerEvent = useZoomLayer(layerRef, layerConfig);
const stageHelper = useStage(stageRef);
let circleConfig = reactive({
  x: 100,
  y: 100,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
});
let arrowConfig = reactive({
  x: 150,
  y: 150,
  points: [0, 0, 100, 100],
  pointerLength: 50,
  pointerWidth: 50,
  fill: "black",
  stroke: "black",
  strokeWidth: 7,
});

useLifecycleLog();

onMounted(() => {
  console.log("updated", layerRef);
});
const handleFeature = (event) => {
  console.log(event);
};

function exportStage() {
  // const dataURL = stageHelper.exportStage();
  const dataURL = layerRef.value.getNode().toDataURL({
    pixelRatio: 2, // or other value you need
  });
  downloadURI(dataURL, "stage.png");
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
}
.options {
  width: 200px;
  max-height: 100%;
  overflow-y: auto;
}

.drawing-container {
  flex: 1;
  height: 100%;
}
</style>
