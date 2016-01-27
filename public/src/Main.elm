import Effects exposing (Never)
import TodoList exposing (init, update, view)
import StartApp exposing (start)

app =
    start
        { init = init
        , update = update
        , view = view
        , inputs = []
        }

main =
    app.html
