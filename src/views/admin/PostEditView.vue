<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 order-2">
    <div class="col-span-1 lg:col-span-4">
      <PostForm />
    </div>
    <div class="col-span-1 lg:col-span-8 order-1 lg:order-3">
      <PostEditor
        :model-value="post.content"
        @update="updateContent"
        :post-id="id"
      />
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
          :class="{ 'bg-primary/50': status.isSaving }"
          :disabled="status.isSaving"
        >
          <div
            v-if="status.isSaving"
            class="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span
            >
          </div>
          <span v-else>儲存</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed} from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import PostEditor from "../../components/admin/PostEditor.vue";
import PostForm from "../../components/admin/PostForm.vue"
import usePostStore from "../../stores/postStore";
import useStatusStore from "../../stores/statusStore";


const statusStore = useStatusStore();
const { status } = storeToRefs(statusStore);

const postStore = usePostStore();
const { post } = storeToRefs(postStore);
const { fetchPost, updateContent } = postStore;

const route = useRoute();

const id = computed(() => {
    return route.params.postId;
  });
fetchPost(id.value);

</script>
