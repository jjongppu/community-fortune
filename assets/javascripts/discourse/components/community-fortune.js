import Component from "@glimmer/component";
import I18n from "I18n";
import { hbs } from "ember-cli-htmlbars";
import { setComponentTemplate } from "@ember/component";

class CommunityFortune extends Component {
  fortune = this.randomFortune();

  randomFortune() {
    const fortunes = I18n.t("community_fortune.fortunes");
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
