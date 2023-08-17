<template>
  <div class="mb-8">
    <Editor :api-key="apiKey" :init="init" v-model="editorValue" />
  </div>
  <div class="flex justify-center gap-x-6">
    <button
      type="button"
      class="border px-8 py-2 text-lg font-bold text-stone-600 hover:bg-stone-200"
    >
      取消
    </button>
    <button
      type="button"
      class="btn px-8 py-2 text-lg font-bold"
      @click="savePost(1, editorValue)"
    >
      儲存

      <div
        class="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        >
      </div>
    </button>
  </div>
</template>

<script setup>
import tinymce from "tinymce/tinymce.js";
import "tinymce/models/dom";

// 外觀
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/themes/silver";

// Icon
import "tinymce/icons/default";

// 用到的外掛
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/preview";

// 語言包
import "tinymce-i18n/langs/zh_TW.js";
import Editor from "@tinymce/tinymce-vue";

import { reactive, ref, toRefs, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  plugins: {
    type: [String, Array],
    default: "quickbars table image code link lists preview",
  },
  toolbar: {
    type: [String, Array],
    default:
      "code |  bold italic underline strikethrough | fontfamily fontsize styles | undo redo | forecolor backcolor | alignleft aligncenter alignright alignjustify |outdent indent blockquote | removeformat | numlist bullist link image table  | preview ",
  },
});
const emit = defineEmits(["update"]);

const init = reactive({
  language: "zh_TW",
  height: 400,
  menubar: false,
  content_css: false,
  skin: false,
  plugins: props.plugins,
  toolbar: props.toolbar,
  quickbars_insert_toolbar: false,
  branding: false,
  link_default_target: "_blank",
  font_size_formats: "10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt",
  content_css: "src/assets/mce.css",
  toolbar_mode: "floating",
});

const { modelValue } = toRefs(props);
const editorValue = ref("");

watch(modelValue, () => {
  editorValue.value = modelValue.value;
});

const apiKey = ref(import.meta.env.VITE_TINY_MCE_API);

const savePost = (id, content) => {
  emit("update", { id, content });
};
</script>
