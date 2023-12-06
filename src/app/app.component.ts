import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from './shared/components/models/question-base.model';
import { QuestionService } from './shared/services/question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [QuestionService],
})
export class AppComponent {
  title = 'angular-dynamic-forms';

  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
