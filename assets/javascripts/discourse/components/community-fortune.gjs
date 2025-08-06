import Component from "@glimmer/component";
import I18n from "I18n";

export default class CommunityFortune extends Component {
  fortune = this.randomFortune();

  randomFortune() {
    const fortunes = I18n.t("community_fortune.fortunes");
    const index = Math.floor(Math.random() * fortunes.length);
    return fortunes[index];
  }
}

<template>
  <div class="community-fortune">
    {{i18n "community_fortune.fortune_label"}}: {{this.fortune}}
  </div>
</template>
