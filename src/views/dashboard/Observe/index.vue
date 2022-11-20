<template>
  <div>
    底·
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
