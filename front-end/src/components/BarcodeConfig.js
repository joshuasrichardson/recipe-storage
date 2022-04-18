export default {
  inputStream: {
    type: "LiveStream",
    constraints: {
      facingMode: "environment",
    },
  },
  locate: false,
  numOfWorkers: navigator.hardwareConcurrency,
  frequency: 12,
  decoder: {
    readers: ["upc_reader"],
  },
};
