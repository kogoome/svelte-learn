interface navItem {
	title: string;
	category: string;
	link: string;
}
interface item {
	title: string;
	link: string;
}
interface categoryItems {
	[category: string]: item[];
}
interface navItems {
	categories: string[];
	categoryItems: categoryItems;
}

class NavMenu {
	static #instance: NavMenu;
	#navItems = this.#getCategoryItems(
		this.#getTitleLinkFor(this.#removeLayoutPathsAt(this.#getSvelteFilePaths()))
	);

	constructor() {
		if (NavMenu.#instance) {
			return NavMenu.#instance;
		}
		NavMenu.#instance = this;
	}

	#getSvelteFilePaths(): string[] {
		return Object.keys(import.meta.glob('../routes/**'));
	}
	#removeLayoutPathsAt(SvelteFilePaths: string[]): string[] {
		return SvelteFilePaths.filter((path) => path.includes('.svelte') && !path.includes('__'));
	}

	#getTitleLinkFor(SvelteFilePaths: string[]): navItem[] {
		const result = SvelteFilePaths.map((path) => {
			const cleanPath = path.slice(9).replace('.svelte', '');
			// 확장 가능성 없어서 추가 리팩터링 보류
			let title = '';
			let category = '';
			if (cleanPath.includes('/index')) {
				title = cleanPath.slice(1);
				// .replace("/index", "") // 각 폴더 index타이틀 제거
				// .replace("index", "main") // 메인 index타이틀 변경
				category = 'main';
			} else {
				[category, title] = cleanPath.slice(1).split('/');
			}
			let link = '';
			if (cleanPath.includes('/index')) {
				if (cleanPath === '/index') {
					link = '/';
				} else {
					link = cleanPath.replace('/index', '');
				}
			} else {
				link = cleanPath.replace('index', '');
			}
			return { title, category, link };
		});
		return result;
	}

	#getCategoryItems(navItems: navItem[]): navItems {
		const categoryItems: categoryItems = {};
		navItems.forEach((item) => {
			const { title, link } = item;
			if (!(item.category in categoryItems)) categoryItems[item.category] = [];
			categoryItems[item.category].push({ title, link });
		});
		const categories = Object.keys(categoryItems);
		return { categories, categoryItems };
	}

	get navItems(): navItems {
		return this.#navItems;
	}
}

export const { categories, categoryItems } = new NavMenu().navItems;
