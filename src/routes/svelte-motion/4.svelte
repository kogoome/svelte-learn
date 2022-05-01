<script>
  import  {Motion}  from "svelte-motion";
  
  let status = "hover";
  let tstatus = "tap";
</script>

<Motion
  whileHover={{ scale: 1.2, transition: { duration: .5 } }}
  onHoverStart={_=>status="hover started"}
  onHoverEnd={_=>status="hover ended"}
  whileTap={{ rotate: 45, transition: { duration: 1 } }}
  onTapStart={_=>tstatus="tap started"}
  onTap={_=>tstatus="tap succesfull"}
  onTapCancel={_=>tstatus="tap cancelled"}
  let:motion>
  <div use:motion class="h-20 w-20 bg-black"/>
  <!-- 두개있으면 마지막거만 적용 -->
  <div use:motion class="h-20 w-20 bg-black"/>
</Motion>
<div >{status} - {tstatus}</div>