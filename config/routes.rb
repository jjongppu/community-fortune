# frozen_string_literal: true

CommunityFortune::Engine.routes.draw do
  get "/examples" => "examples#index"
  # define routes here
end

Discourse::Application.routes.draw { mount ::CommunityFortune::Engine, at: "community-fortune" }
