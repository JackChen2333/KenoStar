/*******************************************************************************/
// TRGS Publication Subscription Service
/*******************************************************************************/

'use strict';

function T1PubSub() {
	this.events = {};
	this.id = 0;
};

// Subscribe an event to be called
T1PubSub.prototype.subscribe = function(event, fnSubscriptor) {

	if (!event){
		T1Utils.consoleLog("The event sent in T1GMApi.subscribeToEvent() method is NULL or UNDEFINED!");
		T1Utils.consoleLog(fnSubscriptor);
		return;
	} 

	if (!this.events[event]) {
		this.events[event] = [];
	}

	this.events[event].push({
		id : ++this.id,
		fn : fnSubscriptor
	});

	return this.id;
};

// Publish an event (so the method that has subscribed it gets the call)
T1PubSub.prototype.publish = function(eventName, data) {
	
	if (!eventName){
		T1Utils.consoleLog("The event sent in T1GMApi.publishEvent() method is NULL or UNDEFINED!");
		T1Utils.consoleLog(data);
		return;
	} 

	var eventData = {
		type : eventName
	};
	
	if (data !== undefined)
		eventData.data = data;

	if (this.events[eventName]) {
		for (var i = this.events[eventName].length - 1; i >= 0; i--) {
			this.events[eventName][i] && this.events[eventName][i].fn && this.events[eventName][i].fn(eventData);
		};

		if (this.events[eventName]) {
			return this.events[eventName].length;
		}
	}

	return false;
};

// Unsubscribe a previoulsy subscribed event to be called
T1PubSub.prototype.unsubscribe = function(id) {

	if (!id){
		T1Utils.consoleLog("The id sent in T1GMApi.unsubscribeFromEvent() method is NULL or UNDEFINED!");
		return;
	}

	var that = this,
		deleted = false;

	for (var i in this.events) {
		for (var j = 0; j < this.events[i].length && !deleted; j++){

			// Search event to delete
			if (this.events[i][j].id === id) {
				that.events[i].splice(j, 1);
				deleted = true;
			}

		}
	}

	return deleted;

};
