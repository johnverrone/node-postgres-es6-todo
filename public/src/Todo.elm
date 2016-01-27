module Todo where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Effects exposing (Effects, Never)
import Signal exposing (Address, forwardTo)


-- MODEL

type alias Model =
    { name : String
    , complete : Bool
    }

init: (Model, Effects Action)
init =
    ( Model "" False
    , Effects.none
    )

-- UPDATE

type Action
    = NoOp

update : Action -> Model -> (Model, Effects Action)
update action model =
    case action of
        NoOp -> ( model, Effects.none )


view: Address Action -> Model -> Html
view address model =
    span [class "welcome-message"] [text "Hello, World!"]
