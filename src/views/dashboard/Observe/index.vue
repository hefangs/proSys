<template>
  <div>
    底部的数据可视化
    <Category />
    <Search />
  </div>
</template>

<script>
import Search from './Search'
import Category from './Category'
export default {
  name: 'Observe',
  components: {
    Category,
    Search
  }
}
</script>

<style scoped></style>
