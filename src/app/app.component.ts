import { CommonModule } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ang-calculator';

  calValue: number = 0;
  funcT: any = 'No Function';

  calNumber: string = 'noValue';
  firstNumber: number = 0;
  secondNumber: number = 0;

  onClickValue(val: string, type: any) {
    //console.log(val, type);
    if(type == 'number')     {
      this.onNumberClick(val);
    }
    else if(type == 'function')     {
      this.onFunctionClick(val);
    }
  }

  onNumberClick(val: string) {
    if(this.calNumber != 'noValue') {
      this.calNumber = this.calNumber + val;      // Subsequent Inputs
    }
    else {
      this.calNumber = val;     // First input
    }

    this.calValue = parseFloat(this.calNumber);
  }

  onFunctionClick(val: string) {

    // Call the clearAll() when 'C' button is clicked
    if(val == 'c'){
      this.clearAll();
    }
    else if(this.funcT == 'No Function') {
      this.firstNumber = this.calValue;
      this.calValue = 0;
      this.calNumber = 'noValue';
      this.funcT = val;
    }
    else if(this.funcT != 'No Function') {
      this.secondNumber = this.calValue;

      // Calculation
      this.valueCalculate(val);
    }
  }

  valueCalculate(val: string) {
    if( this.funcT == '+') {
      const total = this.firstNumber + this.secondNumber;
      this.totalAssignValues(total, val);
    }
    else if( this.funcT == '-') {
      const total = this.firstNumber - this.secondNumber;
      this.totalAssignValues(total, val);
    }
    else if( this.funcT == '*') {
      const total = this.firstNumber * this.secondNumber;
      this.totalAssignValues(total, val);
    }
    else if( this.funcT == '/') {
      const total = this.firstNumber / this.secondNumber;
      this.totalAssignValues(total, val);
    }
    else if( this.funcT == '%') {
      const total = this.firstNumber % this.secondNumber;
      this.totalAssignValues(total, val);
    }
  }

  totalAssignValues(total: number, val: string) {
    this.calValue = total;

    // Reset the number variables
    this.firstNumber = total;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.funcT = val;    

    if(val == '=') {
      this.onEqualPress();
    }
  }

  onEqualPress() {
    // Reset the variables
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.funcT = 'No Function';
  }

  clearAll() {
    // Reset everything
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.funcT = 'No Function';
    this.calValue = 0;
  }

}
