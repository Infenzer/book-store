import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthModalService } from 'src/app/services/auth-modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  email: string
  password: string

  @ViewChild('body') body: ElementRef<HTMLDivElement>

  constructor(private authModalService: AuthModalService) { }

  ngOnInit(): void {
  }

  onAuthClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (this.email && this.password) {
      this.authModalService.login(this.email, this.password)
    }
  }

  outsideBodyClick(e: MouseEvent) {
    if ( !this.body.nativeElement.contains(e.target as Node) ) {
      this.authModalService.emitChange(false)
    }
  }

  onCloseClick() {
    this.authModalService.emitChange(false)
  }

}
