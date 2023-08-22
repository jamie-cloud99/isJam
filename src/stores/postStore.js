import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

import axios from "axios";
import { useHead } from "@unhead/vue";
import useStatusStore from "./statusStore";

const { VITE_JSON_SERVER } = import.meta.env;

export default defineStore("postStore", () => {
  const statusStore = useStatusStore();
  const { status } = storeToRefs(statusStore);

  const postList = ref([]);
  const today = ref(Math.floor(new Date() / 1000));
  const newPost = ref({
    author: "JamJam",
    imageListUrl: [],
    isPublic: false,
    tag: [],
    createAt: today.value,
  });
  const post = ref({});
  const postLasted = ref({});
  const tempPost = ref({});
  const categoryList = ref([
    {
      icon: "fa-clapperboard",
      title: "影劇",
    },
    {
      icon: "fa-guitar",
      title: "音樂",
    },
    {
      icon: "fa-book-open-reader",
      title: "閱讀",
    },
    {
      icon: "fa-laptop-code",
      title: "程式",
    },
    {
      icon: "fa-user-astronaut",
      title: "雜想",
    },
  ]);

  const recentPosts = computed(() => {
    return postList.value.slice(0, 6);
  });

  const fetchPostsAll = async () => {
    const res = await axios.get(`${VITE_JSON_SERVER}posts`);
    postList.value = res.data;
    getNewestPost()
    getSeoTags(postLasted)
  };

  const fetchPost = async (id) => {
    const api = `${VITE_JSON_SERVER}posts/${id}`;
    try {
      const res = await axios.get(api);
      post.value = res.data;
      getSeoTags(post)
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (post) => {
    status.value.isSaving = true;
    const api = `${VITE_JSON_SERVER}posts/`;
    try {
      await axios.post(api, post);
      status.value.isSaving = false;
    } catch (error) {
      console.log(error);
      status.value.isSaving = false;
    }
  };

  const updateContent = async ({ content, id }) => {
    status.value.isSaving = true;
    const api = `${VITE_JSON_SERVER}posts/${id}`;
    const data = { content };
    try {
      await axios.patch(api, data);
      // await fetchPost(id);
      status.value.isSaving = false;
    } catch (error) {
      status.value.isSaving = false;
      console.log(error);
    }
  };

  const updatePost = async (post, id) => {
    status.value.isSaving = true;
    const api = `${VITE_JSON_SERVER}posts/${id}`;
    try {
      const res = await axios.patch(api, post);
      console.log(res);
      status.value.isSaving = false;
    } catch (error) {
      console.log(error);
      status.value.isSaving = false;
    }
  };

  const clearPost = () => {
    post.value = {};
  };

  const getNewestPost = () => {
    postLasted.value = postList.value.sort((a, b) => b.createAt-a.createAt)[0]
  }

  const getSeoTags = (post) => {
     useHead({
        templateParams: {
          site: {
            name: "JamJam Blog 即興發揮的日常",
            url: "https://jamie-cloud99.github.io/isJam/#",
          },
          separator: "-",
        },
        title: `${post.value.title}|%site.name`,
        meta: [
          {
            name: "description",
            content: `${post.value.description}`,
          },
          {
            property: "og:site_name",
            content: `JamJam Blog 即興發揮的日常`,
          },
          {
            property: "og:title",
            content: `${post.value.title}`,
          },
          {
            property: "og:description",
            content: `${post.value.description}`,
          },
          {
            property: "og:url",
            content: `%site.url/post/${post.value.id}`,
          },
          {
            property: "og:image",
            content: `${post.value.imageUrl}`,
          },
        ],
      });
  }

  return {
    today,
    newPost,
    postList,
    recentPosts,
    post,
    tempPost,
    categoryList,
    fetchPostsAll,
    updateContent,
    fetchPost,
    createPost,
    updatePost,
    clearPost,
  };
});
