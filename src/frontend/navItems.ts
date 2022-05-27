interface navItem {
  title: string
  category: string
  link: string
}
interface item {
  title: string
  link: string
}
interface categoryItems {
  [category: string]: item[]
}
interface navItems {
  categories: string[]
  categoryItems: categoryItems
}

class NavMenu {
  static #instance: NavMenu
  #navItems = this.#getCategoryItems(
    this.#getNavItem(this.#removeLayoutPathsAt(this.#getSvelteFilePaths()))
  )

  constructor() {
    // 싱글톤
    if (NavMenu.#instance) return NavMenu.#instance
    NavMenu.#instance = this
  }

  #getSvelteFilePaths(): string[] {
    return Object.keys(import.meta.glob('../routes/**'))
  }

  #removeLayoutPathsAt(SvelteFilePaths: string[]): string[] {
    return SvelteFilePaths.filter((path) => path.includes('.svelte') && !path.includes('__'))
  }

  #getNavItem(SvelteFilePathsWithoutLayout: string[]): navItem[] {
    return SvelteFilePathsWithoutLayout.map((path) => {
      // 클린패스는 스벨트킷 라우터에서 폴더명과 파일명을 제외한 경로를 제거한 경우를 말함.
      const cleanPath = path.slice(9).replace('.svelte', '')

      const category = getCategory()
      const title = getTitle()
      const link = getLink()
      function getCategory() {
        return cleanPath === '/index' ? 'main' : cleanPath.slice(1).split('/')[0]
      }
      function getTitle() {
        return cleanPath === '/index' ? cleanPath.slice(1) : cleanPath.slice(1).split('/')[1]
      }
      // ! 폴더 안 index.svelte 파일은 생성하지 않는다.
      function getLink() {
        return cleanPath === '/index' ? '/' : cleanPath
      }
      return { title, category, link }
    })
  }

  #getCategoryItems(navItem: navItem[]): navItems {
    const categoryItems = getCategoryItems(navItem)
    const categories = getCategories(categoryItems)

    function getCategoryItems(navItem: navItem[]) {
      const categoryItems: categoryItems = {}
      navItem.forEach((item) => {
        const { title, link } = item
        if (!(item.category in categoryItems)) categoryItems[item.category] = []
        categoryItems[item.category].push({ title, link })
      })
      return categoryItems
    }
    function getCategories(items: categoryItems) {
      return Object.keys(items)
    }
    return { categories, categoryItems }
  }

  get navItems(): navItems {
    return this.#navItems
  }
}
export const { categories, categoryItems } = new NavMenu().navItems
