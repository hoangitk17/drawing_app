<template>
  <div class="home-page d-flex">
    <div class="options">
      <div class="d-flex flex-column">
        <v-btn
          v-for="feature in features"
          :key="feature.id"
          class="mt-2 mx-2"
          @click="feature.handleClick"
        >
          <v-icon :icon="feature.icon"></v-icon>
        </v-btn>
      </div>

      <v-btn @click="exportStage"> Print </v-btn>
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
          <v-circle
            v-for="circle in circles"
            :key="circle.id"
            :config="circle.config"
          ></v-circle>
          <v-rect
            v-for="rectangle in rectangles"
            :key="rectangle.id"
            :config="rectangle.config"
          ></v-rect>
          <v-arrow
            v-for="arrow in arrows"
            :key="arrow.id"
            :config="arrow.config"
          ></v-arrow>
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

const handleAddCircle = () => {
  const newId = `circle_${new Date().getTime()}`;
  const newCircle = {
    id: newId,
    config: {
      x: 50,
      y: 50,
      stroke: "black",
      radius: 70,
      strokeWidth: 4,
      draggable: true,
    },
  };
  circles.push(newCircle);
};
const handleAddRectangle = () => {
  const newId = `rectangle_${new Date().getTime()}`;
  const newRectangle = {
    id: newId,
    config: {
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: "green",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
    },
  };
  rectangles.push(newRectangle);
};
const handleAddArrow = () => {
  const newId = `arrow_${new Date().getTime()}`;
  const newArrow = {
    id: newId,
    config: {
      x: 30,
      y: 30,
      points: [30, 30, 100, 100],
      pointerLength: 20,
      pointerWidth: 20,
      tension: 100,
      lineJoin: "round",
      lineCap: "round",
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
    },
  };
  arrows.push(newArrow);
};

let features = reactive([
  {
    id: "1",
    name: "circle",
    icon: "mdi-circle-outline",
    handleClick: handleAddCircle,
  },
  {
    id: "2",
    name: "rectangle",
    icon: "mdi-rectangle-outline",
    handleClick: handleAddRectangle,
  },
  {
    id: "3",
    name: "arrow",
    icon: "mdi-arrow-top-right-bold-outline",
    handleClick: handleAddArrow,
  },
]);

let circles = reactive([]);
let rectangles = reactive([]);
let arrows = reactive([]);

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
