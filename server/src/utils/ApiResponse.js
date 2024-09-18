class ApiResponse {

   constructor(
      statusCode,
      message,
      data,
      anything
   ) {

      this.statusCode = statusCode;
      this.data = data;
      this.anything = anything;
   
   }

}

export {
   ApiResponse
}