import { onUnmounted, onMounted, onUpdated } from "vue";

export default function useLifecycleLog() {
  onMounted(() => {
    console.log(`Log: component mounted`);
  });
  onUpdated(() => {
    console.log(`Log: component updated`);
  });
  onUnmounted(() => {
    console.log(`Log: component unmounted`);
  });
}
