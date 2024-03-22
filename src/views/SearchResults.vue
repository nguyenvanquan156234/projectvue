<template>
  <div>
    <h1>Search Results</h1>
    <ul v-if="search && search.length > 0"> <!-- Kiểm tra search có tồn tại và có độ dài lớn hơn 0 -->
      <li v-for="(product, index) in search" :key="index">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
    <p v-else>Không tìm thấy kết quả nào cho "{{ $route.query.q }}"</p>
  </div>
</template>

<script>
export default {
  computed: {
    search() {
      return this.$store.state.search; // Trả về giá trị của state.search từ Vuex store
    }
  }
};
</script>
