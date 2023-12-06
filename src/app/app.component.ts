import { Component, OnInit } from '@angular/core';

import { QuestionService } from './shared/services/question.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public questions$ = this.questionService.question$;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.getQuestions().pipe(first()).subscribe();
  }
}
