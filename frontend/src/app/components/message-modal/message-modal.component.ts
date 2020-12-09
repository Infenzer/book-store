import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface MessageData {
  message: string
  color?: string
}

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MessageData, private modalRef: MatDialogRef<MessageModalComponent, boolean>) { }

  ngOnInit(): void {
  }

  close() {
    this.modalRef.close(false)
  }

}
