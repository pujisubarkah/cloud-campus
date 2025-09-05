import { ref } from 'vue'
import { useRoute } from 'vue-router'

export function useSidebarMenu() {
  const route = useRoute()
  const isCollapsed = ref(true)
  const isActive = (path: string) => {
    return route.path === path ? 'bg-blue-800 text-yellow-300 rounded-lg font-semibold' : ''
  }
  const handleMouseEnter = () => { isCollapsed.value = false }
  const handleMouseLeave = () => { isCollapsed.value = true }
  return { isCollapsed, isActive, handleMouseEnter, handleMouseLeave }
}
