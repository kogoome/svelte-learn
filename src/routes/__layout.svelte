<script>
	import '../app.css';
	import Nav from '../frontend/nav.svelte'
	import {navItems} from '../frontend/navItems';

</script>

<Nav {navItems}></Nav>
<slot/>
