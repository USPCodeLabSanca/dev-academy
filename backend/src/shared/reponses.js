exports.Response = class Response{
	constructor(success = true, message = "", data = ""){
		this.message = message;
		this.success = success;
		this.data = data;
	}

	static success(message = "", data = ""){
		return new Response(true, message, data);
	}

	static error(message = "", data = ""){
		return new Response(false, message, data);
	}

	json(){
		return JSON.stringify(this);
	}
}