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
  }
}

export default setComponentTemplate(
  hbs`
    <div class="fortune-cookie-container {{if this.opened "opened"}}">
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

      <button class="fortune-button" {{on "click" this.openCookie}}>
        {{i18n "community_fortune.pick_button"}}
      </button>
    </div>
  `,
  CommunityFortune
);