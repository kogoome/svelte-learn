export interface navItem {
	title: string;
	link: string;
}

class NavMenu {
	static #instance: NavMenu;
	navItems: navItem[] = [];
	constructor() {
		if (NavMenu.#instance) {
			return NavMenu.#instance;
		}
		NavMenu.#instance = this;
		this.navItems = this.#getTitleLinkFor(this.#removeLayoutPathsAt(this.#getSvelteFilePaths()));
	}

	#getSvelteFilePaths(): string[] {
		return Object.keys(import.meta.glob('../routes/**'));
	}
	#removeLayoutPathsAt(SvelteFilePaths: string[]): string[] {
		return SvelteFilePaths.filter((path) => path.includes('.svelte') && !path.includes('__'));
	}
	// 과도함 if 의 사용으로 리팩터링 필요하지만,
	// 확장 가능성이 크지 않고 아래 출력함수의 데이터만 필요하기 때문에
	// 추가 리팩터링은 보류
	#getTitleLinkFor(SvelteFilePaths: string[]): navItem[] {
		const result = SvelteFilePaths.map((path) => {
			const cleanPath = path.slice(9).replace('.svelte', '');
			let title = '';
			if (cleanPath.includes('/index')) {
				title = cleanPath.slice(1);
				// .replace("/index", "") // 각 폴더 index타이틀 제거
				// .replace("index", "main") // 메인 index타이틀 변경
			} else {
				title = cleanPath.slice(1);
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
			return { title, link };
		});
		result.sort((a, b) => {
			if (a.title < b.title) {
				return -1;
			}
			// if (a.title > b.title) {
			//   return 1
			// }
			return 0;
		});
		return result;
	}
}

export const navItems = new NavMenu().navItems;
