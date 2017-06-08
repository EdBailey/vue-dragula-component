<template>
    <div>
      <slot></slot>
    </div>
</template>
<script>
    import makeDrake from '../lib/dragula-singleton'
    export default{
      props: {
        value: {
          type: Array,
          required: true
        },
        group: {
          type: String,
          default: 'defaultGroup'
        },
        copy: {
          type: Boolean,
          default: false
        },
        moves: {
          type: Boolean,
          default: true
        }
      },
      data () {
        return {
          drake: null
        }
      },
      computed: {
        dragging () {
          return this.drake.dragging
        }
      },
      methods: {
        emitEvents (drake) {
          let sourceIndex = -1
          drake.on('cloned', (clone, original, type) => {
            sourceIndex = this.elementIndex(original)
            this.$emit('cloned', clone, original, type)
          })
          drake.on('drag', (el, source) => {
            if (source === this.$el) {
              this.$emit('drag', el, source)
            }
          })
          drake.on('drop', (el, target, source, sibling) => {
            // If this element is not involved, or there is no source or target, skip
            if ([source, target].indexOf(this.$el) === -1 || !source || !target) {
              return
            }
            let sourceModel = source.__vue__.value
            let targetModel = target.__vue__.value
            let transitModel = source.__vue__.value[sourceIndex]
            let targetIndex = this.elementIndex(sibling)

            if (source === target) {
              // I'm not 100% sure about this but it appears to solve some problems...
              // possibly needs sourceIndex < targetIndex too?
              targetIndex -= 1
            }

            let newValue = this.value.slice()

            if (source === this.$el) {
              this.$emit('drop:source', el, target, source, sibling, {sourceModel, targetModel, transitModel, sourceIndex, targetIndex})
              if (!this.copy) {
                newValue.splice(sourceIndex, 1) // Remove from source model
              }
            }
            if (target === this.$el) {
              this.$emit('drop:target', el, target, source, sibling, {sourceModel, targetModel, transitModel, sourceIndex, targetIndex})
              newValue.splice(targetIndex, 0, transitModel) // add to target model
            }

            if (source !== target && el.parentNode) {
              el.parentNode.removeChild(el)
            }

            this.$emit('input', newValue)

            transitModel = null
          })
        },
        elementIndex (el) {
          return Array.from(el.parentNode.children).indexOf(el)
        }
      },
      mounted () {
        var options = {
          copy (el, source) {
            console.log({source, vue: source.__vue__, copy: source.__vue__.copy, result: source.__vue__ && source.__vue__.copy})
            return source.__vue__ && source.__vue__.copy
          },
          accepts (el, target, source, sibling) {
            return target.__vue__ && target.__vue__.copy === false
          },
          moves (el, source, handle, sibling) {
            return source.__vue__ && source.__vue__.moves
          }
        }
        this.drake = makeDrake(this.$el, options, this.group)
        this.emitEvents(this.drake)
      }
    }
</script>
<style src="dragula/dist/dragula.css" />
