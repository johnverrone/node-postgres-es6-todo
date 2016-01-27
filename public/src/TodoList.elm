module TodoList where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Effects exposing (Effects, Never)
import Signal exposing (Address, forwardTo)

import Todo

-- MODEL

type alias Model =
    { todoList : List Todo.Model }

init: (Model, Effects Action)
init =
    ( Model []
    , Effects.none
    )

-- UPDATE

type Action
    = NoOp
    | Item Todo.Action

update : Action -> Model -> (Model, Effects Action)
update action model =
    case action of
        NoOp -> ( model, Effects.none )
        Item act ->
            ( { model | todoList = model.todoList }
            , Effects.none
            )

view: Address Action -> Model -> Html
view address model =
    div []
        [ header
            [ id "header" ]
            [ h1 [] [ text "Todo List" ]
            , ul [] (List.map (viewTodo address) model.todoList)
            ]

        ]

viewTodo : Address Action -> Todo.Model -> Html
viewTodo address model =
    Todo.view (forwardTo address Item) model
