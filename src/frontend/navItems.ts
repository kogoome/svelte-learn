function getSvelteFilePaths(): Array<string> {
	return Object.keys(import.meta.glob('../routes/**'));
}
function removeLayoutPathsAt(SvelteFilePaths: Array<string>): Array<string> {
	return SvelteFilePaths.filter((path) => path.includes('.svelte') && !path.includes('__'));
}

interface navItem {
	title: string;
	link: string;
}
// 리팩터링 필요
function getTitleLinkFor(SvelteFilePaths: Array<string>): Array<navItem> {
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

const navItems: Array<navItem> = getTitleLinkFor(removeLayoutPathsAt(getSvelteFilePaths()));

export default navItems;
