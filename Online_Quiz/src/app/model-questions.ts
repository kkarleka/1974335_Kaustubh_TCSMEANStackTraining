export class Questions 
{
    constructor( 
        public questionId : number,
        public question : string,
                public options : string[],
                public answer : string,
                public selectedAnswer : boolean,
                public userAnswered : boolean
    ){}
}