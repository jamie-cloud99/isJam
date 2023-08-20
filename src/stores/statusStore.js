import { defineStore } from "pinia";
import { reactive } from "vue";

export default defineStore("statusStore", () => {
  const status = reactive({
    isSaving: false,
    isNewPost: true,
  });

  

  return { status,  };
});
