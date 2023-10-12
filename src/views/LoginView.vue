<template>
  <div class="container flex h-screen items-center justify-center text-center">
    <div class="h-fit w-full max-w-sm">
      <h5 class="mb-4 text-center text-xl font-semibold">管理員登入</h5>
      <div class="mb-4">
        <label for="account" class="mb-2 block text-start font-semibold"
          >帳號</label
        >
        <input
          id="account"
          type="email"
          v-model="tempMember.email"
          placeholder="請輸入信箱"
          class="form-input w-full"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="mb-2 block text-start font-semibold"
          >密碼</label
        >
        <input
          id="password"
          type="password"
          v-model="tempMember.password"
          placeholder="請輸入密碼"
          class="form-input w-full"
        />
      </div>
      <div class="flex items-center justify-center gap-x-4 py-6">
        <button
          type="button"
          class="border px-8 py-2 text-lg font-bold text-stone-600 hover:bg-stone-200"
          @click="$router.back()"
        >
          取消
        </button>
        <button
          type="button"
          class="btn px-8 py-2 text-lg font-bold"
          @click="logInMember(tempMember)"
        >
          登入
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAdminStore from "../stores/adminStore";

const adminStore = useAdminStore();
const { logIn } = adminStore;

const tempMember = ref({});

const router = useRouter();

const logInMember = (member) => {
  const account = { ...member };
  logIn(account);
  router.push("/admin/data");
};
</script>

<style scoped></style>
