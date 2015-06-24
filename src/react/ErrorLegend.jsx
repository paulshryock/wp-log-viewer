/**
 * Display error legend
 */
var ErrorLegend = React.createClass({

	// Render component
	render: function() {
		return (
			<ul className="error-indicator-legend">
				<li className="fatal-error">Fatal Error</li>
				<li className="php-notice">PHP Notice</li>
				<li className="php-warning">PHP Warning</li>
			</ul>
		);	
	}
});