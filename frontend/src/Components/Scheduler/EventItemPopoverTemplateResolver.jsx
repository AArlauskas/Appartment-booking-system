import React, { Component } from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import "./EventItemPopoverTemplateResolver.scss";

class EventItemPopoverTemplateResolver extends Component {
	state = {};
	render() {
		return (
			<div className={this.props.title.length > 30 ? "CustomPopoverAuto" : "CustomPopoverShort"}>
				<Row type="flex" align="middle">
					<Col span={2}>
						<div className="status-dot" style={{ backgroundColor: this.props.statusColor }} />
					</Col>
					<Col span={22} className="overflow-text">
						<span className="header2-text" title={this.props.title}>
							{this.props.title}
						</span>
					</Col>
				</Row>
				<Row type="flex" align="middle">
					<Col span={2}>
						<div />
					</Col>
					<Col span={22} className="overflow-text">
						<span className="header2-text">Status: {this.props.isApproved ? "Approved" : "Draft"}</span>
					</Col>
				</Row>
				<Row type="flex" align="middle">
					<Col span={2}>
						<div />
					</Col>
					<Col span={22}>
						<span id="date" className="header1-text">
							{this.props.start.format("MMM DD")} - {this.props.end.format("MMM DD")}
						</span>
					</Col>
				</Row>
				<Row type="flex" align="middle">
					<Col span={2}>
						<div />
					</Col>
					<Col span={22}>
						<span
							className="header2-text"
							id="PopoverButtons"
							onClick={() => {
								this.props.viewEventClick(this.props.schedulerData, this.props.eventItem);
							}}
						>
							{this.props.viewEventText}
						</span>
						<span
							id="PopoverButtons"
							className="header2-text"
							style={{ marginLeft: 16 }}
							onClick={() => {
								this.props.viewEvent2Click(this.props.schedulerData, this.props.eventItem);
							}}
						>
							{this.props.viewEvent2Text}
						</span>
					</Col>
				</Row>
			</div>
		);
	}
}

export default EventItemPopoverTemplateResolver;
