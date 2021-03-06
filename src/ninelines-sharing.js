export default class Share {
	/**
	 * @param {string} social
	 * @param {string} url
	 * @returns {string|null}
	 */
	static getUrl(social, url) {
		if (Share.urlList[social]) {
			return Share.urlList[social] + encodeURIComponent(url);
		}

		return null;
	}

	/**
	 * @param {string} url
	 * @param {Promise|null} [promise]
	 * @param {string} [title]
	 * @param {string} [features]
	 * @returns {Window}
	 */
	static openWindow(url, promise = null, title = 'Поделиться', features = 'width=640,height=480,location=no,toolbar=no,menubar=no') {
		let shareWindow;

		if (promise) {
			shareWindow = window.open('', title, features);

			promise
				.then(() => {
					shareWindow.location = url;
				})
				.catch(() => {
					shareWindow.close();
				});
		} else {
			shareWindow = window.open(url, title, features);
		}

		return shareWindow;
	}

	/**
	 * @param {string} url
	 * @param {Promise|null} [promise]
	 * @returns {Window}
	 */
	static facebook(url, promise = null) {
		return Share.openWindow(Share.getUrl('facebook', url), promise);
	}

	/**
	 * @param {string} url
	 * @param {Promise|null} [promise]
	 * @returns {Window}
	 */
	static vk(url, promise = null) {
		return Share.openWindow(Share.getUrl('vk', url), promise);
	}

	/**
	 * @param {string} url
	 * @param {Promise|null} [promise]
	 * @returns {Window}
	 */
	static twitter(url, promise = null) {
		return Share.openWindow(Share.getUrl('twitter', url), promise);
	}

	/**
	 * @param {string} url
	 * @param {Promise|null} [promise]
	 * @returns {Window}
	 */
	static google(url, promise = null) {
		return Share.openWindow(Share.getUrl('google', url), promise);
	}

	/**
	 * @param {string} url
	 * @param {Promise|null} [promise]
	 * @returns {Window}
	 */
	static ok(url, promise = null) {
		return Share.openWindow(Share.getUrl('ok', url), promise);
	}
}

Share.urlList = {
	facebook: 'https://facebook.com/sharer/sharer.php?u=',
	vk: 'https://vk.com/share.php?url=',
	twitter: 'http://twitter.com/share?url=',
	google: 'https://plus.google.com/share?url=',
	ok: 'https://connect.ok.ru/offer?url=',
};
