var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _NavMenu_instances, _a, _NavMenu_instance, _NavMenu_navItems, _NavMenu_getSvelteFilePaths, _NavMenu_removeLayoutPathsAt, _NavMenu_getTitleLinkFor, _NavMenu_getCategoryItems;
class NavMenu {
    constructor() {
        _NavMenu_instances.add(this);
        _NavMenu_navItems.set(this, __classPrivateFieldGet(this, _NavMenu_instances, "m", _NavMenu_getCategoryItems).call(this, __classPrivateFieldGet(this, _NavMenu_instances, "m", _NavMenu_getTitleLinkFor).call(this, __classPrivateFieldGet(this, _NavMenu_instances, "m", _NavMenu_removeLayoutPathsAt).call(this, __classPrivateFieldGet(this, _NavMenu_instances, "m", _NavMenu_getSvelteFilePaths).call(this)))));
        if (__classPrivateFieldGet(NavMenu, _a, "f", _NavMenu_instance)) {
            return __classPrivateFieldGet(NavMenu, _a, "f", _NavMenu_instance);
        }
        __classPrivateFieldSet(NavMenu, _a, this, "f", _NavMenu_instance);
    }
    get navItems() {
        return __classPrivateFieldGet(this, _NavMenu_navItems, "f");
    }
}
_a = NavMenu, _NavMenu_navItems = new WeakMap(), _NavMenu_instances = new WeakSet(), _NavMenu_getSvelteFilePaths = function _NavMenu_getSvelteFilePaths() {
    return Object.keys(import.meta.glob('../routes/**'));
}, _NavMenu_removeLayoutPathsAt = function _NavMenu_removeLayoutPathsAt(SvelteFilePaths) {
    return SvelteFilePaths.filter((path) => path.includes('.svelte') && !path.includes('__'));
}, _NavMenu_getTitleLinkFor = function _NavMenu_getTitleLinkFor(SvelteFilePaths) {
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
        }
        else {
            [category, title] = cleanPath.slice(1).split('/');
        }
        let link = '';
        if (cleanPath.includes('/index')) {
            if (cleanPath === '/index') {
                link = '/';
            }
            else {
                link = cleanPath.replace('/index', '');
            }
        }
        else {
            link = cleanPath.replace('index', '');
        }
        return { title, category, link };
    });
    return result;
}, _NavMenu_getCategoryItems = function _NavMenu_getCategoryItems(navItems) {
    const categoryItems = {};
    navItems.forEach((item) => {
        const { title, link } = item;
        if (!(item.category in categoryItems))
            categoryItems[item.category] = [];
        categoryItems[item.category].push({ title, link });
    });
    const categories = Object.keys(categoryItems);
    return { categories, categoryItems };
};
_NavMenu_instance = { value: void 0 };
export const { categories, categoryItems } = new NavMenu().navItems;
//# sourceMappingURL=navItems.js.map