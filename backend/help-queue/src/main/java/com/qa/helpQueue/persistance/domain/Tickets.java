package com.qa.helpQueue.persistance.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Tickets {

	@Id //Primary Key
	@GeneratedValue(strategy = GenerationType.IDENTITY) //auto increment
	private Long ticketID;
	
	@Column
	private String author;
	
	@Column
	private String description;
	
	@Column
	private Long time_created;
	
	@Column 
	private String topic;
	
	@Column
	private Long urgency;
	
	@Column
	private boolean complete;

	public Long getTicketID() {
		return ticketID;
	}

	public void setTicketID(Long ticketID) {
		this.ticketID = ticketID;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getTime_created() {
		return time_created;
	}

	public void setTime_created(Long time_created) {
		this.time_created = time_created;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public Long getUrgency() {
		return urgency;
	}

	public void setUrgency(Long urgency) {
		this.urgency = urgency;
	}

	public boolean isComplete() {
		return complete;
	}

	public void setComplete(boolean complete) {
		this.complete = complete;
	}
	
	
}
