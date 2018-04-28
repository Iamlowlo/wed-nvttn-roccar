import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-watcher',
  templateUrl: './login-watcher.component.html',
  styleUrls: ['./login-watcher.component.scss']
})
export class LoginWatcherComponent implements OnInit {
  public eyePupilPositionStyles;
  private pupilXRangeSize = 9;
  private pupilYRangeSize = 1.7;
  private inputRangeSize = 30;
  @Input()
  public set inputLength(val: number) {
    const protectedVal = val <= this.inputRangeSize
                              ? val
                              : this.inputRangeSize;
    const progressPosition = protectedVal / this.inputRangeSize;
    const eyePupilPositionX = this.pupilXRangeSize * (progressPosition - 0.5) + '%';
    const eyePupilPositionY = -6.468 * Math.pow(progressPosition, 2) + (6.468 * progressPosition) - 0.117 + '%';
    this.eyePupilPositionStyles = {
      transform: `translate(${eyePupilPositionX}, ${eyePupilPositionY})`
    };
  }
  @Input()
  public set notLooking(val: boolean) {
    this.isNotLooking = val;
  }
  public get notLooking() {
    return this.isNotLooking;
  }
  @Input()
  public set isReady(val: boolean) { 
    this._isSet = val;
  }
  public get isReady() {
    return this._isSet;
  }

  @HostBinding('class.ready') public _isSet = false;
  @HostBinding('class.not_looking') public isNotLooking = false;

  constructor() {}

  ngOnInit() {
  }

}
