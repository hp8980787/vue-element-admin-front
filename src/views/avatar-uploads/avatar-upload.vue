<template>
  <el-row>
    <div class="components-container">
      <aside>
        This is based on
        <a class="link-type" href="//github.com/dai-siki/vue-image-crop-upload">
          vue-image-crop-upload</a>. Since I was using only the vue@1 version, and it is not compatible
        with mockjs at the moment, I modified it myself, and if you are going to
        use it, it is better to use official version.
      </aside>

      <pan-thumb :image="image" />

      <el-button
        type="primary"
        icon="el-icon-upload"
        style="position: absolute; bottom: 15px; margin-left: 40px"
        @click="imagecropperShow = true"
      >
        Change Avatar
      </el-button>

      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        name="avatar"
        :width="300"
        :height="300"
        :url="uploadsUrl"
        lang-type="en"
        :headers="headers"
        @close="close"
        @crop-upload-success="cropSuccess"
      />
    </div>
  </el-row>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { getToken } from '@/utils/auth'
export default {
  name: 'AvatarUploadDemo',
  components: { ImageCropper, PanThumb },
  props: {
    uploadsUrl: {
      type: String,
      required: true
    },
    avatarImage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      headers: {
        Authorization: 'bearer ' + getToken()
      }
    }
  },
  mounted() {
    this.image = this.avatarImage
  },
  methods: {
    cropSuccess(resData) {
      console.log(resData)
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
      console.log(this.image)
      this.sendAvatar()
    },
    sendAvatar() {
      this.$emit('add-avatar', this.image)
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>

