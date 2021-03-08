<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>第二章：产品思维和产品意识</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row :gutter='20' style="display: flex; justify-content: center">
        <video id="example_video_1" class="video-js" controls preload="none" width="640" height="264" poster="http://vjs.zencdn.net/v/oceans.png" data-setup="{}">
          <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
        </video>
      </el-row>
      <el-row>
        <div style="margin-left: 26%;">
          <el-link type="primary" href="https://www.conval.com/wp-content/uploads/Clampseal-Globe-Valve-Servicing-Instructions-2018.pdf" download>
            <h1>课件下载</h1>
          </el-link>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chapter02-lesson',
}
</script>
<style>
.video-js {
  width: 640px;
  height: 264px;
}
</style>