/**
 * Display a group entry
 */
var GroupEntry = React.createClass({

	// Get initial state
	getInitialState: function() {
		return {
			showDetails: false
		};
	},
	
	// Get properties
	getDefaultProps: function() {
		return {
			group: {
				date: '',
				message: '',
				entries: []	
			}
		};
	},

	// Property types
	propTypes: {
		group: React.PropTypes.object
	},

	// Toggle entry details
	toggleDetails: function(e) {
		e.preventDefault();

		this.setState({showDetails: !this.state.showDetails});
	},

	// Render component
	render: function() {
		var group = this.props.group;
		var errorDetails = [];
		var groupDetails = '';
		
		if (group.errorType) {
			errorDetails.push((
				<div className="error-type">Error type: { group.errorType }</div>
			));
		}
		
		if (group.line) {
			errorDetails.push((
				<div className="line-number">Line: { group.line }</div>
			));
		}
		
		if (group.filePath) {
			errorDetails.push((
				<div className="file-path">File: { group.filePath }</div>
			));
		}		

		if (this.state.showDetails) {
			var groupEntryDetails = [];

			for (var key in group.entries) {
				var entry = group.entries[key];
				var entryDate = new Date(entry.date + ' ' + entry.time + ' ' + entry.timezone);

				groupEntryDetails.push((
					<TimeStamp date={ entryDate } />
				));
			}

			groupDetails = (
				<div className="group-entry-details active">
					<div className="details">
						<a href="#" className="hide-group-details" onClick={ this.toggleDetails }>Hide details</a>

						<p>Date and time errors occured:</p>
						{ groupEntryDetails }
					</div>
				</div>
			);
		} else {
			groupDetails = (
				<div className="group-entry-details">
					<div className="details">
						<a href="#" className="show-group-details" onClick={ this.toggleDetails }>More details</a>
					</div>
				</div>
			);
		}

		return (
			<div className="group-entry">
				<TimeStamp date={ group.date } />
				<div className="message">
					{ group.message }
					<div className="error-details">
						{ errorDetails }
					</div>
					{ groupDetails }
				</div>
			</div>
		);
	}
});