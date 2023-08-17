<template>
  <div class="container py-10">
    <div class="grid grid-cols-1 lg:grid-cols-12">
      <div class="col-span-1 lg:col-span-8 lg:col-start-3">
        <PostEditor :model-value="post.content" @update="postStore.updateContent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import PostEditor from "../../components/admin/PostEditor.vue";
import usePostStore from "../../stores/postStore";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const postStore = usePostStore();
const { post } = storeToRefs(postStore);
const { fetchPost } = postStore;

const route = useRoute();

const id = computed(() => {
  return route.params.postId;
});

fetchPost(id.value);
</script>
