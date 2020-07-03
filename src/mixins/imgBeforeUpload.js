
import { apiUploadQn } from '@/api/http_url'
import { dataURLtoFile } from '@/assets/js/file'

export default {
  methods: {
    beforeUpload (file) {
      if (!/image\/\w+/.test(file.type)) {
        this.$notice.warning('请上传图片')
      } else if (file.size > 1024 * 1024) {
        this.$notice.warning('请上传1M以内的图片')
      } else {
        return Promise.resolve(file)
      }
    },
    imgUpload (file) {
      return new Promise((resolve, reject) => {
        file = dataURLtoFile(file, 'vue-cropper.jpeg')
        const data = new window.FormData()
        data.append('file', file)
        apiUploadQn(data).then(res => {
          resolve(res.fileName)
        }).catch(err => {
          this.$notice.error('上传失败')
          reject(err)
        })
      })
    }
  }
}
