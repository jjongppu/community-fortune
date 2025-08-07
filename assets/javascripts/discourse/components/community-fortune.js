import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { hbs } from "ember-cli-htmlbars";
import I18n from "I18n";
import { setComponentTemplate } from "@ember/component";

class CommunityFortune extends Component {
  @tracked opened = false;
  @tracked fortune = "";

  @action
  openCookie() {
    const fortunes =
      I18n.translations?.[I18n.locale]?.js?.community_fortune?.fortunes || [];

    if (!Array.isArray(fortunes) || fortunes.length === 0) {
      this.fortune = "Translation error";
    } else {
      const index = Math.floor(Math.random() * fortunes.length);
      this.fortune = fortunes[index];
    }

    this.opened = true;

    const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const PARTICLES = document.querySelectorAll(".particle");

    PARTICLES.forEach((P) => {
      P.setAttribute(
        "style",
        `--x: ${RANDOM(20, 80)};
         --y: ${RANDOM(20, 80)};
         --duration: ${RANDOM(6, 20)};
         --delay: ${RANDOM(1, 10)};
         --alpha: ${RANDOM(40, 90) / 100};
         --origin-x: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
         --origin-y: ${Math.random() > 0.5 ? RANDOM(300, 800) * -1 : RANDOM(300, 800)}%;
         --size: ${RANDOM(40, 90) / 100};`
      );
    });
  }
}

export default setComponentTemplate(
  hbs`
    <div class="fortune-cookie-container {{if this.opened \"opened\"}}">
      <img src={{get-url "/plugins/community-fortune/images/cookie-left.png"}} class="cookie cookie-left" alt="left cookie" />
      <img src={{get-url "/plugins/community-fortune/images/cookie-right.png"}} class="cookie cookie-right" alt="right cookie" />

      <div
        class="paper-strip"
        style={{concat "background-image: url(" (get-url "/plugins/community-fortune/images/paper.png") ");"}}
      >
        {{#if this.opened}}
          <span class="fortune-text">{{this.fortune}}</span>
        {{/if}}
      </div>

      <div class="sparkle-button">
        <button {{on "click" this.openCookie}}>
          <span class="spark"></span>
          <span class="backdrop"></span>
          <svg class="sparkle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.187 8.096L15 5.25L15.813 8.096..." fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 14.25L5.741 15.285..." fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.5 4L6.303 4.5915..." fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="text">{{i18n "운세 뽑기"}}</span>
        </button>
        <div class="bodydrop"></div>
        <span aria-hidden="true" class="particle-pen">
          {{#each (range 1 21) as |i|}}
            <svg class="particle" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.937 3.846L7.75 1L8.563 3.846C8.77313 4.58114 9.1671 5.25062 9.70774 5.79126C10.2484 6.3319 10.9179 6.72587 11.653 6.936L14.5 7.75L11.654 8.563C10.9189 8.77313 10.2494 9.1671 9.70874 9.70774C9.1681 10.2484 8.77413 10.9179 8.564 11.653L7.75 14.5L6.937 11.654C6.72687 10.9189 6.3329 10.2494 5.79226 9.70874C5.25162 9.1681 4.58214 8.77413 3.847 8.564L1 7.75L3.846 6.937C4.58114 6.72687 5.25062 6.3329 5.79126 5.79226C6.3319 5.25162 6.72587 4.58214 6.936 3.847L6.937 3.846Z" fill="black" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          {{/each}}
        </span>
      </div>
    </div>
  `,
  CommunityFortune
);
