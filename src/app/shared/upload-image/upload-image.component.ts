import { Component, OnInit } from '@angular/core';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  public croppedImage: any = null
  public imageChangedEvent: any = null;
  constructor(private dialogRef: MatDialogRef<UploadImageComponent>) { }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void{
    this.imageChangedEvent = event
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  save(){
    if (this.croppedImage != null) {
      this.dialogRef.close({ img: base64ToFile(this.croppedImage) })
    }
  }

}
