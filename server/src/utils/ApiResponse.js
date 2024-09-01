class ApiResponse {

   constructor(
      statusCode,
      message,
      data,
      anything
   ) {
      super(message);
      this.statusCode = statusCode;
      this.data = data;
      this.anything = anything;
   
   }

}

export {
   ApiResponse
}