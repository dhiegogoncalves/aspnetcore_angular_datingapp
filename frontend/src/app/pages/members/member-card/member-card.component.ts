import { ToastrService } from 'ngx-toastr';
import { MemberService } from 'src/app/_services/member.service';
import { Member } from './../../../_models/member';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(
    private memberService: MemberService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addLike(member: Member): void {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    });
  }
}
