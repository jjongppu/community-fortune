# frozen_string_literal: true

module ::CommunityFortune
  class ExamplesController < ::ApplicationController
    requires_plugin PLUGIN_NAME

    def index
      user_info =
        if current_user
          current_user.attributes
        else
          { error: "no current_user" }
        end

      Rails.logger.info("CommunityFortune user info: #{user_info}")

      render json: { hello: "world" }
    end
  end
end
