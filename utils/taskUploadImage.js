import env from "../env";
// import token from "./token";
import {
	api
} from '../net/api/index.js'
/**
 * 上传一到多张图片
 * @param {Array} images 图片临时路径数组
 * @return {Object} 返回对象包括一个上传任务对象列表, 用于取消上传; 一个上传文件的promise列表
 * */
function taskUploadImage(images) {
	let uploadImageTasks = []
	let promiseTasks = []
	
	images.forEach(item => {
		let promise = new Promise((resolve, reject) => {
			uploadImageTasks.push(upload(item, resolve, reject))
		})
		promiseTasks.push(promise)
	})

	return {
		uploadImageTasks,
		promiseTasks
	}
}

/**
 * 上传单张图片
 * src: 图片临时路径
 * */
function upload(src, resolve, reject) {
	const tokenObj = wx.getStorageSync('token')
	const token = tokenObj ? tokenObj.token : ''

	// console.log('输出token', token)
	// 上传
	return wx.uploadFile({
		url: env.url('/file/upload-image'),
		filePath: src,
		name: 'file',
		header: {
			"content-type": "multipart/form-data",
			"Authorization": 'Bearer ' + token
		},
		formData: {
			// 'w': 100,
			// 'h': 100
		},
		success: (res) => {
			try {
				if (res.statusCode !== 200) {
					reject(res.data)
					return
				}
				const url = JSON.parse(res.data).data.url // 上传后的地址
				resolve(url)
			} catch (e) {
				reject(e)
			}
		},
		fail: (err) => {
			reject(err)
		}
	})
	
	// 暂时用于上传反馈图片
	// return api.oss.upload(src, api.oss.TYPE_OTHER).then(res => {
	// 	    resolve(res.url)
	// 	}).catch(e => {
	// 	    reject(e)
	// 	})
	
}

export default taskUploadImage
