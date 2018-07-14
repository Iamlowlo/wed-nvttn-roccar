import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../../../app.animations';

@Component({
  selector: 'app-party',
  templateUrl: './party.container.html',
  styleUrls: ['./party.container.scss'],
  animations: [routerTransition]
})
export class PartyContainer implements OnInit {
  @HostBinding('@routerTransition') public isLoaded = {value: '*', params: {duration: 800}};
  @ViewChild('audio') audio: ElementRef;
  @ViewChild('galleryContainer') galleryContainer: ElementRef;
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

  galleryMove(direction: string) {
    const _galleryContainer = this.galleryContainer.nativeElement;
    const _galleryImages: Array<HTMLElement> = Array.from(_galleryContainer.children);
    const activeImageIdx = _galleryImages.findIndex((image: HTMLElement) => {
      return image.offsetLeft > _galleryContainer.scrollLeft;
    });
    let goToIdx: number;

    if (direction === 'prev') {
      goToIdx = activeImageIdx > 1
       ? _galleryImages[activeImageIdx - 1].offsetLeft === _galleryContainer.scrollLeft
          ? activeImageIdx - 2
          : activeImageIdx - 1
       : activeImageIdx === -1
          ? _galleryImages.length - 2
          : 0;
    }
    if (direction === 'next') {
      goToIdx = activeImageIdx <= _galleryImages.length - 1 && activeImageIdx !== -1
        ? activeImageIdx
        : _galleryImages.length - 1;
    }
    _galleryContainer.scroll(_galleryImages[goToIdx].offsetLeft, 0);
  }
}

