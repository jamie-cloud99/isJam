import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

import axios from "axios";
import { useHead } from "@unhead/vue";
import useStatusStore from "./statusStore";
import { Field } from "vee-validate";

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
      code: "video",
      title: "影劇",
    },
    {
      icon: "fa-guitar",
      code: "music",
      title: "音樂",
    },
    {
      icon: "fa-book-open-reader",
      code: "book",
      title: "閱讀",
    },
    {
      icon: "fa-laptop-code",
      code: "code",
      title: "程式",
    },
    {
      icon: "fa-user-astronaut",
      code: "others",
      title: "雜想",
    },
  ]);
  const categorySelected = ref({
    code: "all",
    title: "全部",
  });

  const searchList = ref([])

  const tagList = computed(() => {
    const allTags = postList.value.flatMap((post) => post.tag);
    return [...new Set(allTags)];
  });

  const tempTagList = computed(() => {
    return tagList.value.filter(tag => categoryPostList.value.some(item => item.tag.includes(tag)))
  })

  // const tagListSelected = computed(() => {
  //   return tempTagList.value
  // })

   const tagListSelected = computed(
    () => {
    return tempTagList.value
  })

  const categoryPostList = computed(() => {
    if (categorySelected.value.code === "all") {
      return postList.value;
    } else {
      const categoryFillter = (item) =>
        item.category === categorySelected.value.code;
      return postList.value.filter(categoryFillter);
    }
  })

  const tempPostList = computed(() => {
    return categoryPostList.value.filter(item => item.tag.some(tag => tagListSelected.value.includes(tag)))
    
  });

  const recentPosts = computed(() => {
    return postList.value.slice(0, 6);
  });

  const relatedPosts = computed(() => {
    return postList.value.filter(
      (item) =>
        item.category === post.value.category && item.id !== post.value.id,
    );
  });

  const fetchPostsAll = async () => {
    const res = await axios.get(`${VITE_JSON_SERVER}posts`);
    postList.value = res.data;
    getNewestPost();
    // getSeoTags(postLasted)
  };

  const fetchPost = async (id) => {
    post.value = {}
    const api = `${VITE_JSON_SERVER}posts/${id}`;
    try {
      const res = await axios.get(api);
      post.value = res.data;
      fetchPostsAll();
      getSeoTags(post);
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
    postLasted.value = postList.value.sort(
      (a, b) => b.createAt - a.createAt,
    )[0];
  };

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
  };

  const selectCategory = (code) => {
    if (code === "all") {
      categorySelected.value = {
        code: "all",
        title: "全部",
      };
      fetchPostsAll();
    } else {
      categorySelected.value = categoryList.value.filter(
        (item) => item.code === code,
      )[0];
    }
  };

  const searchPosts = async (keyword) => {
    if(postList.length === 0) await fetchPostsAll()
    searchList.value = postList.value.filter(post => {
      const searchFields = [post.title, post.content, post.description, post.type]
      return searchFields.some(field => field && field.includes(keyword))
    })
  }

  return {
    today,
    newPost,
    postList,
    recentPosts,
    post,
    tempPost,
    categoryList,
    relatedPosts,
    categorySelected,
    tempPostList,
    tempTagList,
    tagListSelected,
    searchList,
    fetchPostsAll,
    updateContent,
    fetchPost,
    createPost,
    updatePost,
    clearPost,
    selectCategory,
    searchPosts
  };
});
