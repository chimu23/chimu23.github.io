import { encode, decode } from 'js-base64';
// 加密
const encrypt = function(text) {
	return encode(text)
}
// 解密
const decrypt = function(text) {
	return decode(text)
}


const copyText = function(text, tip = '复制成功') {
	uni.setClipboardData({
		data: text,
		success: function() {
			uni.showToast({
				title: tip
			});
		}
	});
}

export {
	encrypt,
	decrypt,
	copyText
}
