import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isDefined } from '@ngx-kit/core';
import { ContentPage } from '../../../../../main/src/app/content/meta';
import { DataService } from '../../data.service';
import { SectionComponent } from '../../section/section/section.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit {
  page: ContentPage;

  constructor(
    private route: ActivatedRoute,
    private sectionComponent: SectionComponent,
    private data: DataService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(({pageId}) => {
      this.page = this.sectionComponent.section.pages.find(p => p.id === pageId);
    });
  }

  createEntry(index?: number) {
    this.page.entries.push(this.data.createEntry());
    if (isDefined(index)) {
      this.data.move(this.page.entries, this.page.entries.length - 1, index + 1);
    }
  }

  deleteEntry(index: number) {
    if (confirm('Delete the entry?')) {
      this.data.delete(this.page.entries, index);
    }
  }

  moveUpEntry(index: number) {
    this.data.move(this.page.entries, index, index - 1);
  }

  moveDownEntry(index: number) {
    this.data.move(this.page.entries, index, index + 1);
  }
}
