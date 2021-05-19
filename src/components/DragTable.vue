<template>
	<a-table
		bordered
		:rowKey="(record, index) => index"
		:columns="columns"
		:components="components"
		:data-source="data"
		:pagination="false"
	>
		<slot></slot>
	</a-table>
</template>

<script>
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

export default {
	name: 'DragTable',
	props: {
		data: {
      type: Array,
			default: () => [],
    },
		columns: {
      type: Array,
			default: () => [],
    }
	},
	data() {
		this.components = {
			header: {
				cell: (h, props, children) => {
					const { key, ...restProps } = props
					const col = this.columns.find((col) => {
						const k = col.dataIndex || col.key
						return k === key
					})
					if (!col || !col.width) {
						return h('th', { ...restProps }, [...children])
					}
					const dragProps = {
						key: col.dataIndex || col.key,
						class: 'table-draggable-handle',
						attrs: {
							w: 10,
							x: col.width,
							z: 1,
							axis: 'x',
							draggable: true,
							resizable: false,
						},
						on: {
							dragging: (x, y) => {
								col.width = Math.max(x, 1)
							},
						},
					}
					const drag = h('vue-draggable-resizable', { ...dragProps })
					return h('th', { ...restProps, class: 'resize-table-th' }, [
						...children,
						drag,
					])
				},
			},
		}
		return {
		}
	}
}
</script>
<style lang="less">
.resize-table-th {
	position: relative;
	.table-draggable-handle {
		height: 100% !important;
		bottom: 0;
		left: auto !important;
		right: -5px;
		cursor: col-resize;
		touch-action: none;
	}
}
</style>
