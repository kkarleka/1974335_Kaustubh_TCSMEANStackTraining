import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questions } from './model-questions';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private httpClient : HttpClient) { }

  generateQuestions(): Observable<Questions[]>{
    return this.httpClient.get<Questions[]>("http://localhost:3000/questions");
  }
}


