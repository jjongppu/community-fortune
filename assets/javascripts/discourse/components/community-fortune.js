import Component from "@glimmer/component";
import I18n from "I18n";
import { hbs } from "ember-cli-htmlbars";
import { setComponentTemplate } from "@ember/component";

class CommunityFortune extends Component {
  fortune = this.randomFortune();

  randomFortune() {
    const fortunes =
      I18n.translations?.[I18n.locale]?.js?.community_fortune?.fortunes || [];

    if (!Array.isArray(fortunes) || fortunes.length === 0) {
      console.error("Fortunes is not an array:", fortunes);
      return "Translation error";
    }

    const index = Math.floor(Math.random() * fortunes.length);
    return fortunes[index];
  }
}

export default setComponentTemplate(
  hbs`<div class="community-fortune">
    {{i18n "community_fortune.fortune_label"}}: {{this.fortune}}
  </div>`,
  CommunityFortune
);