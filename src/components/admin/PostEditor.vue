<template>
  <div class="mb-8">
    <Editor :api-key="apiKey" :init="init" v-model="tempPost.content" />
  </div>
  
</template>

<script setup>
import { reactive, ref, toRefs, watch } from "vue";
import { storeToRefs } from "pinia";
import usePostStore from "../../stores/postStore";

import tinymce from "tinymce/tinymce.js";
import "tinymce/models/dom";
import Editor from "@tinymce/tinymce-vue";
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
import "tinymce/plugins/save";
// 語言包
import "tinymce-i18n/langs/zh_TW.js";


const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  plugins: {
    type: [String, Array],
    default: "quickbars table image code link lists preview save",
  },
  toolbar: {
    type: [String, Array],
    default:
      "code | fontfamily fontsize styles| link image| save | undo redo | forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent blockquote table | removeformat | bold italic underline strikethrough | preview ",
  },
  postId: {
    type: String,
  }
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
  save_onsavecallback: () => {
    savePost(tempPost.value.content, postId.value)
  }
});

const { modelValue, postId } = toRefs(props);
const postStore = usePostStore()
const { tempPost } = storeToRefs(postStore)

watch(modelValue, () => {
  tempPost.value.content = modelValue.value;
});

const apiKey = ref(import.meta.env.VITE_TINY_MCE_API);




const savePost = ( content, id) => {
  emit("update", { content, id });
};
</script>
