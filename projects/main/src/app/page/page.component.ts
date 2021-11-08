import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { VersionDigest } from '../content/meta';
import { Content2Page } from '../content/meta2';
import { versionsDigest } from '../content/versionsDigest';
import { CrossLinkingService } from '../cross-linking.service';
import { SectionComponent } from '../section/section/section.component';
import { SeoService } from '../seo.service';

@Component({
  selector: 'main-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, OnDestroy {
  pageUrl: string;

  page?: Content2Page;

  defaultVersionLink?: string[];

  private destroy = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone,
    @Inject(DOCUMENT) private document: any,
    private sectionComponent: SectionComponent,
    private seo: SeoService,
    private cls: CrossLinkingService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(({pageUrl}) => {
      this.pageUrl = pageUrl;
      this.loadPage();
    });
    // Handle anchor scrolling
    this.router.events
      .pipe(takeUntil(this.destroy))
      .subscribe(s => {
        if (s instanceof NavigationEnd) {
          this.loadPage();
          this.scrollTo();
        }
      });
    this.scrollTo();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  get section() {
    return this.sectionComponent.section;
  }

  get showHints() {
    return this.sectionComponent.showHints;
  }

  get defaultVersion(): VersionDigest {
    return versionsDigest.find(v => v.default);
  }

  async genGefaultVersionLink() {
    this.defaultVersionLink = await this.cls.genCrossVersionsLink(this.defaultVersion, {
      sectionUrl: this.section.url,
      pageUrl: this.page.url,
    });
  }

  get sourceUrl() {
    return '';
    // const start = this.page.generationStartLine ? `#L${this.page.generationStartLine}` : '';
    // const end = this.page.generationEndLine ? `-L${this.page.generationEndLine}` : '';
    // return `${this.version.githubUrl}/${this.page.generationFile}${start}${end}`;
  }

  private loadPage() {
    if (this.pageUrl) {
      this.page = this.sectionComponent.section.pages.find(p => p.url === this.pageUrl);
      this.genGefaultVersionLink();
      if (this.page) {
        this.seo.setPage(this.page.title);
        this.cdr.markForCheck();
      } else {
        this.router.navigate(['/e404']);
      }
    } else {
      this.router.navigate(['/e404']);
    }
  }

  private scrollTo() {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      this.zone.onStable
        .pipe(take(1))
        .subscribe(() => {
          const element = this.document.querySelector('#' + decodeURI(tree.fragment));
          if (element) {
            element.scrollIntoView(element);
            element.classList.add('-highlight');
            setTimeout(() => {
              element.classList.remove('-highlight');
            }, 1000);
          }
        });
    } else {
//      this.document.body.scrollTop = 0;
//      this.document.documentElement.scrollTop = 0;
    }
  }
}
