function wplv_remote(action, method, data, success) {
	var data = typeof data === 'object' ? data : {};
	
	data.do = action;
		
	reqwest({
		url: WPLOGVIEWER.api,
		method: method,
		data: data,
		headers: {
			'wplv-cookie': WPLOGVIEWER.cookie_token,
			'wplv-session': WPLOGVIEWER.session_key
		},
		success: success
	});
}

React.render(
	<Viewer />,
	document.getElementById('wp-log-viewer')
);