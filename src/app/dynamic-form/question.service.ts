import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';

@Injectable()
export class QuestionService {

  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: 'caller',
        label: 'Who is the caller?',
        options: [
          {key: 'self',  value: 'Self'},
          {key: 'other',  value: 'Other'}          
        ],
        order: 1
      }),

      new TextboxQuestion({
        key: 'surname',
        label: 'Employee Surname',
        value: '',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'dateOfBirth',
        label: 'Empoyee DoB',
        type: 'date',
        order: 3
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
