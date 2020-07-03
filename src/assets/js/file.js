
export const dataURLtoBlob = (dataUrl) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const str = atob(arr[1])
  let n = str.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = str.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
export const dataURLtoFile = (dataUrl, filename) => {
  dataUrl = dataUrl.split(',')
  const mime = dataUrl[0].match(/:(.*?);/)[1]
  const str = atob(dataUrl[1])
  let n = str.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = str.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
export const blobToFile = (theBlob, fileName) => {
  return new window.File([theBlob], fileName, { type: theBlob.type, lastModified: Date.now() })
}
export const ImgCompress = (file) => {
  return new Promise(resolve => {
    const self = this
    let Orientation
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      const result = this.result
      const img = new Image()
      img.src = result
      img.onload = function () {
        const data = self.compress(img, Orientation)
        resolve(self.dataURLtoFile(data, file.filename))
      }
    }
  })
}
export const compress = (img, Orientation, size = 1) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const tCanvas = document.createElement('canvas')
  const tctx = tCanvas.getContext('2d')
  let width = img.width
  let height = img.height
  let ratio
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio)
    width /= ratio
    height /= ratio
  } else {
    ratio = 1
  }
  canvas.width = width
  canvas.height = height
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  let count
  if ((count = width * height / 1000000) > 1) {
    // console.log('超过100W像素')
    count = ~~(Math.sqrt(count) + 1)
    const nw = ~~(width / count)
    const nh = ~~(height / count)
    tCanvas.width = nw
    tCanvas.height = nh
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height)
  }
  if (Orientation !== '' && Orientation !== 1) {
    switch (Orientation) {
      case 6:
        this.rotateImg(img, 'left', canvas)
        break
      case 8:
        this.rotateImg(img, 'right', canvas)
        break
      case 3:
        this.rotateImg(img, 'right', canvas)// 转两次
        this.rotateImg(img, 'right', canvas)
        break
    }
  }
  // const initSize = img.src.length
  // console.log('压缩前：' + initSize)
  // console.log('压缩后：' + ndata.length)
  // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
  // tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
  return canvas.toDataURL('image/jpeg', size)
}
export const rotateImg = (img, direction, canvas) => {
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  const minStep = 0
  const maxStep = 3
  if (img == null) return
  // img的高度和宽度不能在img元素隐藏后获取，否则会出错
  const height = img.height
  const width = img.width
  let step = 2
  if (direction === 'right') {
    step++
    // 旋转到原位置，即超过最大值
    step > maxStep && (step = minStep)
  } else {
    step--
    step < minStep && (step = maxStep)
  }
  // 旋转角度以弧度值为参数
  const degree = step * 90 * Math.PI / 180
  const ctx = canvas.getContext('2d')
  switch (step) {
    case 0:
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0)
      break
    case 1:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height)
      break
    case 2:
      canvas.width = width
      canvas.height = height
      ctx.rotate(degree)
      ctx.drawImage(img, -width, -height)
      break
    case 3:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, -width, 0)
      break
  }
}
