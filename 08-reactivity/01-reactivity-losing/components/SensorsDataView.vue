<template>
  <div v-if="!sensors">Loading...</div>
  <template v-else>
    {{ $data }}
    <sensors-data-row v-for="sensor in sensors" :key="sensor.id" :sensor="sensor" />
  </template>
</template>

<script>
import { SensorsDataController } from '../services/SensorsDataController';
import { SensorsDataStreamingService } from '../services/SensorsDataStreamingService';
import SensorsDataRow from './SensorsDataRow';

export default {
  name: 'SensorsDataView',

  components: { SensorsDataRow },

  data() {
    return {
      rowIndex: 0,
      sensors: null,
    };
  },

  mounted() {
    this.sensorsDataController = new SensorsDataController(new SensorsDataStreamingService());
    this.sensorsDataController.addDataCallback(this.callback);

    console.log('this.sensorsDataController', this.sensorsDataController);

    // Раз в секунду запрашиваем и выводим новые данные сенсоров
    setInterval(() => {
      this.sensorsDataController.getData();
    }, 1000);
  },

  beforeUnmount() {
    this.sensorsDataController.removeDataCallback(this.callback);
    this.sensorsDataController.close();
  },

  computed: {
    forceRerender() {
      return rowIndex += 1;
    }
  },

  methods: {
    callback(data) {
      this.setData(data);
    },

    setData(sensors) {
      this.sensors = { ...sensors };
    },
  },
};
</script>

<style scoped></style>
