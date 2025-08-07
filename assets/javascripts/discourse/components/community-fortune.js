import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { hbs } from "ember-cli-htmlbars";
import I18n from "I18n";
import { setComponentTemplate } from "@ember/component";

class CommunityFortune extends Component {
  @tracked opened = false;
  @tracked fortune = "";

  get particleCount() {
    return Array.from({ length: 20 }, (_, i) => i + 1);
  }

  @action
  openCookie() {
    if (this.opened) return;

    const fortunes =
      I18n.translations?.[I18n.locale]?.js?.community_fortune?.fortunes || [];

    if (!Array.isArray(fortunes) || fortunes.length === 0) {
      this.fortune = "Translation error";
    } else {
      const index = Math.floor(Math.random() * fortunes.length);
      this.fortune = fortunes[index];
    }

    this.opened = true;

    requestAnimationFrame(() => {
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
    });
  }
}

export default setComponentTemplate(
  hbs`
    <div class="fortune-cookie-container {{if this.opened \"opened\"}}">
      <div class="cookie-container">
        <img src={{get-url "/plugins/community-fortune/images/cookie-left.png"}} class="cookie cookie-left" alt="left cookie" />

        <div class="paper-strip paper-background">
          {{#if this.opened}}
            <span class="fortune-text">{{this.fortune}}</span>
          {{/if}}
        </div>

        <img src={{get-url "/plugins/community-fortune/images/cookie-right.png"}} class="cookie cookie-right" alt="right cookie" />
      </div>
    </div>
  `,
  CommunityFortune
);
