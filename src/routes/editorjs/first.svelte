<script>
  import EditorJS from '@editorjs/editorjs'
  import Header from '@editorjs/header'
  import List from '@editorjs/list'

  const editor = new EditorJS({
    holder: 'editorjs', // div id
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['link']
      },
      list: {
        class: List,
        inlineToolbar: true
      }
    }
  })
</script>

<div id="editorjs" />
