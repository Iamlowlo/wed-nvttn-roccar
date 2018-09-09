import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../../../app.animations';
import {FormControl, FormGroup} from '@angular/forms';
import {SpotifyService} from '../../../../services/spotify.service';

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
  public partyAddress = {
    lat: 40.431543,
    lng: -3.702142
  };
  public searchForm = new FormGroup({
    song: new FormControl('')
  });
  public searchSongSuggestions: Array<any>;

  constructor(public spotifyService: SpotifyService) {
    this.searchSongSuggestions = [];
  }

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

  onFocus($event) {
    $event.target.classList.add('ng-focused');
  }

  onBlur($event) {
    $event.target.classList.remove('ng-focused');
  }

  searchSong() {
    this.spotifyService
      .searchSong(this.searchForm.controls.song.value)
      .subscribe(results => {
        console.log('results', results);
      });
  }
}

