<script>
  function custom1(...args) {
    let result = functionJson.name
    console.log(result)
  }
  let functionJson = {
    name: () => {
      return 'name'
    }
  }
</script>
