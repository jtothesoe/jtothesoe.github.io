export class ErrorHandler{
    constructor(public message: string = '', public exist:boolean = false){}

    setError(err){
          this.message = err.message,
          this.exist = true 
    }

    resetError(){
        this.exist = false;
    }
}