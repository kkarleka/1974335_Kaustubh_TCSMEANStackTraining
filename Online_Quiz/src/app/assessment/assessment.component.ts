import { Component, OnInit } from '@angular/core';
import { Questions } from '../model-questions';
import { QuizService } from '../quiz.service';
import {FormsModule, NgForm, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  quizQuestionsInfo : Questions[];
  isFormSubmitted : boolean = false;
  isFormValid : boolean = false;
  msg : string;
  correctAnswers : number = 0;
  inCorrectAnswers : number = 0;
  isReview : boolean = false;

  constructor(private quizService : QuizService){}

  ngOnInit() : void{
    this.quizService.generateQuestions().subscribe(res => 
      this.quizQuestionsInfo = res
      );
    }


  // radioChecked(answer){
  //   alert(answer);
  // }
  

  form = new FormGroup({
    quizanswers0: new FormControl('', Validators.required),
    quizanswers1: new FormControl('', Validators.required),
    quizanswers2: new FormControl('', Validators.required),
    quizanswers3: new FormControl('', Validators.required),
    quizanswers4: new FormControl('', Validators.required),
    quizanswers5: new FormControl('', Validators.required),
    quizanswers6: new FormControl('', Validators.required),
    quizanswers7: new FormControl('', Validators.required),
    quizanswers8: new FormControl('', Validators.required),
    quizanswers9: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }

  submit(){
    this.isFormSubmitted = true;
    if(!this.form.valid) {
      alert("false");
      return false;
    }
    else
    {
      for(let i=0; i<this.quizQuestionsInfo.length; i++)
      {
        var res = this.form.get('quizanswers'+i).value;
        console.log(res);
        if (this.quizQuestionsInfo[i].answer === res)
        {
          this.quizQuestionsInfo[i].selectedAnswer = true;
          this.quizQuestionsInfo[i].userAnswered = res;
          this.correctAnswers += 1;
        }
        else
        {
          this.inCorrectAnswers += 1;
          this.quizQuestionsInfo[i].userAnswered = res;
        }
      }
      
      this.msg = "Quiz Submitted Successfully.",
      this.isFormValid = true;
    }

   
    //console.log(this.form.value);
  }

  reviewAnswers(){
    this.isReview = true;
    this.msg = "";
  }


}
