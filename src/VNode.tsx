import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'VNode',
  props: {
    msg: {
      type: String,
    }
  },
  // setup(props) {
  //   return () => h('h1', { id: 'vnode' }, props.msg)
  // }
  setup(props) {
    const count = ref(1)
    return () => (
      <div>
        <h2 id="tsx">{props.msg}</h2>
        <p>{count.value}</p>
      </div>
    )
  }
})