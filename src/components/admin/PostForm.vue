<template>
  <div>
    <VForm v-slot="{ errors }">
      <div class="mb-3">
        <label for="title" class="mb-1 block font-serif text-lg lg:text-xl"
          >標題<sup class="ml-1 text-red-600">*</sup></label
        >
        <VField
          name="title"
          label="標題"
          v-model.trim="tempPost.title"
          type="text"
          id="title"
          rules="required"
          class="form-input w-full border-transparent bg-white/90 focus:ring-4"
          :class="getInputClass(errors['title'])"
        />
        <ErrorMessage name="title" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label for="postType" class="mb-1 block font-serif text-lg lg:text-xl"
          >文章性質<span class="text-sm"
            >(例如：完食心得、年度推薦、跟播紀錄)</span
          ><sup class="ml-1 text-red-600">*</sup></label
        >
        <VField
          name="postType"
          label="文章性質"
          v-model.trim="tempPost.postType"
          type="text"
          id="postType"
          rules="required"
          class="form-input w-full border-transparent bg-white/90 focus:ring-4"
          :class="getInputClass(errors['postType'])"
        />
        <ErrorMessage name="postType" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label for="date" class="mb-1 block font-serif text-lg lg:text-xl"
          >日期<sup class="ml-1 text-red-600">*</sup></label
        >
        <VField
          name="date"
          type="date"
          id="date"
          label="創作日期"
          v-model="writingDate"
          rules="required"
          class="form-input w-full border-transparent bg-white/90 focus:ring-4"
          :class="getInputClass(errors['date'])"
        />
        <ErrorMessage name="date" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label for="category" class="mb-1 block font-serif text-lg lg:text-xl"
          >主類別 <sup class="ml-1 text-red-600">*</sup></label
        >
        <VField
          as="select"
          name="category"
          id="category"
          label="類別"
          v-model="tempPost.category"
          rules="required"
          class="form-input w-full border-transparent bg-white/90 focus:ring-4"
          :class="getInputClass(errors['category'])"
        >
          <option value="" selected disabled>請選擇文章類別</option>
          <option :value="item.code" v-for="item in categoryList" :key="item.title">
            {{ item.title }}
          </option>
        </VField>
        <ErrorMessage name="category" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label
          for="description"
          class="mb-1 block font-serif text-lg lg:text-xl"
          >引言/簡介<sup class="ml-1 text-red-600">*</sup></label
        >
        <VField
          as="textarea"
          label="簡介"
          name="description"
          id="description"
          v-model.trim="tempPost.description"
          rules="required"
          class="form-input w-full border-transparent bg-white/90 focus:ring-4"
          :class="getInputClass(errors['description'])"
        />
        <ErrorMessage name="description" class="text-red-600" />
      </div>

      <div class="mb-3">
        <label for="imageUrl" class="mb-1 block font-serif text-lg lg:text-xl"
          >首圖網址 <span class="text-sm">(URL)</span>
          <sup class="ml-1 text-red-600">*</sup></label
        >
        <VField
          type="url"
          name="imageUrl"
          label="首圖網址"
          id="imageUrl"
          v-model.trim="tempPost.imageUrl"
          rules="required|url"
          class="form-input w-full border-transparent bg-white/90 focus:ring-4"
          :class="getInputClass(errors['imageUrl'])"
        />
        <ErrorMessage name="imageUrl" class="text-red-600" />
      </div>
      <div class="mb-3">
        <label for="tag" class="mb-1 block font-serif text-lg lg:text-xl"
          >標籤
          <span class="text-sm">(請使用、分隔，例如：韓樂、搖滾、歌單)</span
          ><sup class="ml-1 text-red-600">*</sup></label
        >
        <VField
          name="tag"
          label="標籤"
          v-model.trim="tagsString"
          type="text"
          id="tag"
          rules="required"
          class="form-input w-full border-transparent bg-white/90 focus:ring-4"
          :class="getInputClass(errors['tag'])"
        />

        <ErrorMessage name="tag" class="text-red-600" />
      </div>
      <div class="mb-3">
        <h4 class="mb-1 font-serif text-lg lg:text-xl">是否公開</h4>
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            name="public"
            id="public"
            v-model="tempPost.isPublic"
            class="h-5 w-5 border-transparent bg-white/90 text-primary focus:ring-2 focus:ring-primary"
          />
          <label for="public" class="">公開</label>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import usePostStore from "../../stores/postStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  post: {
    type: Object,
    default: {
      author: "",
      imageListUrl: [],
      isPublic: false,
      tag: [],
    },
  },
});

const postStore = usePostStore();
const { categoryList, tempPost } = storeToRefs(postStore);

const writingDate = ref("");
const tagsString = ref("");

watch(
  () => props.post,
  () => {
    tempPost.value = { ...props.post };
  },
  { deep: true, immediate: true },
);

watch(
  () => tempPost.value.createAt,
  () => {
    writingDate.value = new Date(tempPost.value.createAt * 1000)
      .toISOString()
      .split("T")[0];
    tagsString.value = tempPost.value.tag.join("、");
  },
);

watch(writingDate, () => {
  tempPost.value.createAt = Math.floor(new Date(writingDate.value) / 1000);
});

watch(tagsString, () => {
  const ary = tagsString.value.split("、");
  if (ary.length > 0 && ary[ary.length - 1] === "") {
    ary.pop();
  }
  tempPost.value.tag = ary;
});

const getInputClass = (errors) => {
  return errors
    ? "border-red-600 focus:border-red-600 focus:ring-red-600/30"
    : "focus:border-primary/60 focus:ring-primary/30";
};
</script>
