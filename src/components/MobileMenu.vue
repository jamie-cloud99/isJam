<template>
  <div class="bg-light fixed top-[90px] z-50 h-screen w-full">
    <div class="border-b-2 py-6">
      <div class="container space-y-2">
        
        <RouterLink
          to="/posts"
          class="font-serif font-semibold hover:text-secondary-dark block py-1 text-lg"
        >
          <i class="icofont-ui-file mr-1"></i>
          文章總覽
        </RouterLink>
        <RouterLink
          to="/"
          class="font-Yese hover:text-secondary-dark block py-1 text-lg"
        >
          <i class="icofont-ui-user mr-1"></i>
          LOGIN
        </RouterLink>
      </div>
    </div>
    <div class="container">
      <div class="space-y-4 pb-6 pt-4">
        <div>
          <label for="account" class="mb-2 block">帳號</label>
          <input
            type="text"
            id="account"
            class="form-input block w-full border-2 border-primary bg-transparent pl-4 text-xl placeholder:text-xl placeholder:text-[#878787] focus:border-primary focus:ring-secondary"
            placeholder="請輸入帳號"
          />
        </div>
        <div>
          <label for="password" class="mb-2 block">密碼</label>
          <input
            type="text"
            id="password"
            class="form-input block w-full border-2 border-primary bg-transparent pl-4 text-xl placeholder:text-xl placeholder:text-[#878787] focus:border-primary focus:ring-secondary"
            placeholder="請輸入密碼"
          />
        </div>
      </div>
      <button
        type="button"
        class="w-full btn p-4 text-lg font-bold"
      >
        登入
        <span class="ml-1">»</span>
      </button>
    </div>
  </div>
</template>

<script setup></script>
