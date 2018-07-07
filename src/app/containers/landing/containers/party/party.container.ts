import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-party',
  templateUrl: './party.container.html',
  styleUrls: ['./party.container.scss']
})
export class PartyContainer implements OnInit {

  @ViewChild('audio') audio: ElementRef;
  private isPlayingAudio: Boolean = true;

  constructor() { }

  ngOnInit() {
  }

  pauseMusic() {
    if (this.isPlayingAudio) {
      this.audio.nativeElement.pause();
    } else {
      this.audio.nativeElement.play();
    }
    this.isPlayingAudio = !this.isPlayingAudio;
  }
}
