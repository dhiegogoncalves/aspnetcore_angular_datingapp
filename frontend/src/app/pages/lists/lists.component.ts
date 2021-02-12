import { MemberService } from 'src/app/_services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 10;
  pagination: Pagination;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void {
    this.memberService
      .getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
