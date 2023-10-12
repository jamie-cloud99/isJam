<template>
  <div class="mb-6 lg:mb-8">
    <h1 class="font-serif text-2xl font-bold lg:text-8">編輯文章</h1>
  </div>
  <div class="mb-8 grid grid-cols-1 gap-6 lg:mb-10 lg:grid-cols-12">
    <div class="order-2 col-span-1 lg:col-span-8">
      <PostEditor
        :model-value="post.content"
        @update="updateContent"
        :post-id="id"
      />
    </div>
    <div class="order-1 col-span-1 lg:order-3 lg:col-span-4">
      <PostForm :post="post" />
    </div>
  </div>
  <div class="mt-8 flex justify-center gap-x-6 lg:justify-end">
    <button
      type="button"
      class="border px-8 py-2 text-lg font-bold text-stone-600 hover:bg-stone-200"
      @click="returnPage"
    >
      取消
    </button>
    <button
      type="button"
      class="btn px-8 py-2 text-lg font-bold"
      :class="{ 'bg-primary/50': status.isSaving }"
      :disabled="status.isSaving"
      @click="savePost(tempPost, id)"
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
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import PostEditor from "../../components/admin/PostEditor.vue";
import PostForm from "../../components/admin/PostForm.vue";
import usePostStore from "../../stores/postStore";
import useStatusStore from "../../stores/statusStore";

const statusStore = useStatusStore();
const { status } = storeToRefs(statusStore);

const postStore = usePostStore();
const { post, tempPost } = storeToRefs(postStore);
const { fetchPost, updateContent, updatePost } = postStore;

const route = useRoute();
const router = useRouter();

const id = computed(() => {
  return route.params.postId;
});
fetchPost(id.value);

const savePost = async (post, id) => {
  await updatePost(post, id);
  // router.push('/admin/posts')
};

const returnPage = () => {
  router.back();
  status.value.showAdminMenu = true;
};

status.value.showAdminMenu = false;
</script>
