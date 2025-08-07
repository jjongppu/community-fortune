import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { hbs } from "ember-cli-htmlbars";
import I18n from "I18n";
import { setComponentTemplate } from "@ember/component";
import { inject as service } from '@ember/service';

class CommunityFortune extends Component {
  @tracked opened = false;
  @tracked hidden = true;
  @tracked fortune = "";
  @service currentUser;

  get particleCount() {
    return Array.from({ length: 20 }, (_, i) => i + 1);
  }

  get dailyIndex() {
    const today = new Date().toISOString().slice(0, 10); // "2025-08-07"
    const userIdentifier = this.currentUser?.username || "anonymous";
    const seed = `${userIdentifier}-${today}`;

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const chr = seed.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }

    return Math.abs(hash);
  }

  @action
  openCookie() {
    if (this.opened) return;

    const fortunes =
      I18n.translations?.[I18n.locale]?.js?.community_fortune?.fortunes || [];

    if (!Array.isArray(fortunes) || fortunes.length === 0) {
      this.fortune = "Translation error";
    } else {
      const index = this.dailyIndex % fortunes.length;
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


  @action
  checkFortuneVisibility() {
    try {
      const expiry = parseInt(localStorage.getItem("hideFortune") || "0", 10);
      const now = Date.now();

      if (!expiry || now > expiry) {
        localStorage.removeItem("hideFortune");
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    } catch (e) {
      console.error("쿠키 표시 여부 체크 중 에러:", e);
      this.hidden = false;
    }
  }


  @action
  setupDismissButton() {
    try {
      if (confirm("오늘 하루동안 운세를 안 보시겠어요?")) {
        const expire = new Date();
        expire.setHours(24, 0, 0, 0);

        localStorage.setItem("hideFortune", expire.getTime().toString());
        this.hidden = true;
      }
    } catch (e) {
      console.error("닫기 처리 중 에러:", e);
    }
  }



}


export default setComponentTemplate(
  hbs`
  <div class="fortune-plugin-container" {{did-insert this.checkFortuneVisibility}}>
      <div class="fortune-cookie-container {{if this.opened \"opened\"}} {{if this.hidden \"hidden\"}}">
        <div class="cookie-container">
          <img {{on "click" this.openCookie}} src={{get-url "/plugins/community-fortune/images/cookie-left.png"}} class="cookie cookie-left" alt="left cookie" />

          <div class="paper-strip paper-background">
            {{#if this.opened}}
              <span class="fortune-text">{{this.fortune}}</span>
            {{/if}}
          </div>

          <img {{on "click" this.openCookie}} src={{get-url "/plugins/community-fortune/images/cookie-right.png"}} class="cookie cookie-right" alt="right cookie" />
        </div>

        <div class="fortune-dismiss-btn" {{on "click" this.setupDismissButton}}>
          ✕
        </div>
      </div>
    </div>
  `,
  CommunityFortune
);
