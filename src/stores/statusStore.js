import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("statusStore", () => {
  const status = ref({
    isSaving: false,
    isNewPost: true,
    showAdminMenu: true
  });

  

  return { status};
});
