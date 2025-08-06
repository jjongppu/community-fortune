# frozen_string_literal: true

# name: community-fortune
# about: TODO
# meta_topic_id: TODO
# version: 0.0.1
# authors: Discourse
# url: TODO
# required_version: 2.7.0

enabled_site_setting :community_fortune_enabled

module ::CommunityFortune
  PLUGIN_NAME = "community-fortune"
end

require_relative "lib/community_fortune/engine"

register_asset "stylesheets/common/community-fortune.scss"
register_asset "images/cookie-left.png"
register_asset "images/cookie-right.png"
register_asset "images/paper.png"

after_initialize do
  # Code which should run after Rails has finished booting
end
